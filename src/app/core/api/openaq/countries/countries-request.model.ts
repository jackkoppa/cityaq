// https://docs.openaq.org/#api-Countries
import { BaseOpenAQRequest} from '../base-openaq-request.model';

export interface CountriesRequest extends BaseOpenAQRequest {
    order_by?: string[];
    sort?: string[];
    limit?: number;
    page?: number;
}