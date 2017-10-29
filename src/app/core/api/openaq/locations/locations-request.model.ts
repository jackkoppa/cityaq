// https://docs.openaq.org/#api-Locations
import { BaseOpenAQRequest} from '../base-openaq-request.model';

export interface LocationsRequest extends BaseOpenAQRequest {
    city?: string;
    country?: string;
    locations?: string;
    paramater?: string;
    has_geo?: boolean;
    coordinates?: string;
    nearest?: number;
    radius?: number;
    order_by?: string[];
    sort?: string[];
    limit?: number;
    page?: number;
}