import React, { useState } from 'react';
import { Modal } from 'ROOT/src';
import { Button } from 'ROOT/src';
import { confirm } from 'ROOT/src/modal';

const ModalExample: React.FunctionComponent = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Modal</Button>
      {visible && (
        <Modal
          visible
          onClose={() => setVisible(false)}
          buttons={[
            <Button key="btn1" ghost onClick={() => setVisible(false)}>
              cancel
            </Button>,
            <Button
              key="btn2"
              buttonType="success"
              onClick={() => setVisible(false)}
            >
              OK
            </Button>
          ]}
        >
          Modal Message
        </Modal>
      )}
      <Button
        buttonType="primary"
        onClick={() =>
          confirm({
            content: 'confirm',
            iconType: 'like',
            onOk: () => {
              console.log('你点击了 OK');
            },
            onCancel: () => {
              console.log('你点击了 cancel');
            }
          })
        }
      >
        confirm
      </Button>
    </div>
  );
};

export default ModalExample;
