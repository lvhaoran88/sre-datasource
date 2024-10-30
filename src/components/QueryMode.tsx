import { RadioButtonGroup, Tag } from '@grafana/ui';
import React, { Fragment } from 'react';
import { QueryModeEnum } from 'types';

interface QueryModeProps {
  value: QueryModeEnum;
  onChange: (value: QueryModeEnum) => void;
}

// 推荐组件
const Recommend: React.FC<{ value: QueryModeEnum }> = ({ value }) => {
  return (
    <Fragment>
      {value}
      <Tag className="css-192wtue" name="推荐" icon={'ai'} colorIndex={1} />
    </Fragment>
  );
};

const QueryMode: React.FC<QueryModeProps> = ({ value, onChange }) => {
  return (
    <RadioButtonGroup
      value={value}
      onChange={onChange}
      options={[
        {
          label: QueryModeEnum.Builder,
          value: QueryModeEnum.Builder,
          component: (_props) => <Recommend value={QueryModeEnum.Builder} />,
        },
        { label: QueryModeEnum.Code, value: QueryModeEnum.Code },
      ]}
    />
  );
};

export default QueryMode;
