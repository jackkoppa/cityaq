// https://docs.openaq.org/#api-Fetches
import { BaseOpenAQRequest} from '../base-openaq-request.model';

export interface FetchesRequest extends BaseOpenAQRequest {
    order_by?: string[];
    sort?: string[];
    limit?: number;
    page?: number;
}