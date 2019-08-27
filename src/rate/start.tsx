import React from 'react';
import PropTypes from 'prop-types';
import './style/start.scss';

interface StartProps {
  type?: 'none' | 'half' | 'full';
  style?: React.CSSProperties;
}

const Start: React.FunctionComponent<StartProps> = (props: StartProps) => {
  const { type, style } = props;

  return (
    <svg
      className="algae-ui-rate-start"
      viewBox="0 0 1072 1024"
      width="209.375"
      height="200"
      style={style}
    >
      {[0, 1, 2].map((index) => (
        <linearGradient
          id={`grad-${index}`}
          x1="0"
          x2="100%"
          y1="0"
          y2="0"
          key={index}
        >
          <stop offset={0.5 * index} stopColor="#FDD164" />
          <stop offset="0%" stopColor="#E8E8E8" />
        </linearGradient>
      ))}
      <path
        d="M534.8028125 845.988125l-268.26375 141.4125a38.323125 38.323125 0 0 1-55.569375-40.23937499l51.3534375-299.68781251L43.88 435.1615625a38.323125 38.323125 0 0 1 21.0778125-65.533125l300.8390625-43.6875L500.31124999 53.4603125a38.323125 38.323125 0 0 1 68.59875001 0l134.5153125 272.8621875 300.838125 43.6884375a38.323125 38.323125 0 0 1 21.07781249 65.533125L807.665 647.8559375l51.3525 299.68875a38.323125 38.323125 0 0 1-55.951875 39.856875z"
        fill={
          type === 'none'
            ? 'url(#grad-0)'
            : type === 'half'
            ? 'url(#grad-1)'
            : 'url(#grad-2)'
        }
      />
    </svg>
  );
};

Start.displayName = 'Start';
Start.propTypes = {
  type: PropTypes.oneOf(['none', 'half', 'full']),
  style: PropTypes.object
};
Start.defaultProps = {
  type: 'none'
};

export default Start;
