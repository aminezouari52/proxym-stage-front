// STYLED COMPONENTS
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  useSendEmailMutation,
  useUpdateUserStageMutation,
} from 'modules/Admin/redux';
import { useState } from 'react';

import CreateInterview from './CreateInterview';

const EvaluateCandidate = (props: any) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sendRequest] = useUpdateUserStageMutation();
  const [selectedStage, setSelectedStage] = useState('pending');
  const [sendEmailRequest] = useSendEmailMutation();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    sendRequest({ userId: props.candidate.id, stage: selectedStage });

    //send email to candidate
    if (selectedStage === 'accepted') {
      sendEmailRequest({
        email: 'zouariamine52@gmail.com',
        subject: ' Félicitations pour votre acceptation chez Proxym-IT',
        message:
          'Nous sommes ravis de vous annoncer que vous avez été accepté chez Proxym-IT. Au nom de toute l\'équipe, je tiens à vous féliciter pour cette réussite remarquable !\n\nVotre candidature a été très impressionnante, et nous sommes convaincus que vous apporterez une valeur ajoutée significative à notre entreprise. Votre expérience, vos compétences et votre enthousiasme font de vous un atout précieux pour notre équipe. Nous sommes impatients de travailler avec vous et de vous voir contribuer à notre succès.\n\n Cordialement,\n\nResource Humaines.\n\nProxym-IT',
      });
    }

    if (selectedStage === 'rejected') {
      sendEmailRequest({
        email: 'zouariamine52@gmail.com',
        subject: 'Votre candidature chez Proxym-IT',
        message:
          'Nous tenons à vous remercier d\'avoir postulé chez Proxym-IT. Après avoir soigneusement examiné votre candidature, nous regrettons de vous informer que nous avons pris la décision de ne pas retenir votre candidature pour le poste en question.\n\nNous avons apprécié vos qualifications et votre enthousiasme, mais nous avons opté pour un autre candidat dont le profil correspondait davantage à nos besoins actuels.\n\nNous vous remercions de l\'intérêt que vous avez porté à notre entreprise et vous souhaitons beaucoup de succès dans vos recherches professionnelles futures.\n\nCordialement,\n\nRessources Humaines.\n\nProxym-IT',
      });
    }

    toast({
      title: 'L\'état du candidat à été mis à jour!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={6} bg="gray.100" borderWidth={1} borderColor="gray.300">
      <CreateInterview
        isOpen={isOpen}
        onClose={onClose}
        candidate={props.candidate}
      />
      <Heading as="h3" size="md" mb={4}>
        Evaluer Candidat
      </Heading>
      <Flex
        direction={{ lg: 'row', md: 'row', base: 'column' }}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Button
          onClick={onOpen}
          minWidth="280px"
          borderRadius="4px"
          width="30%"
          h="50px"
          colorScheme="tertiary"
          color="#fff"
          fontWeight="500"
          mb={{ lg: 0, md: 0, base: 2 }}
        >
          Planifier un entretien
        </Button>

        <form onSubmit={handleSubmit}>
          <Popover>
            <PopoverTrigger>
              <Button
                colorScheme="secondary"
                color="#000"
                minWidth="280px"
                borderRadius="4px"
                width="30%"
                h="50px"
                fontWeight="500"
              >
                Mettre à jour l'étape du candidat
              </Button>
            </PopoverTrigger>
            <PopoverContent w={{ lg: '100%', md: '80%%', base: '60%' }}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody
                display="flex"
                flexDirection="column"
                alignItems="end"
              >
                <FormControl as="fieldset" my={4} mr={4} bg="#fff">
                  <RadioGroup
                    value={selectedStage}
                    onChange={setSelectedStage}
                    defaultChecked
                  >
                    <Radio value="pending" m={4}>
                      postulé
                    </Radio>
                    <Radio value="filtered" m={4}>
                      filtré
                    </Radio>
                    <Radio value="interviewed" m={4}>
                      interviewé
                    </Radio>
                    <Radio value="accepted" m={4}>
                      accepté
                    </Radio>
                    <Radio value="rejected" m={4}>
                      rejeté
                    </Radio>
                  </RadioGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="primary"
                  color="#000"
                  w="30%"
                >
                  Confirmer
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </form>
      </Flex>
    </Box>
  );
};

export default EvaluateCandidate;
