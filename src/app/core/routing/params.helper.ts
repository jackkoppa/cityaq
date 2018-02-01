import { ObjectParams, QueryParams } from "./params.models";

const DEFUALT_SPLIT: string = ','

export class ParamsHelper {
    static queryToObject(queryParams: QueryParams): ObjectParams {
        return {
            cityNames: ParamsHelper.splitString(queryParams.cities)
        };
    }

    static objectToQuery(objectParams: ObjectParams): QueryParams {
        return {
            cities: ParamsHelper.joinArray(objectParams.cityNames)
        };
    }
    
    static splitString(val: string, splitChar: string = DEFUALT_SPLIT): string[] {
        return val && val.split(splitChar) || undefined;
    }

    static joinArray(val: string[], splitChar: string = DEFUALT_SPLIT): string {
        return val && val.join(splitChar) || undefined;
    }
}