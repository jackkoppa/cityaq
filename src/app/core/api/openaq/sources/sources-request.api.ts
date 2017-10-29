// https://docs.openaq.org/#api-Sources
import { BaseOpenAQRequest} from '../base-openaq-request.model';

export interface SourcesRequest extends BaseOpenAQRequest {
    order_by?: string[];
    sort?: string[];
    limit?: number;
    page?: number;
}