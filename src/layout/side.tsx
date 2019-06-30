import React from 'react';
import classNames from '../utils/classNames';
import scopedClassMaker from '../utils/scopedClassMaker';

const sc = scopedClassMaker('algae-ui-layout');

interface SideProps extends React.HtmlHTMLAttributes<HTMLElement> {}

const Side: React.FunctionComponent<SideProps> = (props: SideProps) => {
  const { className, style, children, ...rest } = props;

  return (
    <div className={classNames(sc('side'), className)} style={style} {...rest}>
      {children}
    </div>
  );
};

export default Side;
