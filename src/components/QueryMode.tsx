import React from 'react';
import { RadioButtonGroup, Tag } from '@grafana/ui';
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
        {
          label: QueryModeEnum.Builder,
          value: QueryModeEnum.Builder,
          component: (_props) => <Tag className="css-192wtue" name="推荐" colorIndex={1} />,
        },
        { label: QueryModeEnum.Code, value: QueryModeEnum.Code },
      ]}
    />
  );
};

export default QueryMode;
