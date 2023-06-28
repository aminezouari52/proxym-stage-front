// REACT
import { useState } from 'react';
import {
  useGetActiveSessionQuery,
  useGetMyCandidatesQuery,
} from 'modules/Admin/redux';

// STYLED COMPONENTS
import { Button, Flex, Heading } from '@chakra-ui/react';

// PROJECT COMPONENTS
import CandidatesList from './paginatedCandidates/CandidatesList';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';

const CurrentCandidates = () => {
  const [numberCandidatesPerPage, setNumberCandidatesPerPage] = useState(5);
  const setNumberCandidatesPerPageHandler = (number: number) => {
    setNumberCandidatesPerPage(number);
  };
  const [showMyCandidates, setShowMyCandidates] = useState<any>(false);

  const { data: activeSession } = useGetActiveSessionQuery({});
  const { data: currentUser } = useDecodeTokenQuery({});

  const { data: myCandidatesData } = useGetMyCandidatesQuery(
    currentUser?.user?.id,
    { skip: !showMyCandidates }
  );

  const showMyCandidatesHandler = () => {
    showMyCandidates ? setShowMyCandidates(false) : setShowMyCandidates(true);
  };
  return (
    <Flex direction="column" justifyContent="space-between" p={4}>
      <Flex
        direction={{ lg: 'row', base: 'column' }}
        alignItems={{ lg: 'center', base: 'start' }}
        w="100%"
      >
        <Heading size="md" fontSize={{ lg: '2xl', base: 'xs' }}>
          Tableau des candidats de : {activeSession?.title}
        </Heading>
        <Button
          ml={{ lg: 2, base: 0 }}
          mt={{ lg: 0, base: 2 }}
          onClick={showMyCandidatesHandler}
          colorScheme={showMyCandidates && 'purple'}
          variant={showMyCandidates ? 'solid' : 'outline'}
          size="xs"
        >
          Voir mes candidats
        </Button>
      </Flex>
      <CandidatesList
        candidatesPerPage={numberCandidatesPerPage}
        candidates={
          showMyCandidates ? myCandidatesData : activeSession?.candidates
        }
        setNumberCandidatesPerPageHandler={setNumberCandidatesPerPageHandler}
      />
    </Flex>
  );
};

export default CurrentCandidates;
