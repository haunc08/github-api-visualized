import { Lists, Page } from 'components';
import { useLazyQuery } from '@apollo/client';
import UserInfo from './UserInfo';
import RepositoryInfo from './RepositoryInfo';
import { GET_USER_REPOS, SEARCH_USER } from './queries';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const { InfiniteList, PaginationList } = Lists;

const searchLimit = 5;
const reposLimit = 5;
const githubPaginationLimit = 100;

export default function SearchUsers() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [selectedUser, setSelectedUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [reposCurrentPage, setReposCurrentPage] = useState(1);
  const [
    searchUsers,
    { loading: searchLoading, error: searchError, data: fetchedSearchResult },
  ] = useLazyQuery(SEARCH_USER);
  const [
    getUserRepos,
    {
      loading: getUserReposLoading,
      error: getUserReposError,
      data: fetchedRepos,
    },
  ] = useLazyQuery(GET_USER_REPOS);

  const fetchedPages = useRef(0);

  const searchQuery = searchParams.get('q');

  useEffect(() => {
    if (searchQuery) {
      searchUsers({
        variables: {
          searchQuery,
          first: searchLimit,
        },
      });
      setUsers([]);
      fetchedPages.current = 0;
    }
  }, [searchQuery, searchUsers, setUsers]);

  useEffect(() => {
    if (fetchedSearchResult) {
      setUsers((prev) => prev.concat(fetchedSearchResult.search.nodes));
      setUserCount(fetchedSearchResult.search.userCount);
    }
  }, [fetchedSearchResult, setUsers]);

  const searchNextUsers = () => {
    const hasNextPage = fetchedSearchResult?.search.pageInfo;
    const endCursor = fetchedSearchResult?.search.pageInfo.endCursor;
    if (hasNextPage && endCursor) {
      searchUsers({
        variables: {
          searchQuery,
          first: searchLimit,
          after: endCursor,
        },
      });
    }
  };

  const handleSelectUser = (key, item) => {
    if (item.login) {
      getUserRepos({ variables: { login: item.login, first: reposLimit } });
      setSelectedUser({
        login: item.login,
        name: item.name,
        reposCount: item?.repositories?.totalCount,
      });
      setRepos([]);
      setReposCurrentPage(1);
      fetchedPages.current = 1;
    }
  };

  useEffect(() => {
    if (fetchedRepos) {
      setRepos((prev) => prev.concat(fetchedRepos.user.repositories.nodes));
    }
  }, [fetchedRepos]);

  const handleChangeReposPage = (page) => {
    if (fetchedPages.current < page) {
      getUserRepos({
        variables: {
          login: selectedUser.login,
          first: (page - reposCurrentPage) * reposLimit,
          after: fetchedRepos.user.repositories.pageInfo.endCursor,
        },
      });
      fetchedPages.current = page;
    }
    setReposCurrentPage(page);
  };

  return (
    <Page className="flex flex-col gap-6 lg:flex-row">
      <InfiniteList
        containerClassName="flex overflow-hidden lg:flex-1 lg:max-h-content-h lg:max-w-md "
        className="overflow-auto flex lg:block"
        header={`Users (${userCount})`}
        data={users}
        keyField="login"
        loading={searchLoading}
        selectable
        onSelect={handleSelectUser}
        renderItem={(item, index, selected) => (
          <UserInfo
            selected={selected}
            avatarUrl={item.avatarUrl}
            name={item.name}
            login={item.login}
            reposCount={item.repositories?.totalCount}
          />
        )}
        onBottomReached={searchNextUsers}
        loadingComponent={<UserInfo loading />}
        loadingItemCount={3}
      />
      {!!selectedUser.login && (
        <PaginationList
          containerClassName="flex-1 overflow-hidden mb-8"
          className="overflow-auto"
          header={`${selectedUser.name}'s repositories (${
            selectedUser.reposCount || 0
          })`}
          data={repos}
          keyField="name"
          loading={getUserReposLoading}
          pageSize={5}
          currentPage={reposCurrentPage}
          onPageChange={handleChangeReposPage}
          renderItem={(item, index) => (
            <RepositoryInfo
              name={item.name}
              desc={item.description}
              stars={item.stargazerCount}
              watching={item.watchers.totalCount}
            />
          )}
          loadingComponent={<RepositoryInfo loading />}
          loadingItemCount={5}
          total={selectedUser.reposCount}
        />
      )}
    </Page>
  );
}
