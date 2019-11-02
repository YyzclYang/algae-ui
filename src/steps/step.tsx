import React from 'react';
import PropTypes from 'prop-types';
import { classNames, scopedClassMaker } from '../utils/index';
import Icon from '../icon';
import './style/step.scss';

const sc = scopedClassMaker('algae-ui-step');

interface StepProps {
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactElement | string;
  defaultIcon?: string;
  title: string;
  subTitle?: string;
  description?: string;
  status?: 'waiting' | 'process' | 'success' | 'fail';
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Step: React.FunctionComponent<StepProps> = (props: StepProps) => {
  const {
    className,
    style,
    icon,
    defaultIcon,
    title,
    subTitle,
    description,
    status,
    disabled,
    onClick
  } = props;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) {
      return;
    }
    onClick && onClick(e);
  };

  return (
    <div className={sc('wrapper')}>
      <div
        className={classNames(sc(), sc(status), className)}
        onClick={handleClick}
        style={style}
      >
        <div className={classNames(sc('icon-wrapper'))}>
          {React.isValidElement(icon) ? (
            icon
          ) : status === 'success' ? (
            <Icon type="check-circle" />
          ) : status === 'fail' ? (
            <Icon type="close-circle" />
          ) : (
            <span className={classNames(sc('icon'))}>
              {icon || defaultIcon}
            </span>
          )}
        </div>
        <div className={classNames(sc('content'))}>
          <div className={classNames(sc('title'))}>
            {title}
            {subTitle && (
              <span className={classNames(sc('subTitle'))}>{subTitle}</span>
            )}
          </div>
          <p className={classNames(sc('description'))}>{description}</p>
        </div>
      </div>
    </div>
  );
};

Step.displayName = 'Step';
Step.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  defaultIcon: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.oneOf(['waiting', 'process', 'success', 'fail']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};
Step.defaultProps = {
  status: 'waiting'
};

export default Step;
