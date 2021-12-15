import classNames from 'classnames';

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  selected,
  className,
  ...rest
}) {
  return (
    <button
      tabIndex={disabled ? -1 : undefined}
      className={classNames(
        {
          'bg-green-600 text-white hover:bg-green-700 focus:ring-green-600/40':
            variant === 'primary',
          'border border-gray-300 bg-slate-50 hover:border-blue-500 hover:text-blue-500':
            variant === 'secondary',
          'border-blue-500 text-blue-500 shadow pointer-events-none': selected,
          'pointer-events-none opacity-50': disabled,
          'py-2 px-4': size === 'md',
          'py-1 px-2 min-w-[2.25rem]': size === 'sm',
        },
        `rounded-lg font-medium transition-all select-none shadow-sm
         focus:outline-none focus:ring`,
        className
      )}
      {...rest}
    />
  );
}
