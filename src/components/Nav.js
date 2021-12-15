import classNames from 'classnames';

export default function Nav({ className, ...rest }) {
  return (
    <nav
      className={classNames('flex h-nav-h px-4 items-center', className)}
      {...rest}
    />
  );
}
