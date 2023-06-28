// REACT
import {
  useCreateProjectMutation,
  useGetActiveSessionQuery,
  useGetAdminsQuery,
} from 'modules/Admin/redux';
import {
  Box,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

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

const CreateProject = (props: any) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: activeSession } = useGetActiveSessionQuery({});
  const { data: admins } = useGetAdminsQuery({});

  const [createRequest] = useCreateProjectMutation();
  return (
    <Flex w={{ lg: '60%', base: '90%' }} mx={4} mb={4}>
      <Button
        onClick={onOpen}
        colorScheme="tertiary"
        borderRadius={4}
        rightIcon={<AddIcon fontSize="sm" />}
      >
        Créer un nouveau sujet
      </Button>
      <Formik
        initialValues={{
          title: '',
          description: '',
          candidatesNumber: 0,
          requiredProfiles: [],
          technicalEnvironment: [],
          adminName: '',
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Le titre de la session est requis'),
        })}
        onSubmit={(values, actions) => {
          const createRequestPayload = {
            ...values,
            sessionId: activeSession.id,
          };
          createRequest(createRequestPayload);
          actions.resetForm();
          onClose();
          props.refetch();
          toast({
            title: 'Projet créer.',
            description: 'Le projet a été crée avec succès',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        {({ values }) => (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <Form>
                <ModalHeader>Créer un sujet</ModalHeader>
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
                  <Field name="adminName" mutiple={true}>
                    {({ field }: any) => (
                      <Select
                        {...field}
                        placeholder="selectionner encadrant"
                        borderColor="gray.700"
                        colorScheme="tertiary"
                        my={2}
                      >
                        {admins?.map(
                          (admin: any) =>
                            admin.role === 'supervisor' && (
                              <option key={admin.id} value={admin.username}>
                                {admin.username}
                              </option>
                            )
                        )}
                      </Select>
                    )}
                  </Field>
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
                    type="number"
                    label="Nombre de stagiaires souhaités"
                    name="candidatesNumber"
                    placeholder="1"
                    labelColor="#000"
                    secondarycolor="tertiary.500"
                    ml={2}
                    w="15%"
                  />

                  <FormLabel mt={4} ml={2}>
                    {' '}
                    Profil Requis
                  </FormLabel>
                  <CheckboxGroup
                    colorScheme="green"
                    value={values.requiredProfiles}
                  >
                    <Box>
                      <Field
                        name="requiredProfiles"
                        type="checkbox"
                        value="Engineer"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Ingénieur
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="requiredProfiles"
                        type="checkbox"
                        value="Masters"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Mastère
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="requiredProfiles"
                        type="checkbox"
                        value="License"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Licence
                          </Checkbox>
                        )}
                      </Field>
                    </Box>
                  </CheckboxGroup>
                  <FormLabel mt={4} ml={2}>
                    {' '}
                    Environment technique
                  </FormLabel>
                  <CheckboxGroup
                    colorScheme="green"
                    value={values.technicalEnvironment}
                  >
                    <Box>
                      <Field
                        name="technicalEnvironment"
                        type="checkbox"
                        value="Node"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Node
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="technicalEnvironment"
                        type="checkbox"
                        value="React"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            React
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="technicalEnvironment"
                        type="checkbox"
                        value="Javascript"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Javascript
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="technicalEnvironment"
                        type="checkbox"
                        value="Angular"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Angular
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="technicalEnvironment"
                        type="checkbox"
                        value="Python"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Python
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="technicalEnvironment"
                        type="checkbox"
                        value="Tenserflow"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            Tenserflow
                          </Checkbox>
                        )}
                      </Field>
                      <Field
                        name="technicalEnvironment"
                        type="checkbox"
                        value="LDAP"
                      >
                        {({ field }: any) => (
                          <Checkbox
                            {...field}
                            borderColor="gray.700"
                            colorScheme="tertiary"
                            mx={1}
                            px={2}
                            py={1}
                          >
                            LDAP
                          </Checkbox>
                        )}
                      </Field>
                    </Box>
                  </CheckboxGroup>
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

export default CreateProject;
