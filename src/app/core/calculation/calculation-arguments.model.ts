import { AveragingPeriod } from "../api/openaq/latest/averaging-period.model";
import { MeasurementUnit } from "../api/openaq/measurement-unit.model";
import { Parameter } from "../api/openaq/parameter.model";

import { CalculationMessage } from "./calculation-response.models";
import { BaseIndex } from "./indices/base-index.model";

export interface CalculationArguments {
    concentration: number;       
    parameter: Parameter;
    averagingPeriod: AveragingPeriod;
    unit: MeasurementUnit;
    index: BaseIndex;
    includeAllMessages: boolean;
    allMessages: CalculationMessage[];
}