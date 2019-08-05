import React from 'react';
import { Switch } from 'ROOT/src';

export default () => {
  return (
    <div className="switch-example-list">
      <Switch
        defaultChecked
        onChange={(checkStatus) => {
          console.log(checkStatus);
        }}
      />
    </div>
  );
};
