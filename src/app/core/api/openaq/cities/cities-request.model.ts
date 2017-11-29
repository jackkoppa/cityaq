// https://docs.openaq.org/#api-Cities
import { BaseOpenAQRequest } from '../base-openaq-request.model';

export interface CitiesRequest extends BaseOpenAQRequest {
    country?: string;
    order_by?: string[];
    sort?: string[];
    limit?: number;
    page?: number;
}