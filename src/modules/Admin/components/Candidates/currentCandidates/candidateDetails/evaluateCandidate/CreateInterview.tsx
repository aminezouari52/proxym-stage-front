// REACT
import {
  useCreateInterviewMutation,
  useGetSupervisorsQuery,
  useSendEmailMutation,
} from 'modules/Admin/redux';
import {
  Badge,
  List,
  ListIcon,
  ListItem,
  Text,
  useToast,
} from '@chakra-ui/react';

// FORMIK
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// STYLED COMPONENTS
import Button from 'components/Button';
import InputField from 'components/InputField';
import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import { ChevronRightIcon } from '@chakra-ui/icons';

// const supervisorsData? ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

const CreateInterview = (props: any) => {
  const toast = useToast();

  // requests
  const [createRequest] = useCreateInterviewMutation();
  const [sendEmailRequest] = useSendEmailMutation();
  const { data: supervisorsData } = useGetSupervisorsQuery({});

  const handleSelectValue = (value: any, setValue: any) => {
    setValue('supervisors', value);
  };

  return (
    <Flex w={{ lg: '60%', base: '90%' }}>
      <Formik
        initialValues={{
          date: '',
          time: '',
          supervisors: '',
        }}
        validationSchema={Yup.object({
          date: Yup.string().required('La date de l\'entretien est requis'),
          time: Yup.string().required('L\'horaire de l\'entretien est requis'),
          supervisors: Yup.string().required('Spécifier un encadrant'),
        })}
        onSubmit={(values, actions) => {
          const createRequestPayload = {
            userId: props?.candidate?.id,
            date: values.date,
            time: values.time,
            supervisors: values.supervisors,
          };

          createRequest(createRequestPayload);
          actions.resetForm();
          props.onClose();

          sendEmailRequest({
            email: 'zouariamine52@gmail.com',
            subject: 'Invitation à un entretien pour un stage PFE à PROXYM',
            message: `Cher(e) ${props?.candidate?.firstName} ${props?.candidate?.lastName},\n\nNous avons le plaisir de vous inviter à un entretien pour le poste de stagiaire au sein de notre entreprise. Votre candidature a retenu toute notre attention et nous souhaitons en apprendre davantage sur vous.\n\nDate : ${values.date}\nHeure : ${values.time}\n\nL'entretien sera conduit par ${values.supervisors}, qui discutera avec vous de votre expérience, de vos compétences et de votre adéquation avec le poste.\n\nNous vous prions de bien vouloir confirmer votre présence à l'entretien en répondant à cet e-mail. Si vous avez des contraintes ou des questions concernant l'entretien, n'hésitez pas à nous en informer.\nNous sommes impatients de vous rencontrer et d'en savoir plus sur votre parcours professionnel.\nCordialement,\nResource Humaines\nProxym-IT`,
          });

          toast({
            title: 'Succès',
            description: 'L\'entretien à été créer avec succès!',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }}
      >
        {({ values, setFieldValue }) => {
          return (
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
              <ModalOverlay />
              <ModalContent>
                <Form>
                  <ModalHeader>Planifier un entretien</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text fontSize="md" mb={4}>
                      avec :
                      <Badge ml="1" fontSize="0.8em" colorScheme="purple">
                        {props?.candidate?.firstName}{' '}
                        {props?.candidate?.lastName}
                      </Badge>
                    </Text>
                    <InputField
                      type="date"
                      label="Date de l'entretien"
                      name="date"
                      placeholder="20/12/2023 : 9h30"
                      labelColor="#000"
                      secondarycolor="tertiary.500"
                      mb={2}
                    />
                    <InputField
                      type="time"
                      label="L'hohaire de l'entretien"
                      name="time"
                      placeholder="20/12/2023 : 9h30"
                      labelColor="#000"
                      secondarycolor="tertiary.500"
                      mb={2}
                    />

                    <InputField
                      label=" Encadrant"
                      name="supervisors"
                      placeholder="Choisir un encadrant"
                      labelColor="#000"
                      secondarycolor="tertiary.500"
                      mb={2}
                    />
                    {values.supervisors && (
                      <List mt={2}>
                        {supervisorsData
                          ?.filter((option) =>
                            option.includes(values.supervisors)
                          )
                          .map(
                            (option) =>
                              option !== values.supervisors && (
                                <ListItem
                                  key={option}
                                  role="button"
                                  cursor="pointer"
                                  outline="none"
                                  onClick={() =>
                                    handleSelectValue(option, setFieldValue)
                                  }
                                  tabIndex={0}
                                  _hover={{ backgroundColor: 'gray.100' }}
                                  _focus={{ boxShadow: 'outline' }}
                                >
                                  {' '}
                                  <ListIcon
                                    as={ChevronRightIcon}
                                    color="tertiary.500"
                                  />{' '}
                                  {option}
                                </ListItem>
                              )
                          )}
                      </List>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={props.onClose} colorScheme="error">
                      Fermer
                    </Button>
                    <Button
                      type="submit"
                      colorScheme="primary"
                      color="#000"
                      ml={3}
                    >
                      Créer
                    </Button>
                  </ModalFooter>
                </Form>
              </ModalContent>
            </Modal>
          );
        }}
      </Formik>
    </Flex>
  );
};

export default CreateInterview;
