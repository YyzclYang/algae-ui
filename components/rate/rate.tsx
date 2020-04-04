import React, { useState } from 'react';
import Star from './star';
import { classNames, scopedClassMaker, useControlState } from '../utils';
import './style/rate.scss';

const sc = scopedClassMaker('algae-ui-rate');

interface RateProps {
  className?: string;
  style?: React.CSSProperties;
  count?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  tips?: string[];
  allowClear?: boolean;
  allowHalf?: boolean;
  onChange?: (value: number) => void;
  onHoverChange?: (value: number) => void;
}

const Rate: React.FunctionComponent<RateProps> = (props: RateProps) => {
  const {
    className,
    style,
    count,
    value,
    defaultValue,
    disabled,
    tips,
    allowClear,
    allowHalf,
    onChange,
    onHoverChange
  } = props;

  const [rateValue, setRateValue] = useControlState<number>(
    defaultValue!,
    value
  );
  const [hoverRateValue, setHoverRateValue] = useState<number>(0);

  const renderStar = (count: number, rateStarsValue: number) => {
    const starMouseEnterGenerator = (
      index: number
    ): React.MouseEventHandler<SVGSVGElement> => (
      e: React.MouseEvent<SVGSVGElement>
    ) => {
      if (disabled) {
        return;
      }
      const currentStarValue = !allowHalf
        ? 1
        : e.nativeEvent.offsetX / e.currentTarget.clientWidth > 0.5
        ? 1
        : 0.5;
      const newRateValue = index + currentStarValue;
      if (hoverRateValue !== newRateValue) {
        setHoverRateValue(newRateValue);
        onHoverChange && onHoverChange(hoverRateValue);
      }
    };

    const starMouseMoveGenerator = (
      index: number
    ): React.MouseEventHandler<SVGSVGElement> => (
      e: React.MouseEvent<SVGSVGElement>
    ) => {
      if (disabled) {
        return;
      }
      const currentStarValue = !allowHalf
        ? 1
        : e.nativeEvent.offsetX / e.currentTarget.clientWidth > 0.5
        ? 1
        : 0.5;
      const newRateValue = index + currentStarValue;
      if (hoverRateValue !== newRateValue) {
        setHoverRateValue(newRateValue);
        onHoverChange && onHoverChange(hoverRateValue);
      }
    };

    const starOnClickGenerator = (
      index: number
    ): React.MouseEventHandler<SVGSVGElement> => (
      e: React.MouseEvent<SVGSVGElement>
    ) => {
      if (disabled) {
        return;
      }
      const currentStarValue = !allowHalf
        ? 1
        : e.nativeEvent.offsetX / e.currentTarget.clientWidth > 0.5
        ? 1
        : 0.5;
      const newRateValue =
        allowClear && index + currentStarValue === rateValue
          ? 0
          : index + currentStarValue;

      setRateValue(newRateValue);
      onChange && onChange(newRateValue);
    };

    return Array.from({ length: count }).map((v, i) => {
      const currentStarValue =
        (hoverRateValue ? hoverRateValue : rateStarsValue) - i;
      const type =
        currentStarValue > 0
          ? allowHalf
            ? currentStarValue > 0.5
              ? 'full'
              : 'half'
            : 'full'
          : 'none';
      const starTips = tips ? tips[Math.ceil(i)] : undefined;
      return (
        <span
          key={i}
          data-tips={starTips ? starTips : undefined}
          className={classNames(
            sc('star-wrapper'),
            starTips ? sc('star-wrapper-tips') : ''
          )}
        >
          <Star
            type={type}
            onMouseEnter={starMouseEnterGenerator(i)}
            onMouseMove={starMouseMoveGenerator(i)}
            onClick={starOnClickGenerator(i)}
          />
        </span>
      );
    });
  };

  const rateMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) {
      return;
    }
    setHoverRateValue(0);
    onHoverChange && onHoverChange(0);
  };

  return (
    <div
      className={classNames(sc(), disabled ? sc('disabled') : '', className)}
      style={style}
      onMouseLeave={rateMouseLeave}
    >
      {renderStar(count!, rateValue)}
    </div>
  );
};

Rate.displayName = 'Rate';
Rate.defaultProps = {
  count: 5,
  defaultValue: 0,
  disabled: false,
  allowClear: false,
  allowHalf: false
};

export default Rate;
