import React, { useEffect } from 'react';
import { InlineField } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { MyDataSourceOptions, MyQuery, QueryModeEnum } from '../types';
import QueryMode from './QueryMode';
import MetricCascader from './MerticCascader';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery, datasource }: Props) {
  const onQueryModeChange = (event: QueryModeEnum) => {
    onChange({ ...query, queryMode: event });
  };

  //
  useEffect(() => {
    onChange({ ...query, queryMode: datasource.queryMode });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InlineField label="查询模式" labelWidth={20} tooltip="非专业人员请勿使用 Code 模式查询">
        <QueryMode value={query.queryMode || datasource.queryMode} onChange={onQueryModeChange} />
      </InlineField>
      {query.queryMode === QueryModeEnum.Builder ? (
        <InlineField label="指标项" labelWidth={20} tooltip="请选择指标项">
          <MetricCascader
            getOptionsService={datasource.listMetrics}
            onChange={(value) => {
              onChange({ ...query, metricName: value });
              onRunQuery(); // 查询
            }}
          />
        </InlineField>
      ) : null}
    </>
  );
}
