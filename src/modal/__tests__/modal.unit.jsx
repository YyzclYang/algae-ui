import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Modal from '../index';
import Button from '../../button';
import { mount } from 'enzyme';

describe('Modal', () => {
  it('渲染一个 Modal', () => {
    let visible = true;
    const component = mount(
      <Modal
        visible={visible}
        onClose={() => (visible = false)}
        buttons={[
          <Button key="btn1" ghost onClick={() => (visible = false)}>
            cancel
          </Button>,
          <Button
            key="btn2"
            buttonType="success"
            onClick={() => (visible = false)}
          >
            OK
          </Button>
        ]}
      >
        Modal Message
      </Modal>
    );
    expect(component.innerText).toBe(undefined);
    expect(document.body.querySelectorAll('.algae-ui-modal-mask').length).toBe(
      1
    );
    expect(document.body.querySelectorAll('.algae-ui-modal').length).toBe(1);
  });

  it('点击 Cancel 按钮 Modal 消失', () => {
    let visible = true;
    const onClose = () => (visible = false);
    const component = mount(
      <Modal
        visible={visible}
        onClose={onClose}
        buttons={[
          <Button id="btn1" key="btn1" ghost onClick={onClose}>
            Cancel
          </Button>,
          <Button id="btn2" key="btn2" buttonType="success" onClick={onClose}>
            OK
          </Button>
        ]}
      >
        Modal Message
      </Modal>
    );
    ReactTestUtils.Simulate.click(document.querySelectorAll('#btn1')[0]);
    setTimeout(() => {
      expect(
        document.body.querySelectorAll('.algae-ui-modal-mask').length
      ).toBe(0);
      expect(document.body.querySelectorAll('.algae-ui-modal').length).toBe(0);
    }, 100);
  });

  it('点击 OK 按钮 Modal 消失', () => {
    let visible = true;
    const onClose = () => (visible = false);
    const component = mount(
      <Modal
        visible={visible}
        onClose={onClose}
        buttons={[
          <Button id="btn1" key="btn1" ghost onClick={onClose}>
            Cancel
          </Button>,
          <Button id="btn2" key="btn2" buttonType="success" onClick={onClose}>
            OK
          </Button>
        ]}
      >
        Modal Message
      </Modal>
    );
    ReactTestUtils.Simulate.click(document.querySelectorAll('#btn2')[0]);
    setTimeout(() => {
      expect(
        document.body.querySelectorAll('.algae-ui-modal-mask').length
      ).toBe(0);
      expect(document.body.querySelectorAll('.algae-ui-modal').length).toBe(0);
    }, 100);
  });

  it('点击 Cancel 按钮 Modal 消失', () => {
    let visible = true;
    const onClose = () => (visible = false);
    const component = mount(
      <Modal
        visible={visible}
        onClose={onClose}
        buttons={[
          <Button id="btn1" key="btn1" ghost onClick={onClose}>
            Cancel
          </Button>,
          <Button id="btn2" key="btn2" buttonType="success" onClick={onClose}>
            OK
          </Button>
        ]}
      >
        Modal Message
      </Modal>
    );
    ReactTestUtils.Simulate.click(
      document.querySelectorAll('.algae-ui-close')[0]
    );
    setTimeout(() => {
      expect(
        document.body.querySelectorAll('.algae-ui-modal-mask').length
      ).toBe(0);
      expect(document.body.querySelectorAll('.algae-ui-modal').length).toBe(0);
    }, 100);
  });
});
