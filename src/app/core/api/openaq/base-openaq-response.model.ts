export interface BaseOpenAQResponse<R> {
  meta: OpenAQMeta;
  results: R;
}

interface OpenAQMeta {
  found: number;
  license: string;
  limit: number;
  name: string;
  page: number;
  website: string;
}
