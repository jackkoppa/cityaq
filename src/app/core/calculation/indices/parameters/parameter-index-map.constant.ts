import { Parameter } from '../../../api/openaq/parameter.model';
import { BaseIndex } from '../base-index.model';

import { PM25_INDEX } from './pm25-index.constant';
import { PM10_INDEX } from './pm10-index.constant';
import { O3_INDEX } from './o3-index.constant';
import { CO_INDEX } from './co-index.constant';
import { SO2_INDEX } from './so2-index.constant';
import { NO2_INDEX } from './no2-index.constant';

export const PARAMETER_INDEX_MAP: ParameterIndexMap = {
    pm25: PM25_INDEX,
    pm10: PM10_INDEX,
    o3: O3_INDEX,
    co: CO_INDEX,
    so2: SO2_INDEX,
    no2: NO2_INDEX,
    bc: null
}

type ParameterIndexMap = {
    [P in Parameter]: BaseIndex
}