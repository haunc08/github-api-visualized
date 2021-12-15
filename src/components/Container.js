import classNames from 'classnames';

export default function Container({ className, ...rest }) {
  return (
    <div
      className={classNames('max-w-7xl mr-auto ml-auto', className)}
      {...rest}
    />
  );
}
