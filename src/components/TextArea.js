import classNames from 'classnames';
import { forwardRef } from 'react';

const TextArea = forwardRef(
  (
    {
      autoComplete = 'off',
      icon,
      className,
      containerClassName,
      iconClassName,
      ...rest
    },
    ref
  ) => (
    <textarea
      ref={ref}
      className={classNames(
        'py-2 px-4 w-full bg-gray-50 border border-gray-300 rounded shadow-inner transition-colors hover:border-gray-400 focus-within:ring focus:outline-none',
        className
      )}
      autoComplete={autoComplete}
      {...rest}
    />
  )
);
export default TextArea;
