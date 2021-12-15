import classNames from 'classnames';
import { twUnitToRem } from 'utils/string';

function SkeletonBase({ className, ...rest }) {
  return (
    <div
      className={classNames(`animate-pulse bg-slate-200`, className)}
      {...rest}
    />
  );
}

function Round({ size = 16, className, ...rest }) {
  return (
    <SkeletonBase
      className={classNames(`rounded-full`, className)}
      style={{
        width: twUnitToRem(size),
        height: twUnitToRem(size),
      }}
      {...rest}
    />
  );
}

function Rectangle({ height = 4, width = 48, className, ...rest }) {
  return (
    <SkeletonBase
      className={classNames(`rounded`, className)}
      style={{
        width: twUnitToRem(width),
        height: twUnitToRem(height),
      }}
      {...rest}
    />
  );
}

const Skeleton = {
  Round,
  Rectangle,
};

export default Skeleton;
