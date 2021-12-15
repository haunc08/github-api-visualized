import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, Row } from 'components';

export default function SearchUserBar(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = e.target.search.value.trim();
    if (!searchValue) return;
    // setUsers([]);
    navigate(`search?q=${searchValue}`);
  }

  useEffect(() => {
    searchInputRef.current.value = searchParams.get('q');
  }, [searchParams]);

  return (
    <form className="flex-1" method="GET" onSubmit={handleSubmit} {...props}>
      <Row className="gap-2 max-w-lg ml-auto mr-auto">
        <Input
          ref={searchInputRef}
          name="search"
          containerClassName="flex-1"
          placeholder="Search user..."
          type="search"
          icon={<i className="bi bi-search" />}
        />
        <Button tag="a" type="submit">
          Search
        </Button>
      </Row>
    </form>
  );
}
