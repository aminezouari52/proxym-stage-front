import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

const CandidatesPage = ({ currentCandidates }: { currentCandidates: any }) => {
  return (
    <Box overflowX="scroll">
      <Table
        variant="simple"
        size={{ lg: 'md', base: 'xs' }}
        minHeight={{ base: '45vh', md: '55vh', lg: '70vh' }}
        my={4}
      >
        <Thead>
          <Tr>
            <Th fontSize={{ lg: 'md', base: 'xs' }}>ID</Th>
            <Th fontSize={{ lg: 'md', base: 'xs' }}>Prénom</Th>
            <Th fontSize={{ lg: 'md', base: 'xs' }}>Nom</Th>
            <Th fontSize={{ lg: 'md', base: 'xs' }}>E-mail</Th>
            <Th fontSize={{ lg: 'md', base: 'xs' }}>Compétences</Th>
            <Th fontSize={{ lg: 'md', base: 'xs' }}>Status</Th>
            <Th fontSize={{ lg: 'md', base: 'xs' }}>Date de soumission</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentCandidates &&
            currentCandidates.map((candidate: any) => (
              <Tr key={candidate.id}>
                <Td fontSize={{ lg: 'md', base: 'xs' }}>{candidate.id}</Td>
                <Td fontSize={{ lg: 'md', base: 'xs' }}>
                  {candidate.firstName}
                </Td>
                <Td fontSize={{ lg: 'md', base: 'xs' }}>
                  {candidate.lastName}
                </Td>
                <Td fontSize={{ lg: 'md', base: 'xs' }}>{candidate.email}</Td>
                <Td fontSize={{ lg: 'md', base: 'xs' }}>
                  {candidate.skills.join(', ')}
                </Td>
                <Td fontSize={{ lg: 'md', base: 'xs' }}>{candidate.stage}</Td>
                <Td fontSize={{ lg: 'md', base: 'xs' }}>
                  {candidate.submissionDate}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CandidatesPage;
