import { DataQueryRequest, DataQueryResponse, FieldType } from '@grafana/data';
import { CascaderOption } from '@grafana/ui';
import { MyQuery } from 'types';

export const metricOptions: CascaderOption[] = [
  {
    label: '服务器',
    value: 'server',
    items: [
      {
        label: 'CPU',
        value: 'cpu',
        items: [
          {
            label: '使用率',
            value: 'cpu_usage',
          },
        ],
      },
      {
        label: '内存',
        value: 'memory',
        items: [
          {
            label: '使用率',
            value: 'memory_usage',
          },
        ],
      },
    ],
  },
];

export const mockTimeSeriesData = (options: DataQueryRequest<MyQuery>): DataQueryResponse => {
  const { range, targets } = options;

  const data = targets.map((target) => ({
    refId: target.refId,
    fields: [
      { name: 'Time', value: [range.from.valueOf(), range.to.valueOf()], type: FieldType.time },
      { name: '127.0.0.1', values: [2, 6], type: FieldType.number },
      { name: '127.0.0.2', values: [2, 4], type: FieldType.number },
      { name: '127.0.0.3', values: [2, 8], type: FieldType.number },
    ],
  }));

  return { data };
};
