// REACT
import { useCreateSessionMutation } from 'modules/Admin/redux';
import { Stack, Text, useDisclosure } from '@chakra-ui/react';

// FORMIK
import { Field, Form, Formik } from 'formik';
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

// ASSETS
import { AddIcon } from '@chakra-ui/icons';

const CreateSession = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createRequest] = useCreateSessionMutation();

  return (
    <Flex w={{ lg: '60%', base: '90%' }}>
      <Button
        onClick={onOpen}
        colorScheme="tertiary"
        borderRadius={4}
        rightIcon={<AddIcon fontSize="sm" />}
      >
        Créer une nouvelle session
      </Button>
      <Formik
        initialValues={{
          title: '',
          startDate: '',
          endDate: '',
          deadlineDate: '',
          active: 'true',
          description: '',
          maxCandidates: 0,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Le titre de la session est requis'),
          startDate: Yup.string().required(
            'La date de début de la session est requis'
          ),
        })}
        onSubmit={(values, actions) => {
          const createRequestPayload = {
            title: values.title,
            active: values.title === 'active',
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
            deadlineDate: new Date(values.deadlineDate),
            description: values.description,
            maxCandidates: Number(values.maxCandidates),
          };
          createRequest(createRequestPayload);
          actions.resetForm();
          onClose();
          props.refetch();
        }}
      >
        {() => (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <Form>
                <ModalHeader>Créer une session</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <InputField
                    label="Titre"
                    name="title"
                    placeholder="Titre"
                    labelColor="#000"
                    secondarycolor="tertiary.500"
                    mb={2}
                  />
                  <Flex>
                    <InputField
                      type="date"
                      label="Date de debut"
                      name="startDate"
                      borderRightRadius="0px"
                      borderRight="none"
                      placeholder="23/09/2023"
                      labelColor="#000"
                      secondarycolor="tertiary.500"
                      mb={2}
                    />
                    <InputField
                      type="date"
                      label="Date de fin"
                      name="endDate"
                      placeholder="23/09/2023"
                      borderLeftRadius="0px"
                      labelColor="#000"
                      secondarycolor="tertiary.500"
                      mb={2}
                    />
                  </Flex>
                  <Stack
                    spacing={5}
                    direction="row"
                    role="group"
                    aria-labelledby="my-radio-group"
                  >
                    <Flex>
                      <Field type="radio" name="active" value="true" />
                      <Text ml={2}>Active</Text>
                    </Flex>
                    <Flex display="flex">
                      <Field type="radio" name="active" value="false" />
                      <Text ml={2}>Not Active</Text>
                    </Flex>
                  </Stack>
                  <InputField
                    as="textarea"
                    py={2}
                    minHeight="80px"
                    label="Description"
                    name="description"
                    placeholder="description"
                    labelColor="#000"
                    secondarycolor="tertiary.500"
                    mb={2}
                  />
                  <InputField
                    type="date"
                    label="Date limite d'inscription"
                    name="deadlineDate"
                    placeholder="23/09/2023"
                    labelColor="#000"
                    secondarycolor="tertiary.500"
                    mb={2}
                    w="40%"
                  />
                  <InputField
                    label="Capacité maximale des candidats"
                    name="maxCandidates"
                    placeholder="54"
                    labelColor="#000"
                    secondarycolor="tertiary.500"
                    ml={2}
                    w="15%"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} colorScheme="error">
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
        )}
      </Formik>
    </Flex>
  );
};

export default CreateSession;
