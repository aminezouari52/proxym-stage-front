// REACT
import { useToast } from '@chakra-ui/react';

// FORMIK
import { Form, Formik, FieldArray, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

// STYLED COMPONENTS
import InputField from 'components/InputField';
import Button from 'components/Button';
import Input from 'components/Input';
import { Stack, Box, Flex, Text, Checkbox } from '@chakra-ui/react';

// ASSETS
import { ReactComponent as UploadIcon } from 'assets/icons-svg/upload-solid.svg';
import { AddIcon } from '@chakra-ui/icons';
import { CloseIcon } from '@chakra-ui/icons';
import { useUploadCVMutation } from 'modules/Candidate/redux';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import { useEffect, useState } from 'react';

enum Skill {
  HTML = 'HTML',
  CSS = 'CSS',
  JavaScript = 'JavaScript',
  React = 'React',
  Nodejs = 'Node.js',
  Python = 'Python',
  Java = 'Java',
  CPP = 'C++',
  Ruby = 'Ruby',
  PHP = 'PHP',
  SQL = 'SQL',
}
interface IFormValues {
  skills: Skill[];
  experience: string[];
}

const CareerInfo = (props: any) => {
  const { data: userData, refetch } = useDecodeTokenQuery({});
  const [uploadedCV, setUploadedCV] = useState<any>();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setUploadedCV(!!userData?.user?.CV);
  }, [userData]);

  const toast = useToast();
  const [sendRequest] = useUploadCVMutation();

  const prevStepHandler = () => {
    props.prevForm();
  };

  // SKILLS STATE
  const handleSkillSelection = (
    skill: Skill,
    values: IFormValues,
    setFieldValue: Function
  ) => {
    const skills = values?.skills?.includes(skill)
      ? values.skills?.filter((s: string) => s !== skill)
      : [...values.skills, skill];

    while (skills?.length > 7) {
      toast({
        title: 'Maximum de compétences atteint.',
        description: 'Vous pouvez choisir 7 compétences au maximum.',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      skills?.pop();
    }
    setFieldValue('skills', skills);
  };

  const uploadCVHandler = (event: any) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      sendRequest({ userId: userData.user.id, CV: reader.result });
    };
    setUploadedCV(true);
  };

  return (
    <Formik
      initialValues={{
        skills: props.candidateData?.skills || [],
        experience: props.candidateData?.experience || [],
      }}
      validationSchema={Yup.object({
        skills: Yup.array().min(
          1,
          'Vous devez choisir au moins une compétence.'
        ),
      })}
      onSubmit={(values) => {
        props.nextForm(values);
      }}
    >
      {({ values }) => {
        return (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 15,
            }}
          >
            <Stack spacing={4}>
              <Box>
                <Text fontSize="lg" color="gray.700" mb={4}>
                  Quelles compétences techniques possédez-vous?
                </Text>
                <Flex wrap="wrap">
                  {Object.values(Skill)?.map((skill, index) => (
                    <Field key={index} name="skills">
                      {({ field, form }: any) => (
                        <Checkbox
                          {...field}
                          value={skill}
                          isChecked={form.values.skills?.includes(skill)}
                          onChange={() =>
                            handleSkillSelection(
                              skill,
                              form.values,
                              form.setFieldValue
                            )
                          }
                          colorScheme="tertiary"
                          borderRadius="8px"
                          mr={4}
                          mb={4}
                          _checked={{ bg: 'none', color: 'tertiary.500' }}
                        >
                          <Text fontSize="lg">{skill}</Text>
                        </Checkbox>
                      )}
                    </Field>
                  ))}

                  <Box w="100%">
                    <Input
                      as="textarea"
                      mt={4}
                      borderRadius="8px"
                      minHeight="80px"
                      placeholder="Compétences sélectionnées"
                      value={values?.skills?.join(', ')}
                      isReadOnly
                    />
                  </Box>
                </Flex>
              </Box>
              <Box color="error.500">
                <ErrorMessage name="skills" />
              </Box>
              <Flex direction="column" wrap="wrap">
                <Text fontSize="lg" color="gray.700" mb={4}>
                  Sur quels projets avez-vous travaillé ?
                </Text>
                <FieldArray
                  name="experience"
                  render={(arrayHelpers) => (
                    <>
                      <Stack spacing={4} mb={4}>
                        {values.experience.map((friend: any, index: any) => (
                          <Stack
                            spacing={4}
                            key={index}
                            pos="relative"
                            mb={4}
                            py={2}
                            px={4}
                            borderColor="tertiary.500"
                            borderRadius="6px"
                            borderWidth="1px"
                          >
                            <Button
                              pos="absolute"
                              top="0"
                              right="0"
                              minWidth="0px"
                              type="button"
                              bg="none"
                              color="error.500"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <CloseIcon />
                            </Button>
                            <Flex>
                              <InputField
                                name={`experience.${index}.title`}
                                label="Titre"
                                placeholder="titre"
                                labelColor="#000"
                                secondarycolor="tertiary.500"
                                borderRightRadius="0px"
                                borderRight="none"
                                mb={{ lg: '0', md: '0', base: 4 }}
                              />
                              <InputField
                                name={`experience.${index}.duration`}
                                label="Durée"
                                placeholder="4mois"
                                borderLeftRadius="0px"
                                labelColor="#000"
                                secondarycolor="tertiary.500"
                              />
                            </Flex>
                            <InputField
                              name={`experience.${index}.description`}
                              as="textarea"
                              py={2}
                              label="Description"
                              placeholder="description"
                              borderRadius="4px"
                              minHeight="80px"
                              labelColor="#000"
                              secondarycolor="tertiary.500"
                            />
                          </Stack>
                        ))}
                      </Stack>
                      <Button
                        type="button"
                        borderColor="tertiary.500"
                        borderRadius="6px"
                        variant="outline"
                        onClick={() =>
                          arrayHelpers.push({
                            title: '',
                            description: '',
                            duration: '',
                          })
                        }
                        py={8}
                        _hover={{
                          bg: 'tertiary.500',
                          '& svg': {
                            color: 'white',
                          },
                        }}
                      >
                        <AddIcon color="tertiary.500" fontSize="lg" />
                      </Button>
                    </>
                  )}
                />
              </Flex>
            </Stack>
            <Flex direction="column">
              <Text color="gray.700" mb={4}>
                Charger votre CV
              </Text>
              <Button colorScheme="tertiary" w="20%">
                <UploadIcon fill="#fff" height="20px" width="20px" />
                <Text ml={2}>CV</Text>
                <Input
                  type="file"
                  id="upload-CV"
                  onChange={uploadCVHandler}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                  }}
                />
              </Button>
              {uploadedCV && <Text mt={2}>Votre CV a été chargé!</Text>}
            </Flex>
            <Flex justifyContent="end">
              <Button onClick={prevStepHandler} variant="ghost" color="#000">
                Précédent
              </Button>
              <Button type="submit" color="#000">
                Enregistrer & Continuer
              </Button>
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CareerInfo;
