// https://docs.openaq.org/#api-Cities
import { BaseOpenAQRequest } from '../base-openaq-request.model';

export interface CitiesRequestModel extends BaseOpenAQRequest {
    country?: string;
    order_by?: string[];
    sort?: string[];
    limit?: number;
    page?: number;
}