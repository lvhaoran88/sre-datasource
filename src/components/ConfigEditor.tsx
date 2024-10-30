import React from 'react';
import { InlineField, DataSourceHttpSettings } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions, MySecureJsonData, QueryModeEnum } from '../types';
import QueryMode from './QueryMode';

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions, MySecureJsonData> {}

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;
  const { jsonData } = options;

  return (
    <>
      <DataSourceHttpSettings
        defaultUrl="http://localhost:3000"
        dataSourceConfig={options}
        onChange={onOptionsChange}
      />
      <h3>编辑配置</h3>
      <InlineField label="默认查询模式" labelWidth={26}>
        <QueryMode
          value={options.jsonData.queryMode ?? QueryModeEnum.Builder}
          onChange={(value) => {
            onOptionsChange({
              ...options,
              jsonData: {
                ...jsonData,
                queryMode: value,
              },
            });
          }}
        />
      </InlineField>
    </>
  );
}
