import classNames from 'classnames';
import Button from './Button';
import Row from './Row';
import { range } from 'utils/array';
import { useSm } from 'hooks/useResponsive';

function NumberButton({ children, selected, onChange }) {
  return (
    <Button
      selected={selected}
      variant="secondary"
      size="sm"
      onClick={() => onChange(children)}
    >
      {children}
    </Button>
  );
}

function MoreIcon() {
  return <i className="bi bi-three-dots self-center" />;
}

export default function Pagination({
  size = 5,
  total,
  current = 1,
  onChange = (page) => {},
  className,
  ...rest
}) {
  const compact = !useSm();
  const buttonsCount = compact ? 7 : 9;
  const pages = Math.ceil(total / size);
  const farStart =
    pages > buttonsCount && current > Math.ceil(buttonsCount / 2);
  const farEnd =
    pages > buttonsCount && current < pages - Math.floor(buttonsCount / 2);

  return (
    <Row
      className={classNames('gap-2 items-stretch flex-wrap p-2', className)}
      {...rest}
    >
      <Button
        size="sm"
        disabled={current < 2}
        onClick={() => onChange(current - 1)}
      >
        <i className="bi bi-chevron-left" />
      </Button>
      {farStart && (
        <>
          <NumberButton selected={current === 1} onChange={onChange}>
            1
          </NumberButton>
          <MoreIcon />
        </>
      )}
      {range(
        farStart
          ? Math.min(
              current - Math.floor((buttonsCount - 4) / 2),
              pages - buttonsCount + 3
            )
          : 1,
        Math.min(buttonsCount, pages) - (farStart && 2) - (farEnd && 2)
      ).map((number) => (
        <NumberButton
          key={number}
          selected={Number(current) === Number(number)}
          onChange={onChange}
        >
          {number}
        </NumberButton>
      ))}
      {farEnd && (
        <>
          <MoreIcon />
          <NumberButton selected={current === pages} onChange={onChange}>
            {pages}
          </NumberButton>
        </>
      )}
      <Button
        size="sm"
        disabled={current >= pages}
        onClick={() => onChange(current + 1)}
      >
        <i className="bi bi-chevron-right" />
      </Button>
    </Row>
  );
}
