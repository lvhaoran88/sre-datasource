import { getBackendSrv, isFetchError } from '@grafana/runtime';
import {
  CoreApp,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  createDataFrame,
  FieldType,
  TestDataSourceResponse,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions, DEFAULT_QUERY } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  baseUrl: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.baseUrl = instanceSettings.url!;
  }

  getDefaultQuery(_: CoreApp): Partial<MyQuery> {
    return DEFAULT_QUERY;
  }

  filterQuery(query: MyQuery): boolean {
    // if no query has been provided, prevent the query from being executed
    return !!query.queryText;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range!.from.valueOf();
    const to = range!.to.valueOf();

    // Return a constant for each query.
    const data = options.targets.map((target) => {
      return createDataFrame({
        refId: target.refId,
        fields: [
          { name: 'Time', values: [from, to], type: FieldType.time },
          { name: 'Value', values: [target.constant, target.constant], type: FieldType.number },
        ],
      });
    });

    return { data };
  }

  /**
   * Checks whether we can connect to the API.
   */
  testDatasource() {
    const defaultErrorMessage = 'Cannot connect to API';

    return new Promise<TestDataSourceResponse>((resolve) => {
      resolve({
        status: 'success',
        message: 'Success',
      });
    });

    // 对接真正的服务器
    return getBackendSrv()
      .get(this.baseUrl + '/health')
      .then((res) => ({
        status: 'success',
        message: 'Success',
      }))
      .catch((err) => {
        return {
          status: 'error',
          message: err.statusText ? err.statusText : defaultErrorMessage,
        };
      });
  }
}
