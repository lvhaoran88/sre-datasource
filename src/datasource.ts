import { getBackendSrv } from '@grafana/runtime';
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  TestDataSourceResponse,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions, QueryModeEnum } from './types';
import { CascaderOption } from '@grafana/ui';
import { metricOptions, mockTimeSeriesData } from 'mock';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  baseUrl: string;
  queryMode: QueryModeEnum;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.baseUrl = instanceSettings.url!;
    this.queryMode = instanceSettings.jsonData?.queryMode ?? QueryModeEnum.Builder;
  }

  /**远端请求查询内置指标*/
  listMetrics(): Promise<CascaderOption[]> {
    return new Promise<CascaderOption[]>((resolve) => {
      resolve(metricOptions);
    });

    return getBackendSrv().get(`${this.baseUrl}/metrics/`);
  }

  query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    // const { range } = options;
    // const from = range!.from.valueOf();
    // const to = range!.to.valueOf();
    console.log('options: ', options);
    const requestData = {
      scopedVars: options.scopedVars,
      targets: options.targets,
    };

    return new Promise<DataQueryResponse>((resolve) => {
      resolve(mockTimeSeriesData(options));
    });
    return getBackendSrv().post<DataQueryResponse>(`${this.baseUrl}/query/`, requestData);
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
      .get(this.baseUrl + '/test/')
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
