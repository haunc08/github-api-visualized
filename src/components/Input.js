import classNames from 'classnames';
import { forwardRef } from 'react';
import Row from './Row';

const Input = forwardRef(
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
    <Row
      className={classNames(
        'py-2 px-4 bg-gray-50 border border-gray-300 rounded shadow-inner transition-all hover:border-gray-400 focus-within:ring',
        containerClassName
      )}
    >
      {!!icon && (
        <span className={classNames('mr-2', iconClassName)}>{icon}</span>
      )}
      <input
        ref={ref}
        className={classNames(
          'flex-1 bg-inherit focus:outline-none',
          className
        )}
        autoComplete={autoComplete}
        {...rest}
      />
    </Row>
  )
);
export default Input;
