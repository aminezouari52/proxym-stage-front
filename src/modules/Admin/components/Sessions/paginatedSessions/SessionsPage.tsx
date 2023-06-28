import { Box, Flex, Stack, Text, Badge } from '@chakra-ui/react';

const SessionsPage = ({ currentSessions }: { currentSessions: any }) => {
  return (
    <Stack
      my={8}
      direction={{ lg: 'row', md: 'row', base: 'column' }}
      spacing={{ base: '1rem', md: '2rem' }}
      minHeight={{ lg: '55vh', md: '55vh' }}
      justifyContent={{
        lg: 'space-evenly',
        md: 'space-evenly',
        base: 'flex-start',
      }}
      alignItems={{ lg: 'stretch', md: 'stretch', base: 'center' }}
    >
      {currentSessions &&
        currentSessions.map((session: any) => (
          <Box
            key={session.id}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg="gray.100"
            p="6"
            w={{ lg: '30%', md: '30%', base: '80%' }}
          >
            <Stack spacing={3}>
              <Flex justifyContent="space-between">
                <Text fontWeight="bold" fontSize="xl">
                  {session.title}
                </Text>
                <Badge colorScheme={session.active ? 'green' : 'red'}>
                  {session.active ? 'Active' : 'Inactive'}
                </Badge>
              </Flex>

              <Text fontSize="sm">
                Date de debut:{' '}
                {new Date(session.startDate).toLocaleDateString()}
              </Text>
              {session.endDate && (
                <Text fontSize="sm">
                  Date de fin: {new Date(session.endDate).toLocaleDateString()}
                </Text>
              )}
              {session.deadlineDate && (
                <Text fontSize="sm">
                  Date limite:{' '}
                  {new Date(session.deadlineDate).toLocaleDateString()}
                </Text>
              )}
              {session.description && (
                <Text fontSize="sm">{session.description}</Text>
              )}
              {session.maxCandidates && (
                <Text fontSize="sm">
                  Candidats maximum: {session.maxCandidates}
                </Text>
              )}

              <Text fontSize="sm">
                Nombre de candidats: {session.candidates.length}
              </Text>
              <Text fontSize="sm">
                Nombre de projets: {session.projects.length}
              </Text>
            </Stack>
          </Box>
        ))}
    </Stack>
  );
};

export default SessionsPage;
