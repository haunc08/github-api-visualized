import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Heading,
  Page,
  Lists,
  Modal,
  Input,
  TextArea,
  Button,
} from 'components';
import { useParams } from 'react-router-dom';
import IssueInfo from './IssueInfo';
import { CREATE_ISSUE, GET_ISSUES } from './queries';

const { PaginationList } = Lists;

const issuesLimit = 7;

export default function Repository() {
  const { owner, name } = useParams();
  const [issues, setIssues] = useState([]);
  const [repoInfo, setRepoInfo] = useState({});
  const [issueCount, setIssueCount] = useState(0);
  const [issueCurrentPage, setIssueCurrentPage] = useState(1);
  const [showNewIssueModal, setShowNewIssueModal] = useState(false);
  const [showCreatedModal, setShowCreatedModal] = useState(false);

  const [
    getIssues,
    { loading: getIssuesLoading, error: getIssuesError, data: getIssuesData },
  ] = useLazyQuery(GET_ISSUES);
  const [createIssue, { error: createIssueError }] = useMutation(CREATE_ISSUE);

  useEffect(() => {
    if (owner && name) {
      setIssues([]);
      getIssues({
        variables: {
          owner,
          name,
          first: issuesLimit,
        },
      });
    }
  }, [getIssues, name, owner]);

  useEffect(() => {
    if (getIssuesData) {
      setIssues((prev) => prev.concat(getIssuesData.repository.issues.nodes));
      setRepoInfo({
        stars: getIssuesData.repository.stargazerCount,
        watching: getIssuesData.repository.watchers.totalCount,
        id: getIssuesData.repository.id,
      });
      setIssueCount(getIssuesData.repository.issues.totalCount);
    }
  }, [getIssuesData]);

  const handleChangeIssuePage = (page) => {
    if (issues.length / issuesLimit < page) {
      getIssues({
        variables: {
          owner,
          name,
          first: issuesLimit,
          after: getIssuesData.repository.issues.pageInfo.endCursor,
        },
      });
    }
    setIssueCurrentPage(page);
  };

  const handleSubmitNewIssue = (e) => {
    createIssue({
      variables: {
        repositoryId: repoInfo.id,
        title: e.target.title.value.trim(),
        body: e.target.description.value.trim(),
      },
    }).then(({ data }) => {
      if (data) {
        setIssues([]);
        getIssues({
          variables: {
            owner,
            name,
            first: issuesLimit,
          },
        });
        setShowCreatedModal(true);
      }
    });
  };

  return (
    <Page className="max-w-5xl" error={getIssuesError || createIssueError}>
      <div className="flex flex-col sm:flex-row justify-between flex-wrap mx-4">
        <Heading level={2}>
          {owner}/{name}
        </Heading>
        <Heading
          level={2}
          className="text-gray-500 font-normal text-lg sm:text-3xl"
        >
          {repoInfo.stars} star{!!repoInfo.stars > 1 && 's'} /{' '}
          {repoInfo.watching} watching
        </Heading>
      </div>
      <PaginationList
        containerClassName="flex-1 overflow-hidden mb-8"
        className="overflow-auto"
        header={
          <div className="flex justify-between">
            <span>Open issues ({issueCount})</span>
            <Button
              className="text-sm pb-[0.4rem] m-1"
              size="sm"
              onClick={() => setShowNewIssueModal(true)}
            >
              New issue
            </Button>
          </div>
        }
        data={issues}
        keyField="id"
        total={issueCount}
        loading={getIssuesLoading}
        pageSize={issuesLimit}
        currentPage={issueCurrentPage}
        onPageChange={handleChangeIssuePage}
        onClick={() => {}}
        renderItem={(item, index) => (
          <IssueInfo
            title={item.title}
            author={item.author.login}
            createdAt={item.createdAt}
          />
        )}
        loadingComponent={<IssueInfo loading />}
        loadingItemCount={issuesLimit}
      />
      <Modal
        show={showNewIssueModal}
        className="w-full"
        header="New issue"
        primaryText="Create"
        onPrimaryClick={handleSubmitNewIssue}
        onDefaultClose={setShowNewIssueModal}
        closeOnBackdropClick={false}
      >
        <div className="flex flex-col gap-4">
          <Input name="title" placeholder="Title" required />
          <TextArea
            name="description"
            className="h-56"
            placeholder="Description"
            required
          />
        </div>
      </Modal>
      <Modal
        header="Success"
        showSecondary={false}
        show={showCreatedModal}
        onDefaultClose={setShowCreatedModal}
        primaryText="Ok"
      >
        Issue created successfully!
      </Modal>
    </Page>
  );
}
