// https://docs.openaq.org/#api-Latest
import { BaseOpenAQRequest } from '../base-openaq-request.model';

export interface LatestRequestModel extends BaseOpenAQRequest {
    city?: string;
    country?: string;
    location?: string;
    parameter?: string;
    has_geo?: boolean;
    coordinates?: string;
    radius?: number;
    order_by?: string[];
    sort?: string[];
    limit?: number;
    page?: number;
}