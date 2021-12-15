import { Row, Skeleton } from 'components';

const { Rectangle } = Skeleton;

export function RepositoryInfo({ name, desc, stars, watching }) {
  return (
    <div>
      <Row className="gap-4 justify-between">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-500">
          {stars} star{!!stars > 1 && 's'} / {watching} watching
        </span>
      </Row>
      <p className="truncate">{desc}</p>
    </div>
  );
}

export function RepositoryInfoSkeleton() {
  return (
    <div>
      <Row className="gap-4 justify-between">
        <Rectangle />
        <Rectangle width={20} />
      </Row>
      <Rectangle className="mt-4" width={72} />
    </div>
  );
}
