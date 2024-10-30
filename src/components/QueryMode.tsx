import { RadioButtonGroup } from '@grafana/ui';
import React from 'react';
import { QueryModeEnum } from 'types';

interface QueryModeProps {
  value: QueryModeEnum;
  onChange: (value: QueryModeEnum) => void;
}

const QueryMode: React.FC<QueryModeProps> = ({ value, onChange }) => {
  return (
    <RadioButtonGroup
      value={value}
      onChange={onChange}
      options={[
        { label: QueryModeEnum.Buildin, value: QueryModeEnum.Buildin },
        { label: QueryModeEnum.Code, value: QueryModeEnum.Code },
      ]}
    />
  );
};

export default QueryMode;
