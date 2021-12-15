import classNames from 'classnames';

export default function Row({ className, ...rest }) {
  return (
    <div className={classNames('flex items-center', className)} {...rest} />
  );
}
