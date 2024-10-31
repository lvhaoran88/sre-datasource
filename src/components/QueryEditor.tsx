import React, { useCallback, useEffect } from 'react';
import { InlineField } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from '../datasource';
import { MyDataSourceOptions, MyQuery, QueryModeEnum } from '../types';
import QueryMode from './QueryMode';
import MetricCascader from './MerticCascader';
import PromqlQuery from './PromqlQuery';

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export function QueryEditor({ query, onChange, onRunQuery, datasource }: Props) {
  const onQueryModeChange = (value: QueryModeEnum) => {
    onChange({ ...query, queryMode: value });
  };

  //
  useEffect(() => {
    onChange({ ...query, queryMode: datasource.queryMode || QueryModeEnum.Builder });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datasource.queryMode]);

  // 获取监控指标项
  const getOptionsService = useCallback(() => {
    // 存在 this 指向问题，请一定要使用这种方式调用
    return datasource.listMetrics();
  }, [datasource]);

  return (
    <>
      <InlineField label="查询模式" labelWidth={20} tooltip="非专业人员请勿使用 Code 模式查询">
        <QueryMode value={query.queryMode || datasource.queryMode} onChange={onQueryModeChange} />
      </InlineField>
      {query.queryMode === QueryModeEnum.Builder ? (
        <InlineField label="指标项" labelWidth={20} tooltip="请选择指标项">
          <MetricCascader
            getOptionsService={getOptionsService}
            onChange={(value) => {
              onChange({ ...query, metricName: value });
              onRunQuery(); // 查询
            }}
          />
        </InlineField>
      ) : (
        <InlineField label="PromQL" labelWidth={20} tooltip="请输入 PromQL 查询语句" grow={true}>
          <div style={{ height: 32 }}>
            <PromqlQuery value={query.promql} onChange={(value) => onChange({ ...query, promql: value })} />
          </div>
        </InlineField>
      )}
    </>
  );
}
