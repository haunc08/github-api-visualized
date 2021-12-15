import { Row, Skeleton } from 'components';
import moment from 'moment';

const { Rectangle } = Skeleton;

export default function IssueInfo({ title, author, createdAt, loading }) {
  return (
    <Row className="gap-8 justify-between">
      {loading ? (
        <Rectangle width={20} />
      ) : (
        <span className="font-semibold">{title}</span>
      )}
      {loading ? (
        <Rectangle />
      ) : (
        <span className="text-gray-500 whitespace-nowrap">
          {moment(createdAt).fromNow()} by {author}
        </span>
      )}
    </Row>
  );
}
