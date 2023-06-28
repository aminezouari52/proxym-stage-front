// REACT
import { useGetSessionsQuery } from 'modules/Admin/redux';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';

// STYLED COMPONENTS
import { Flex } from '@chakra-ui/react';

// PROJECT COMPONENTS
import CreateSession from 'modules/Admin/components/Sessions/CreateSession';
import SessionsList from './paginatedSessions/SessionsList';

const Sessions = () => {
  const { data: userData } = useDecodeTokenQuery({});

  let sortedArray;
  const { data, refetch } = useGetSessionsQuery({});
  if (data) {
    sortedArray = JSON.parse(JSON.stringify(data)).sort(
      (a: any, b: any) => a.id - b.id
    );
  }

  return (
    <Flex direction="column" justifyContent="space-between" p={8}>
      {userData?.user?.role == 'admin' && <CreateSession refetch={refetch} />}
      <SessionsList sessionsPerPage={3} sessions={sortedArray} />
    </Flex>
  );
};

export default Sessions;
