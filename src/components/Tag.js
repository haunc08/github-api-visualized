import classNames from 'classnames';

export default function Tag({ className, selected, ...rest }) {
  return (
    <span
      className={classNames(
        {
          'bg-blue-100 border-blue-100 text-blue-500': selected,
          'bg-slate-100': !selected,
        },
        'text-xs py-1 px-2 rounded font-semibold border whitespace-nowrap',
        className
      )}
      {...rest}
    />
  );
}
