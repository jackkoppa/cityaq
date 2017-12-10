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
            index: null,
            includeAllMessages: includeAllMessages,
            allMessages: []
        }
        args = this.validateCalculationArguments(args);
        return {
            AQI: 0,
            message: null
        }
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
        return args;
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

        return args;
    }



    // TODO: add methods for calculating based on MeasurementResponse
    // will require determining the right measurements to average, after taking in multiple measurements
    // required for time-based graphs; might be a separate service
}