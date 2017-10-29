export type Primitive = string | number | boolean;

export interface BaseRequest {
    [key: string]: Primitive
}