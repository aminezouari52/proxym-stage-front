// REACT
import { Box, useDisclosure } from '@chakra-ui/react';

// STYLED COMPONENTS
import {
  Flex,
  Heading,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Avatar,
  Text,
  StackDivider,
  HStack,
  Portal,
} from '@chakra-ui/react';

//ASSETS
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ReactComponent as UsersIcon } from 'assets/icons-svg/users.svg';
import { ReactComponent as UserPlusIcon } from 'assets/icons-svg/user-plus.svg';
import { ReactComponent as LaptopIcon } from 'assets/icons-svg/laptop.svg';
import { ReactComponent as UserTieIcon } from 'assets/icons-svg/user-tie.svg';
import { ReactComponent as ListCheckIcon } from 'assets/icons-svg/list-check.svg';
import { ReactComponent as CheckIcon } from 'assets/icons-svg/check.svg';

// PROJECT IMPORTS
import StatisticsBox from './StatisticsBox';
import InterviewsModal from './InterviewsModal';
import ChartApplicationsStatus from './ChartApplicationsStatus';
import ChartCandidatesStage from './ChartCandidatesStage';
import {
  useGetSessionsQuery,
  useGetActiveSessionQuery,
  useGetInterviewsQuery,
} from 'modules/Admin/redux';
import { useEffect, useState } from 'react';

function getRecentCandidates(candidates: any): number {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // calculate 3 days ago
  const recentCandidates = candidates?.filter((candidate: any) => {
    const submissionDate = new Date(candidate.submissionDate); // parse submission date into Date object
    return submissionDate >= threeDaysAgo && submissionDate <= now;
  });
  return recentCandidates?.length;
}

const countByCandidatesStage = (candidates: any, stage: string): number => {
  return candidates?.filter((candidate: any) => candidate.stage === stage)
    .length;
};

const AdminDashboard = () => {
  const [transformedInterviews, setTransformedInterviews] = useState<any>();
  const [currentSession, setCurrentSession] = useState<any>();
  const { data: sessions } = useGetSessionsQuery({});
  const { data: activeSession } = useGetActiveSessionQuery({});
  const { data: interviews } = useGetInterviewsQuery({});

  useEffect(() => {
    let deepCopyArray;
    if (interviews) {
      deepCopyArray = JSON.parse(JSON.stringify(interviews));
    }
    deepCopyArray?.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const transformedData = deepCopyArray?.map((interview: any) => {
      const date = new Date(interview.date);
      const dayOfMonth = date.getDate();
      const monthNames = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
      ];
      const formattedDate = `${dayOfMonth} ${monthNames[date.getMonth()]}`;
      return {
        name: `${interview.user.firstName} ${interview.user.lastName}`,
        photo: interview.user.photo,
        date: formattedDate,
      };
    });

    setTransformedInterviews(transformedData);
  }, [interviews]);

  useEffect(() => {
    if (sessions) {
      const latestSession = sessions?.find(
        (session: any) => session?.id === activeSession?.id
      );
      if (latestSession) {
        setCurrentSession(latestSession);
      } else setCurrentSession(sessions[0]);
    }
  }, [activeSession, sessions]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex direction="column" px={8}>
      <Flex justifyContent="space-between" w="100%">
        <Heading>{currentSession?.title}</Heading>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="tertiary"
            rightIcon={<ChevronDownIcon />}
            borderRadius="5px"
          >
            {currentSession?.title}
          </MenuButton>
          <MenuList>
            {sessions?.map((session: any) => (
              <MenuItem
                key={session.id}
                onClick={() => setCurrentSession(session)}
              >
                {session.title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Flex direction="column">
        <Flex flexWrap="wrap" mt={4} justifyContent="center">
          <StatisticsBox
            title="Nombre total des Candidats"
            icon={<UsersIcon height="30px" width="30px" fill="#562AD6" />}
            number={currentSession && currentSession?.candidates?.length}
          />
          <StatisticsBox
            title="Nouveau Candidats"
            icon={<UserPlusIcon height="30px" width="30px" fill="#85BA3C" />}
            number={getRecentCandidates(currentSession?.candidates)}
          />
          <StatisticsBox
            title="Nombre des sujets total"
            icon={<LaptopIcon height="30px" width="30px" fill="#562AD6" />}
            number={currentSession?.projects?.length}
          />
          <StatisticsBox
            title="CV Accepté"
            icon={<UserTieIcon height="30px" width="30px" fill="#FFC000" />}
            number={countByCandidatesStage(
              currentSession?.candidates,
              'filtered'
            )}
          />
          <StatisticsBox
            title="Short-listé"
            icon={<ListCheckIcon height="30px" width="30px" fill="#FF4136" />}
            number={countByCandidatesStage(
              currentSession?.candidates,
              'interviewed'
            )}
          />
          <StatisticsBox
            title="Passer l'Entretien"
            icon={<CheckIcon height="30px" width="30px" fill="#85BA3C" />}
            number={countByCandidatesStage(
              currentSession?.candidates,
              'accepted'
            )}
          />
        </Flex>
        <Flex
          justifyContent="space-evenly"
          direction={{ lg: 'row', md: 'row', base: 'column' }}
        >
          <Flex
            direction="column"
            w={{ lg: '60%', md: '60%', base: '100%' }}
            bg="#fff"
            borderRadius="10px"
            p={4}
          >
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
              <Text color="gray" fontSize="xl" fontWeight="700">
                Entretien à venir
              </Text>
              <Button
                colorScheme="transparent"
                color="tertiary.500"
                onClick={onOpen}
              >
                voir tous
              </Button>
            </Flex>
            {activeSession?.title == currentSession?.title ? (
              <VStack
                w="100%"
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                {transformedInterviews
                  ?.slice(0, 2)
                  ?.map((interview: any, index: any) => (
                    <Flex key={index} justifyContent="space-between" w="100%">
                      <HStack>
                        <Avatar src={interview.photo} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="bold">{interview.name}</Text>
                          <Text fontSize="sm">{interview.college}</Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="lg" fontWeight="700">
                        {interview.date}
                      </Text>
                    </Flex>
                  ))}
              </VStack>
            ) : (
              <Box>Aucun entretien trouvé</Box>
            )}
            <Portal>
              <InterviewsModal
                users={transformedInterviews}
                onClose={onClose}
                isOpen={isOpen}
              />
            </Portal>
          </Flex>

          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            direction="column"
          >
            <Flex
              direction="column"
              alignItems="center"
              m={2}
              p={2}
              bg="#fff"
              borderRadius="10px"
              w="30%"
              minWidth="200px"
            >
              <Flex mb={4}>
                <Text color="gray" fontSize="md" fontWeight="700" mr={2}>
                  Candidats Accepté
                </Text>
                <UsersIcon height="30px" width="30px" fill="#562AD6" />
              </Flex>
              <Text fontSize="xl" fontWeight="700">
                {(
                  (countByCandidatesStage(
                    currentSession?.candidates,
                    'accepted'
                  ) /
                    currentSession?.candidates?.length) *
                  100
                ).toFixed(2)}
                %
              </Text>
            </Flex>
            <Flex
              direction="column"
              alignItems="center"
              m={2}
              p={2}
              bg="#fff"
              borderRadius="10px"
              w="30%"
              minWidth="200px"
            >
              <Flex mb={4} justifyContent="space-between">
                <Text color="gray" fontSize="md" fontWeight="700" mr={2}>
                  CV Accepté
                </Text>
                <UsersIcon height="30px" width="30px" fill="#562AD6" />
              </Flex>
              <Text fontSize="xl" fontWeight="700">
                {(
                  (countByCandidatesStage(
                    currentSession?.candidates,
                    'filtered'
                  ) /
                    currentSession?.candidates?.length) *
                  100
                ).toFixed(2)}
                %
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        direction={{ lg: 'row', md: 'row', base: 'column' }}
        justifyContent={{
          lg: 'space-evenly',
          md: 'space-evenly',
          base: 'center',
        }}
      >
        <ChartCandidatesStage
          session={currentSession}
          title="L'état des candidats"
        />
        <ChartApplicationsStatus title="Candidatures" />
      </Flex>
    </Flex>
  );
};

export default AdminDashboard;
