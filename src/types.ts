import { DataSourceJsonData } from '@grafana/data';
import { DataQuery } from '@grafana/schema';

export enum QueryModeEnum {
  Builder = 'builder',
  Code = 'code',
}

export interface MyQuery extends DataQuery {
  queryText?: string;
  constant: number;
  //
  queryMode: QueryModeEnum;
  metricName: string;
  promql: string;
}

export const DEFAULT_QUERY: Partial<MyQuery> = {
  constant: 6.5,
};

export interface DataPoint {
  Time: number;
  Value: number;
}

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  queryMode?: QueryModeEnum;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  apiKey?: string;
}
