// https://docs.openaq.org/#api-Measurements
import { BaseOpenAQRequest} from '../base-openaq-request.model';

export interface MeasurementsRequest extends BaseOpenAQRequest {
    country?: string;
    city?: string;
    location?: string;
    parameter?: string;
    has_geo?: boolean;
    coordinates?: string;
    radius?: number;
    value_from?: number;
    value_to?: number;
    date_from?: string;
    date_to?: string;
    order_by?: string[];
    sort?: string[];
    include_fields?: any[];
    limit?: number;
    page?: number;
    format?: string;
}