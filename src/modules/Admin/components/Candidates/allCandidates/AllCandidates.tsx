// REACT
import { useGetCandidatesQuery } from 'modules/Candidate/redux';
import { useGetSessionsQuery } from 'modules/Admin/redux';
import { useState } from 'react';

// STYLED COMPONENTS
import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

// PROJECT COMPONENTS
import CandidatesList from './paginatedCandidates/CandidatesList';
import { ChevronDownIcon } from '@chakra-ui/icons';

const AllCandidates = () => {
  const [numberCandidatesPerPage, setNumberCandidatesPerPage] = useState(5);
  const setNumberCandidatesPerPageHandler = (number: number) => {
    setNumberCandidatesPerPage(number);
  };

  const { data: sessions } = useGetSessionsQuery({});
  const { data: allCandidates } = useGetCandidatesQuery({});

  const [title, setTitle] = useState<string>('Tous les Candidats');
  const [currentCandidates, setCurrentCandidates] = useState<any>();

  const updateCurrentStateHandler = (session: any) => {
    setTitle(session?.title);
    setCurrentCandidates(session?.candidates);
  };
  const setAllCandidates = () => {
    setCurrentCandidates(allCandidates);
    setTitle('Tous les Candidats');
  };

  if (!sessions) {
    return <Flex>aucune session trouvé!</Flex>;
  }
  return (
    <Flex direction="column" justifyContent="space-between" p={4}>
      <Flex justifyContent="space-between" w="100%">
        <Heading size="md" fontSize={{ lg: '2xl', base: 'xs' }}>
          {title}
        </Heading>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="tertiary"
            rightIcon={<ChevronDownIcon />}
            borderRadius="5px"
            size={{ lg: 'lg', base: 'xs' }}
            fontSize={{ lg: 'lg', base: 'xs' }}
          >
            {title}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={setAllCandidates}>Tous les Candidats</MenuItem>
            {sessions?.map((session: any) => (
              <MenuItem
                key={session.id}
                onClick={() => updateCurrentStateHandler(session)}
              >
                {session.title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <CandidatesList
        candidatesPerPage={numberCandidatesPerPage}
        candidates={!currentCandidates ? allCandidates : currentCandidates}
        setNumberCandidatesPerPageHandler={setNumberCandidatesPerPageHandler}
      />
    </Flex>
  );
};

export default AllCandidates;
