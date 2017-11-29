// https://docs.openaq.org/#api-Measurements
import { MeasurementsIndividualResponse } from './measurements-individual-response.model';

export interface MeasurementsResponse extends Array<MeasurementsIndividualResponse> {}