import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { useGetProjectsQuery } from 'modules/Admin/redux';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import { useState } from 'react';
import CreateProject from './CreateProject';

const Projects = () => {
  const { data: userData } = useDecodeTokenQuery({});
  const { data: projects, refetch } = useGetProjectsQuery({});

  const [searchValue, setSearchValue] = useState('');
  const filteredProjects = projects?.filter((project: any) =>
    project.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Flex direction="column" bg="gray.100" py={10}>
      {userData?.user?.role == 'admin' && <CreateProject refetch={refetch} />}
      <InputGroup mb={4} w="40%" mx={4}>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          borderColor="#000"
          placeholder="Rechercher par titre"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>
      <Flex justifyContent="space-evenly" flexWrap="wrap">
        {filteredProjects?.map((project: any, index: any) => (
          <Box
            key={index}
            p={4}
            borderWidth={1}
            borderRadius="md"
            mb={8}
            bg="white"
            boxShadow="md"
            maxW="400px"
          >
            <Text fontWeight="700" mb={4} color="gray.700">
              {project.title}
            </Text>
            <Text mb={4} color="#000">
              {project.description}
            </Text>
            <Text mb={2}>
              <b>Nombre de stagiaires:</b> {project.candidatesNumber}
            </Text>
            <Text mb={2}>
              <b>Profil Requis:</b> {project.requiredProfiles.join(', ')}
            </Text>
            <Text mb={2}>
              <b>Environnement Technique:</b>{' '}
              {project.technicalEnvironment.join(', ')}
            </Text>
            <Text mb={2}>
              <b>Responsable:</b> {project.adminName}
            </Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export default Projects;
