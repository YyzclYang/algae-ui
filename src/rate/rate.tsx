import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Star from './star';
import classNames from '../utils/classNames';
import scopedClassMaker from '../utils/scopedClassMaker';
import './style/rate.scss';

const sc = scopedClassMaker('algae-ui-rate');

interface RateProps {
  className?: string;
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
    count,
    value,
    defaultValue,
    tips,
    allowClear,
    allowHalf,
    onChange,
    onHoverChange
  } = props;

  const [rateValue, setRateValue] = useState<number>(
    value !== undefined ? value : defaultValue!
  );
  const [hoverRateValue, setHoverRateValue] = useState<number>(0);

  useEffect(() => {
    if (value !== undefined) {
      setRateValue(value);
    }
  }, [value]);

  useEffect(() => {
    onHoverChange && onHoverChange(hoverRateValue);
  }, [hoverRateValue]);

  const renderStar = (count: number, rateStarsValue: number) => {
    const starMouseEnterGenerator = (
      index: number
    ): React.MouseEventHandler<SVGSVGElement> => (
      e: React.MouseEvent<SVGSVGElement>
    ) => {
      const currentStarValue = !allowHalf
        ? 1
        : e.nativeEvent.offsetX / e.currentTarget.clientWidth > 0.5
        ? 1
        : 0.5;
      const newRateValue = index + currentStarValue;
      if (hoverRateValue !== newRateValue) {
        setHoverRateValue(newRateValue);
      }
    };

    const starMouseMoveGenerator = (
      index: number
    ): React.MouseEventHandler<SVGSVGElement> => (
      e: React.MouseEvent<SVGSVGElement>
    ) => {
      const currentStarValue = !allowHalf
        ? 1
        : e.nativeEvent.offsetX / e.currentTarget.clientWidth > 0.5
        ? 1
        : 0.5;
      const newRateValue = index + currentStarValue;
      if (hoverRateValue !== newRateValue) {
        setHoverRateValue(newRateValue);
      }
    };

    const starOnClickGenerator = (
      index: number
    ): React.MouseEventHandler<SVGSVGElement> => (
      e: React.MouseEvent<SVGSVGElement>
    ) => {
      const currentStarValue = !allowHalf
        ? 1
        : e.nativeEvent.offsetX / e.currentTarget.clientWidth > 0.5
        ? 1
        : 0.5;
      const newRateValue =
        allowClear && index + currentStarValue === rateValue
          ? 0
          : index + currentStarValue;

      if (value === undefined) {
        setRateValue(newRateValue);
      }
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
      const starTips = tips ? tips[i] : undefined;
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

  const rateMouseLeave: React.MouseEventHandler<HTMLDivElement> = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoverRateValue(0);
  };

  return (
    <div className={classNames(sc(), className)} onMouseLeave={rateMouseLeave}>
      {renderStar(count!, rateValue)}
    </div>
  );
};

Rate.displayName = 'Rate';
Rate.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number
};
Rate.defaultProps = {
  count: 5,
  defaultValue: 0
};

export default Rate;
