import { useEffect, useState } from 'react';
import { Lists, Page } from 'components';
import { useLazyQuery } from '@apollo/client';
import UserInfo from './UserInfo';
import RepositoryInfo from './RepositoryInfo';
import { GET_USER_REPOS, SEARCH_USER } from './queries';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
  const [customError, setCustomError] = useState(null);
  const [
    searchUsers,
    { loading: searchLoading, error: searchError, data: searchData },
  ] = useLazyQuery(SEARCH_USER);
  const [
    getUserRepos,
    { loading: getReposLoading, error: getReposError, data: getReposData },
  ] = useLazyQuery(GET_USER_REPOS);
  const navigate = useNavigate();

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
    }
  }, [searchQuery, searchUsers, setUsers]);

  useEffect(() => {
    if (searchData) {
      setUsers((prev) => prev.concat(searchData.search.nodes));
      setUserCount(searchData.search.userCount);
    }
  }, [searchData, setUsers]);

  const searchNextUsers = () => {
    const hasNextPage = searchData?.search.pageInfo;
    const endCursor = searchData?.search.pageInfo.endCursor;
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
    }
  };

  useEffect(() => {
    if (getReposData) {
      setRepos((prev) => prev.concat(getReposData.user.repositories.nodes));
    }
  }, [getReposData]);

  const handleChangeReposPage = (page) => {
    if ((page - reposCurrentPage) * reposLimit > githubPaginationLimit) {
      setCustomError({
        message: `The request exceeds Github GraphQL API's limit of 100 pagination records.`,
      });
      return;
    }
    if (repos.length / reposLimit < page) {
      getUserRepos({
        variables: {
          login: selectedUser.login,
          first: (page - reposCurrentPage) * reposLimit,
          after: getReposData.user.repositories.pageInfo.endCursor,
        },
      });
    }
    setReposCurrentPage(page);
  };

  return (
    <Page
      className="flex flex-col gap-6 lg:flex-row"
      error={searchError || getReposError || customError}
    >
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
          total={selectedUser.reposCount}
          loading={getReposLoading}
          pageSize={reposLimit}
          currentPage={reposCurrentPage}
          onPageChange={handleChangeReposPage}
          onClick={(e, item) =>
            navigate(`/repository/${selectedUser.login}/${item.name}`)
          }
          renderItem={(item, index) => (
            <RepositoryInfo
              name={item.name}
              desc={item.description}
              stars={item.stargazerCount}
              watching={item.watchers.totalCount}
            />
          )}
          loadingComponent={<RepositoryInfo loading />}
          loadingItemCount={reposLimit}
        />
      )}
    </Page>
  );
}
