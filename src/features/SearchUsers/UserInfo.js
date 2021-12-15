import classNames from 'classnames';
import { Row, Skeleton, Tag } from 'components';

const { Rectangle, Round } = Skeleton;

export function UserInfo({
  avatarUrl,
  name,
  login,
  reposCount,
  selected,
  className,
  nameClassName,
  contentClassname,
  loading,
}) {
  return (
    <div
      className={classNames(
        'gap-4 flex items-center flex-col px-2 lg:flex-row lg:px-0',
        className
      )}
    >
      {loading ? (
        <Round />
      ) : (
        <img
          className="w-16 h-16 object-contain rounded-full transition-all"
          src={avatarUrl}
          alt={`${name} ${login} avatar`}
        />
      )}
      <div
        className={classNames(
          'flex flex-col gap-2 items-center lg:items-start',
          contentClassname
        )}
      >
        {loading ? (
          <Rectangle />
        ) : (
          <span
            className={classNames(
              { 'text-blue-600/75': selected },
              { 'text-black/50': !selected },
              'text-center'
            )}
          >
            <b
              className={classNames(
                { 'text-blue-600': selected },
                { 'text-black': !selected },
                'font-semibold underline-offset-1 whitespace-nowrap text-lg lg:text-base group-hover:underline',
                nameClassName
              )}
            >
              {name}
            </b>{' '}
            @{login}
          </span>
        )}
        {loading ? (
          <Rectangle height={6} width={24} />
        ) : (
          <Tag selected={selected}>
            {reposCount} repositor{reposCount > 1 ? 'ies' : 'y'}
          </Tag>
        )}
      </div>
    </div>
  );
}
