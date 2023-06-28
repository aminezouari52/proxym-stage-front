// REACT
import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useGetAllProjectsQuery } from 'modules/Candidate/redux';

// STYLED COMPONENTS
import Button from 'components/Button';
import Input from 'components/Input';
import {
  Flex,
  Checkbox,
  CheckboxGroup,
  InputGroup,
  InputLeftElement,
  useToast,
  Text,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Badge,
} from '@chakra-ui/react';

// ASSETS
import { SearchIcon, InfoOutlineIcon } from '@chakra-ui/icons';

const Projects = (props: any) => {
  const [modalProject, setModalProject] = useState<any>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: projects } = useGetAllProjectsQuery({});
  // SEARCH_TERM STATE
  const [searchTerm, setSearchTerm] = useState('');
  const filteredProjects = projects?.filter((project: any) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  // BUTTON METHODS
  const prevStepHandler = () => {
    props.prevForm();
  };

  const openProjectModal = (project: any) => {
    setModalProject(project);
    onOpen();
  };

  return (
    <Formik
      initialValues={{
        selectedProjects: props.candidateData.map((project: any) => {
          return project.title;
        }),
      }}
      onSubmit={async (values) => {
        if (values.selectedProjects.length > 3) {
          return toast({
            title: 'Maximum de projets atteint.',
            description: 'Vous pouvez choisir seulement 3 projets à la fois.',
            status: 'info',
            duration: 2000,
            isClosable: true,
          });
        }
        if (values.selectedProjects.length === 0) {
          return toast({
            title: 'Au moins un projet.',
            description: 'Choisir minimum un projet.',
            status: 'info',
            duration: 2000,
            isClosable: true,
          });
        }
        const selectedProjects = values.selectedProjects.map(
          (selectedProject: any) => {
            const project = projects?.find(
              (project: any) => project.title === selectedProject
            );
            return project;
          }
        );
        props.nextForm(selectedProjects);
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <Flex direction="column" width="100%">
              <Flex direction="column" mb={4}>
                <InputGroup mb={4}>
                  <InputLeftElement pointerEvents="none">
                    {<SearchIcon color="gray.300" />}
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Chercher vos projets"
                    pl={8}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </InputGroup>
                <CheckboxGroup
                  colorScheme="green"
                  value={values.selectedProjects}
                >
                  <Flex flexWrap="wrap">
                    {filteredProjects?.map((project: any) => (
                      <Flex key={project.id} alignItems="center" m={2}>
                        <Field
                          name={'selectedProjects'}
                          type="checkbox"
                          value={project.title}
                        >
                          {({ field }: any) => (
                            <Checkbox {...field} colorScheme="tertiary" p={1}>
                              {project.title}
                            </Checkbox>
                          )}
                        </Field>
                        <InfoOutlineIcon
                          _hover={{ opacity: 0.5 }}
                          cursor="pointer"
                          color="tertiary.500"
                          onClick={() => openProjectModal(project)}
                        />
                      </Flex>
                    ))}
                  </Flex>
                </CheckboxGroup>
              </Flex>
            </Flex>
            <Flex justifyContent="end">
              <Button onClick={prevStepHandler} variant="ghost" color="#000">
                Précédent
              </Button>
              <Button type="submit" color="#000">
                Enregistrer & Continuer
              </Button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{modalProject?.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody px={4}>
                  <Text color="gray.600" fontSize="sm" mb={4}>
                    {modalProject?.description}
                  </Text>
                  <Flex alignItems="center" mb={4}>
                    <Text fontWeight="bold" mr={2}>
                      Nombre de stagiaires souhaités:{' '}
                    </Text>
                    <Badge colorScheme="green" variant="outline" mr={2}>
                      {modalProject?.candidatesNumber}
                    </Badge>
                  </Flex>
                  <Flex alignItems="center" mb={4}>
                    <Text fontWeight="bold">Profil requis: </Text>
                    <Flex ml={2}>
                      {modalProject?.requiredProfiles.map((profile: any) => (
                        <Badge
                          key={profile}
                          colorScheme="blue"
                          variant="outline"
                          mr={2}
                        >
                          {profile}
                        </Badge>
                      ))}
                    </Flex>
                  </Flex>

                  <Flex alignItems="center" mb={4}>
                    <Text fontWeight="bold" mr={2}>
                      Environnement Technique:{' '}
                    </Text>
                    {modalProject?.technicalEnvironment?.map(
                      (techno: any, index: number) => (
                        <Text key={index}>
                          {techno}
                          {index ==
                          modalProject?.technicalEnvironment?.length - 1
                            ? '.'
                            : ','}
                        </Text>
                      )
                    )}
                  </Flex>
                  <Flex alignItems="center">
                    <Text fontWeight="bold" mr={2}>
                      Encadrant:
                    </Text>
                    <Text ml={2}>{modalProject?.adminName}</Text>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Projects;
