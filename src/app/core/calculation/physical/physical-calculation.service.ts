import { Injectable } from '@angular/core';

import { MeasurementUnit } from '../../api/openaq/measurement-unit.model';
import { CalculationArguments } from '../calculation-arguments.model';
import { Parameter } from '../../api/openaq/parameter.model';
import { MOLECULAR_WEIGHTS } from './molecular-weights.constant';
import { STP } from './stp.constant';
import { CalculationHelper } from '../calculation.helper';
import { MessageSeverity } from '../calculation-response.models';

@Injectable()
export class PhysicalCalculationService {
    public attemptUnitConversion(args: CalculationArguments): CalculationArguments {
        if (this.equivalentUnits(args)) 
            return args;
        const givenUnit = args.unit;
        const indexUnit = args.index.unit;
        const concentration = args.concentration;
        const parameter = args.parameter;
        let newConcentration: number;
        switch (givenUnit) {
            case 'ppm':
                if (indexUnit === 'ppb')
                    newConcentration = 1000 * concentration;
                if (indexUnit === 'µg/m³')
                    newConcentration = this.convertToDensity(1000 * concentration, parameter);
                break;
            case 'ppb':
                if (indexUnit === 'ppm')
                    newConcentration = concentration / 1000;
                if (indexUnit === 'µg/m³')
                    newConcentration = this.convertToDensity(concentration, parameter);
                break;
            case 'µg/m³':
                if (indexUnit === 'ppm')
                    newConcentration = this.convertToVolumeRatio(concentration, parameter) * 1000;
                if (indexUnit === 'ppb')
                    newConcentration = this.convertToVolumeRatio(concentration, parameter);
                break;
            default:
                args = CalculationHelper.newMessage(args, MessageSeverity.High, `Invalid unit given for measurement: ${givenUnit}`);
        }
        if (newConcentration == null) {
            args = CalculationHelper.newMessage(args, MessageSeverity.High, `Unable to convert ${givenUnit} to index unit of ${indexUnit}`);
            args.concentration = null;
        } else {
            args.concentration = newConcentration;
            args.unit = indexUnit;
        }
        return args;
    }

    private equivalentUnits(args: CalculationArguments): boolean {
        return args.unit.toLowerCase() === args.index.unit.toLowerCase();
    }

    private convertToDensity(ppb: number, parameter: Parameter): number {
        const molecularWeight: number = MOLECULAR_WEIGHTS[parameter];
        return molecularWeight &&
            (ppb * molecularWeight * STP.pressureInAtm) / (STP.gasConstantForKAndAtm * STP.temperatureInK)
    }

    private convertToVolumeRatio(density: number, parameter: Parameter): number {
        const molecularWeight: number = MOLECULAR_WEIGHTS[parameter];
        return molecularWeight &&
            (molecularWeight * STP.pressureInAtm) / (density * 1000 * STP.gasConstantForKAndAtm * STP.temperatureInK)
    }
}