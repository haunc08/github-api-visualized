import { Row, Skeleton } from 'components';

const { Rectangle } = Skeleton;

export default function RepositoryInfo({
  name,
  desc,
  stars,
  watching,
  loading,
}) {
  return (
    <div>
      <Row className="gap-4 justify-between">
        {loading ? (
          <Rectangle />
        ) : (
          <span className="font-semibold">{name}</span>
        )}
        {loading ? (
          <Rectangle width={20} />
        ) : (
          <span className="text-gray-500">
            {stars} star{!!stars > 1 && 's'} / {watching} watching
          </span>
        )}
      </Row>
      {loading ? (
        <Rectangle className="mt-4" width={72} />
      ) : (
        <p className="truncate">{desc}</p>
      )}
    </div>
  );
}
