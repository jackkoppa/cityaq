// https://docs.openaq.org/#api-Parameters
import { BaseOpenAQRequest} from '../base-openaq-request.model';

export interface ParametersRequest extends BaseOpenAQRequest {
    order_by?: string[];
    sort?: string[];
}