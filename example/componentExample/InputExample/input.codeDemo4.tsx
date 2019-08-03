import React, { useState } from 'react';
import { TextArea } from 'algae-ui/lib';

export default () => {
  const [value, setValue] = useState<string>('');
  return (
    <div className="input-example-list">
      <TextArea
        defaultValue="default input"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          console.log(e.currentTarget.value);
        }}
      />
    </div>
  );
};
