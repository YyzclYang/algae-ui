import React from 'react';
import { Button } from 'algae-ui/lib';

export default () => {
  return (
    <div className="example-list">
      <Button buttonType="primary">Primary</Button>
      <Button>Default</Button>
      <Button buttonType="success">Success</Button>
      <Button buttonType="danger">Danger</Button>
    </div>
  );
};
