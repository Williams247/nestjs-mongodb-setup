type selectParmsProps =
  | string
  | Array<string>
  | Record<string, number | boolean | object>;

type PopulateRecord = string | Array<string>;

export interface FetchProps {
  modelName: string;
  page?: string;
  limit?: string;
  searchParams?: Record<string, any>;
  populate?: PopulateRecord;
  selectParms?: selectParmsProps;
}
