import { Injectable } from '@angular/core';

import { MeasurementUnit } from '../../api/openaq/measurement-unit.model';
import { CalculationArguments } from '../calculation-arguments.model';
import { Parameter } from '../../api/openaq/parameter.model';
import { MOLECULAR_WEIGHTS } from './molecular-weights.constant';
import { NTP } from './ntp.constant';
import { CalculationHelper } from '../calculation.helper';
import { MessageSeverity } from '../calculation-response.models';
import { PARAMETER_INDEX_MAP } from '../indices/parameters/parameter-index-map.constant';

@Injectable()
export class PhysicalCalculationService {
    public attemptUnitConversion(args: CalculationArguments): CalculationArguments {
        if (this.equivalentUnits(args)) 
            return args;
        let newConcentration: number;
        try {
            newConcentration = this.getNewConcentration(args);            
        }
        catch (err) {
            throw new Error(`Failed to convert given unit of ${args.unit} to ${args.index.unit}`);
        }
        args.concentration = newConcentration;
        args.unit = args.index.unit;
        return args;
    }
    
    private equivalentUnits(args: CalculationArguments): boolean {
        return args.unit.toLowerCase() === args.index.unit.toLowerCase();
    }

    private getNewConcentration(args: CalculationArguments): number {
        const conversionMap: ConversionMap = {
            'ppm': {
                'ppb': 1000 * args.concentration,
                'µg/m³': this.getMicrogramsByPartsPerMillion(args.concentration, args.parameter)
            },
            'ppb': {
                'ppm': 0.001 * args.concentration,
                'µg/m³': this.getMicrogramsByPartsPerMillion(args.concentration / 1000, args.parameter)
            },
            'µg/m³': {
                'ppm': this.getPartsPerMillionByMicrograms(args.concentration, args.parameter),
                'ppb': this.getPartsPerMillionByMicrograms(args.concentration, args.parameter) * 1000
            }
        }
        const newConcentration = conversionMap[args.unit][args.index.unit];
        const significantDigits = CalculationHelper.getSignificantDigitCount(args.concentration);
        return CalculationHelper.setSignificantDigits(newConcentration, significantDigits);
    }

    private getMicrogramsByPartsPerMillion(partsPerMillion: number, parameter: Parameter): number {
        const moles = (NTP.pressureInAtm * partsPerMillion / 1000000) / (NTP.gasConstantForKAndAtm * NTP.temperatureInK);
        return moles * MOLECULAR_WEIGHTS[parameter] * 1000000;
    }

    private getPartsPerMillionByMicrograms(micrograms: number, parameter: Parameter): number {
        const moles = (micrograms * 1000000) / MOLECULAR_WEIGHTS[parameter];
        return (moles * NTP.gasConstantForKAndAtm * NTP.temperatureInK) / (NTP.pressureInAtm * 1000000);
    }
}

type ConversionMap = {
    [M in MeasurementUnit]: {
        [U in MeasurementUnit]?: number;
    };
}