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
        args = this.validateCalculationArguments(args);
        args = this.executeCalculation(args);
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

    private executeCalculation(args: CalculationArguments): CalculationArguments {
        return args;
    }

    private getCalculationResponse(args: CalculationArguments): CalculationResponse {
        return {
            AQI: args.AQI,
            message: args.allMessages[0],
            allMessages: args.includeAllMessages ? args.allMessages : undefined
        }
    }

    private validateParameter(args: CalculationArguments): CalculationArguments {
        const index = PARAMETER_INDEX_MAP[args.parameter];
        if (index === null) 
            args = CalculationHelper.newMessage(args, MessageSeverity.Low, `No EPA index is available for ${args.parameter}`);
        if (index === undefined)
            args = CalculationHelper.newMessage(args, MessageSeverity.High, `Invalid parameter: ${args.parameter}`);
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
        CalculationHelper.newMessage(args, MessageSeverity.Medium, `No averaging period given; default index period used`);
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
            CalculationHelper.newMessage(args, MessageSeverity.High, `Measurement averaging period unit of` +
                `${args.averagingPeriod.unit} does not match index unit of ${closestAveragingPeriod.unit}`);
        }
        CalculationHelper.newMessage(args, MessageSeverity.Medium, `Using index averaging period of ` +
            `${closestAveragingPeriod.value} ${closestAveragingPeriod.unit} ` +
            `, since given averaging period of ${args.averagingPeriod.value} ${args.averagingPeriod.unit} does not exist in the index`);
        args.averagingPeriod = averagingPeriodsByDifferenceFromTarget[0].averagingPeriod;
        return args;
    }

    private differenceFromTarget(averagingPeriod: AveragingPeriod, args: CalculationArguments): number {
        return Math.abs(averagingPeriod.value - args.averagingPeriod.value);
    }



    // TODO: add methods for calculating based on MeasurementResponse
    // will require determining the right measurements to average, after taking in multiple measurements
    // required for time-based graphs; might be a separate service
}