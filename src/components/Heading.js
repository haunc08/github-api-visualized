import classNames from 'classnames';

const levelClassNames = [
  'text-4xl',
  'text-3xl',
  'text-2xl',
  'text-xl',
  'text-lg',
  'text-base',
];

export default function Heading({ level = 3, className, ...rest }) {
  level = Number(level);
  if (level < 1) level = 1;
  if (level > 6) level = 6;

  const Tag = `h${level}`;

  return (
    <Tag
      className={classNames(
        'font-semibold mb-4',
        levelClassNames[level - 1],
        className
      )}
      {...rest}
    />
  );
}
