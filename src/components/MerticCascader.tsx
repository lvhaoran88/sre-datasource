import { Cascader, CascaderOption, LoadingPlaceholder } from '@grafana/ui';
import React, { useEffect, useState } from 'react';

interface MetricCascaderProps {
  getOptionsService: () => Promise<CascaderOption[]>;
  onChange: (value: string) => void;
}

const MetricCascader: React.FC<MetricCascaderProps> = ({ getOptionsService, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<CascaderOption[]>([]);
  useEffect(() => {
    setLoading(true);
    getOptionsService().then((options) => {
      setOptions(options);
      setLoading(false);
    });
  }, [getOptionsService]);
  return loading ? (
    <LoadingPlaceholder text="监控指标项加载中..." />
  ) : (
    <Cascader
      displayAllSelectedLevels={true}
      separator=" / "
      placeholder="请选择一个监控指标项"
      changeOnSelect={false}
      onSelect={onChange}
      options={options}
    />
  );
};

export default MetricCascader;
