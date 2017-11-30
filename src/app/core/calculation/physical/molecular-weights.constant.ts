import { Parameter  } from '../../api/openaq/parameter.model';

export const MOLECULAR_WEIGHTS: MolecularWeights = {
    pm25:   null,
    pm10:   null,
    so2:    64.07,
    no2:    46.01,
    o3:     48.00,
    co:     28.01,
    bc:     null
}

type MolecularWeights = {
    [P in Parameter]: number;
}