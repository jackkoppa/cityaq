// https://www3.epa.gov/airnow/aqi-technical-assistance-document-may2016.pdf
import { Injectable } from '@angular/core';

import { AveragingPeriod } from '../api/openaq/latest/averaging-period.model';
import { LatestMeasurement } from '../api/openaq/latest/latest-measurement.model';
import { MeasurementUnit } from '../api/openaq/measurement-unit.model';
import { Parameter } from '../api/openaq/parameter.model';

import { CalculationArguments } from './calculation-arguments.model';
import { 
    CalculationResponse,
    CalculationMessage,
    MessageSeverity
} from './calculation-response.models';
import { PARAMETER_INDEX_MAP } from './indices/parameters/parameter-index-map.constant';
import { PhysicalCalculationService } from './physical/physical-calculation.service';
import { CalculationHelper } from './calculation.helper';
import { AQI_LEVELS } from './indices/aqi-levels.constant';

@Injectable()
export class CalculationService {
    constructor(
        private physicalCalculationService: PhysicalCalculationService
    ) {}

    public calculateAQI(
        concentration: number,        
        parameter: Parameter,
        averagingPeriod: AveragingPeriod,
        unit: MeasurementUnit,
        includeAllMessages: boolean = false
    ): CalculationResponse {
        let args: CalculationArguments = {
            concentration: concentration,        
            parameter: parameter,
            averagingPeriod: averagingPeriod,
            unit: unit,
            includeAllMessages: includeAllMessages,
            index: null,
            allMessages: [],
            AQI: null
        }
        try {
            args = this.validateCalculationArguments(args);
            args = this.executeCalculation(args);
        } catch (error) {
            args.allMessages = [{severity: MessageSeverity.High, text: error}];
        }
        return this.getCalculationResponse(args);
    }

    public calculateAPIByLatest(latest: LatestMeasurement, includeAllMessages: boolean = false): CalculationResponse {
        return this.calculateAQI(
            latest.value,
            latest.parameter,
            latest.averagingPeriod,
            latest.unit
        )
    }

    private validateCalculationArguments(args: CalculationArguments): CalculationArguments {
        args = this.validateParameter(args);
        args = this.validateUnit(args);
        args = this.validateAveragingPeriod(args);
        return args;
    }

    private setFailedDefaultArguments(args: CalculationArguments): CalculationArguments {
        return Object.assign(args, {
            
        })
    }

    private executeCalculation(args: CalculationArguments): CalculationArguments {
        args = this.getAQIByIndex(args);
        return args;
    }
    
    private getAQIByIndex(args: CalculationArguments): CalculationArguments {
        const truncatedConc = CalculationHelper.truncateAtDecimal(args.concentration, args.index.decimalPlaces);
        let currentLevels = args.index.averagingPeriodLevels.find(level => level.averagingPeriod.value === args.averagingPeriod.value).levels;        
        let calculatedAQI: number;
        let foundMatching = Object.keys(currentLevels).some(level => {
            const min = currentLevels[level] && currentLevels[level][0],
                max = currentLevels[level] && currentLevels[level][1],
                aqiMin = AQI_LEVELS[level] && AQI_LEVELS[level][0],
                aqiMax = AQI_LEVELS[level] && AQI_LEVELS[level][1];
            if (typeof min === 'number' && 
                min <= truncatedConc &&
                typeof max === 'number' 
                && truncatedConc <= max) {
                calculatedAQI = this.linearCalculation(truncatedConc, min, max, aqiMin, aqiMax);
                return true;
            }
        });
        // TODO: handle non-matching cases
        if (foundMatching) args.AQI = Math.round(calculatedAQI);
        return args;
    }

    private getCalculationResponse(args: CalculationArguments): CalculationResponse {
        return {
            AQI: args.AQI,

            unit: args.unit,
            concentration: args.concentration,
            message: args.allMessages[0],
            allMessages: args.includeAllMessages ? args.allMessages : undefined
        }
    }

    private validateParameter(args: CalculationArguments): CalculationArguments {
        const index = PARAMETER_INDEX_MAP[args.parameter];
        // TODO: cases like this should throw, since the rest of the methods will break; e.g. when trying a BC location
        if (index === null) 
            throw new Error(`No EPA index is available for ${args.parameter}`);
        if (index === undefined)
            throw new Error(`Invalid parameter: ${args.parameter}`);
        args.index = index;
        return args;
    }

    private validateUnit(args: CalculationArguments): CalculationArguments {
        args = this.physicalCalculationService.attemptUnitConversion(args);
        return args;
    }

    private validateAveragingPeriod(args: CalculationArguments): CalculationArguments {
        if (!args.averagingPeriod || !args.averagingPeriod.value || !args.averagingPeriod.unit) {
            args = this.setDefaultAveragingPeriod(args);
            return args;
        }
        const matchingAveragingPeriod = args.index.averagingPeriodLevels.find(level => {
            return level.averagingPeriod.unit === args.averagingPeriod.unit &&
                level.averagingPeriod.value === args.averagingPeriod.value;
        });
        if (!matchingAveragingPeriod)
            args = this.setClosestAveragingPeriod(args);
        return args;
    }

    private setDefaultAveragingPeriod(args: CalculationArguments): CalculationArguments {
        args = CalculationHelper.newMessage(args, MessageSeverity.Medium, `No averaging period given; default index period used`);
        args.averagingPeriod = args.index.averagingPeriodLevels[0].averagingPeriod;
        return args;
    }

    private setClosestAveragingPeriod(args: CalculationArguments): CalculationArguments {
        const averagingPeriodsByDifferenceFromTarget = args.index.averagingPeriodLevels.sort((a, b) => {
            const aDiff = this.differenceFromTarget(a.averagingPeriod, args);
            const bDiff = this.differenceFromTarget(b.averagingPeriod, args);
            if (aDiff > bDiff) 
                return -1;
            if (aDiff < bDiff)
                return 1;
            return 0; 
        });
        const closestAveragingPeriod = averagingPeriodsByDifferenceFromTarget[0].averagingPeriod;
        if (closestAveragingPeriod.unit !== args.averagingPeriod.unit) {
            args = CalculationHelper.newMessage(args, MessageSeverity.High, `Measurement averaging period unit of` +
                `${args.averagingPeriod.unit} does not match index unit of ${closestAveragingPeriod.unit}`);
        }
        args = CalculationHelper.newMessage(args, MessageSeverity.Medium, `Using index averaging period of ` +
            `${closestAveragingPeriod.value} ${closestAveragingPeriod.unit} ` +
            `, since given averaging period of ${args.averagingPeriod.value} ${args.averagingPeriod.unit} does not exist in the index`);
        args.averagingPeriod = averagingPeriodsByDifferenceFromTarget[0].averagingPeriod;
        return args;
    }

    private differenceFromTarget(averagingPeriod: AveragingPeriod, args: CalculationArguments): number {
        return Math.abs(averagingPeriod.value - args.averagingPeriod.value);
    }

    private linearCalculation(
        value: number,
        min: number,
        max: number,
        aqiMin: number,
        aqiMax: number
    ): number {
        return (value - min) * (aqiMax - aqiMin) / (max - min) + aqiMin;
    }



    // TODO: add methods for calculating based on MeasurementResponse
    // will require determining the right measurements to average, after taking in multiple measurements
    // required for time-based graphs; might be a separate service
    // on hold until can test for current proper responses
}