// https://docs.openaq.org/#api-Measurements
import { MeasurementsIndividualResponseModel } from './measurements-individual-response.model';

export interface MeasurementsResponseModel extends Array<MeasurementsIndividualResponseModel> {}