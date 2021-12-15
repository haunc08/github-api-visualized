import { Container, Main, Lists, Page } from 'components';
import { InMemoryCache, useLazyQuery } from '@apollo/client';
import { UserInfo } from './UserInfo';
import { RepositoryInfo } from './RepositoryInfo';
import { GET_USER_REPOS, SEARCH_USER } from './queries';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

const { InfiniteList, PaginationList } = Lists;

export default function SearchUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const userCount = useRef(0);

  const [searchParams] = useSearchParams();

  const [
    searchUsers,
    { loading: searchLoading, error: searchError, data: searchResult },
  ] = useLazyQuery(SEARCH_USER);
  const [
    getUserRepos,
    { loading: getUserReposLoading, error: getUserReposError, data: userRepos },
  ] = useLazyQuery(GET_USER_REPOS);

  const searchQuery = searchParams.get('q');

  useEffect(() => {
    if (searchResult) {
      setUsers((prev) => prev.concat(searchResult?.search.edges));
      userCount.current = searchResult?.search.userCount;
    }
  }, [searchResult]);

  useEffect(() => {
    if (searchQuery) {
      searchUsers({
        variables: {
          searchQuery,
        },
        onCompleted: () => {
          setUsers([]);
          setSelectedUser({});
        },
      });
    }
  }, [searchQuery, searchUsers]);

  const searchNextUsers = () => {
    if (
      searchResult?.search.pageInfo.hasNextPage &&
      searchResult?.search.pageInfo.endCursor
    ) {
      searchUsers({
        variables: {
          searchQuery,
          after: searchResult?.search.pageInfo.endCursor,
        },
      });
    }
  };

  const handleSelectUser = (e, item) => {
    setSelectedUser({
      ...item.node,
      reposCount: item.node.repositories.totalCount,
    });
    getUserRepos({ variables: { login: selectedUser.login } });
  };

  return (
    <Page className="flex flex-col gap-6 lg:flex-row">
      <InfiniteList
        loading={searchLoading}
        containerClassName="flex overflow-hidden lg:flex-1 lg:max-h-content-h lg:max-w-md "
        className="overflow-auto flex lg:block"
        header={`Users (${userCount.current})`}
        data={users}
        keyField="node.login"
        onClick={handleSelectUser}
        selectable
        renderItem={({ node }, index, selected) => (
          <UserInfo
            selected={selected}
            avatarUrl={node.avatarUrl}
            name={node.name}
            login={node.login}
            reposCount={node.repositories?.totalCount}
          />
        )}
        loadingComponent={<UserInfo loading />}
        loadingItemCount={3}
        onBottomReached={() => searchNextUsers()}
      />
      {!!selectedUser.login && (
        <PaginationList
          containerClassName="flex-1 overflow-hidden mb-8"
          className="overflow-auto"
          header={`${selectedUser.name}'s repositories (${
            selectedUser.reposCount || 0
          })`}
          data={userRepos?.user.repositories.nodes}
          onClick={() => {}}
          renderItem={(item, index) => (
            <RepositoryInfo
              name={item.name}
              desc={item.description}
              stars={item.stargazerCount}
              watching={item.watchers.totalCount}
            />
          )}
        />
      )}
    </Page>
  );
}
