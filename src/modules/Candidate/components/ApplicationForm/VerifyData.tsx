// REACT
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// STYLED COMPONENTS
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Flex,
  Box,
  Stack,
  Avatar,
  Heading,
  Text,
  Badge,
} from '@chakra-ui/react';
import Button from 'components/Button';

// ASSETS
import { useGetPhotoQuery } from 'modules/Candidate/redux';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import { getToken } from 'utils/functions';

const VerifyData = ({ isOpen, onClose, candidateData, finalSubmit }: any) => {
  const [imageData, setImageData] = useState<any>(null);

  const token = getToken();
  const { data } = useDecodeTokenQuery(token);

  const { data: photo, refetch } = useGetPhotoQuery(data?.user?.id);

  const [hasSubmitted, setHasSubmitted] = useState<Boolean>(false);
  const navigate = useNavigate();

  const projectsArr = candidateData?.projects.map((project: any) => {
    return project.title;
  });

  useEffect(() => {
    setImageData(photo?.photo);
    refetch();
  }, [photo, setImageData]);

  return (
    <>
      {!hasSubmitted ? (
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          scrollBehavior="inside"
          size={{ lg: '3xl', md: '2xl', sm: 'xs', base: 'xs' }}
        >
          <ModalOverlay bg="blackAlpha.700" />
          <ModalContent>
            <ModalHeader>
              <Text>Votre candidature a été Enregistrer ✅</Text>
              <Text fontSize="sm" fontWeight="500">
                Veuillez vérifier vos données avant de soumettre votre
                candidature
              </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <Avatar src={imageData} mr={2} />
                <Flex direction="column">
                  <Text fontWeight="bold" ml={2}>
                    {candidateData.contactInfo.firstName}{' '}
                    {candidateData.contactInfo.lastName}
                  </Text>
                  <Text ml={2}>{candidateData.contactInfo.nationalID}</Text>
                </Flex>
              </Flex>
              <Stack spacing={4} mt={2}>
                <Text mr={2}>
                  <strong> E-mail:</strong> {candidateData.contactInfo.email}
                </Text>
                <Text mr={2}>
                  <strong> Téléphone:</strong> {candidateData.contactInfo.phone}
                </Text>
                <Text mr={2}>
                  <strong>Date de naissance: </strong>
                  {candidateData.contactInfo.birthDate}
                </Text>
                <Flex alignItems="center">
                  <Heading fontSize="md" mr={2}>
                    Vos Compétences:{' '}
                  </Heading>
                  {candidateData.careerInfo.skills?.map(
                    (skill: string, index: number) => (
                      <Text mr={2} key={skill}>
                        {skill}
                        {index === candidateData.careerInfo.skills.length - 1
                          ? '.'
                          : ','}
                      </Text>
                    )
                  )}
                </Flex>
                <Box>
                  <Heading fontSize="md">Vos Projets</Heading>
                  {candidateData.careerInfo.experience?.map(
                    (project: any, index: number) => (
                      <Flex key={index} m={2} direction="column">
                        <Flex alignItems="center">
                          <Text color="#000" fontSize="22px">
                            {project.title}
                          </Text>
                          <Badge colorScheme="green" ml={2}>
                            {project.duration}
                          </Badge>
                        </Flex>
                        <Text ml={6}>{project.description}</Text>
                      </Flex>
                    )
                  )}
                </Box>
                <Box>
                  <Heading fontSize="md">
                    Les projets que vous avez choisis
                  </Heading>
                  <Flex ml={4} mt={2} direction="column" gap={3}>
                    {projectsArr.map((projet: string) => (
                      <Text key={projet}>🚀 {projet}</Text>
                    ))}
                  </Flex>
                </Box>
                <Box>
                  <Heading fontSize="md">
                    Les liens que vous avez fournis
                  </Heading>
                  {candidateData.usefulLinks.length !== 0 && (
                    <Flex direction="column" ml={4} mt={2} gap={3}>
                      {candidateData.usefulLinks?.map((lien: string) => (
                        <Text key={lien}>🔹 {lien}</Text>
                      ))}
                    </Flex>
                  )}
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  finalSubmit();
                  setHasSubmitted(true);
                }}
                colorScheme="green"
                _hover={{
                  opacity: 0.7,
                  colorScheme: 'green',
                }}
              >
                Soumettre & Terminé!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <Modal
          isOpen={!!hasSubmitted}
          onClose={() => navigate('/private/home-page')}
          size={{ lg: '3xl', md: '2xl', sm: 'xs', base: 'xs' }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody mx={12} mt={12} p={8} bg="gray.500" rounded="md">
              <Heading fontSize="xl" textAlign={'center'}>
                Votre candidature à été soumise avec succèes! 🎉
              </Heading>
            </ModalBody>
            <ModalFooter w="100%">
              <Button
                w="20%"
                colorScheme="tertiary"
                mx={12}
                onClick={() => {
                  navigate('/private/home-page');
                }}
              >
                Voir candidature
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default VerifyData;
