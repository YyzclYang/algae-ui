import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Modal from './modal';
import Button from '../button';

interface ConfirmProps {
  title?: string;
  content: string;
  onOk?: React.MouseEventHandler;
  onCancel?: React.MouseEventHandler;
}

const confirm = ({ title = '提示', content, onOk, onCancel }: ConfirmProps) => {
  const onClose = () => {
    ReactDOM.render(React.cloneElement(component, { visible: false }), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  };

  const onOkClick: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClose();
    onOk && onOk(e);
  };

  const onCancelClick: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClose();
    onCancel && onCancel(e);
  };

  const component = (
    <Modal
      visible
      title={title}
      onClose={onClose}
      buttons={[
        <Button key="btn1" ghost onClick={onOkClick}>
          cancel
        </Button>,
        <Button key="btn2" buttonType="success" onClick={onCancelClick}>
          OK
        </Button>
      ]}
    >
      {content}
    </Modal>
  );

  const div = document.createElement('div');
  document.body.append(div);
  ReactDOM.render(component, div);

  return onClose;
};

confirm.prototype = {
  title: PropTypes.string,
  content: PropTypes.string.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func
};

export default confirm;
