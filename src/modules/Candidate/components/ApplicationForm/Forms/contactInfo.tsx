// REACT
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import { getToken } from 'utils/functions';

// FORMIK
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

// STYLED COMPONENTS
import InputField from 'components/InputField';
import Button from 'components/Button';
import { Input } from 'components/Input/Input';
import { Flex, Text, Avatar, FormLabel, Box } from '@chakra-ui/react';

// ASSETS
import { ReactComponent as UploadIcon } from 'assets/icons-svg/upload-solid.svg';
import { useEffect, useState } from 'react';
import {
  useGetPhotoQuery,
  useUploadPhotoMutation,
} from 'modules/Candidate/redux';

const ContactInfo = (props: any) => {
  const token = getToken();
  const { data } = useDecodeTokenQuery(token);
  const { data: photo, refetch } = useGetPhotoQuery(data?.user?.id);
  const [imageData, setImageData] = useState<any>(photo);

  const [sendRequest] = useUploadPhotoMutation();

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = async () => {
      setImageData(reader.result);
      sendRequest({ userId: data.user.id, photo: reader.result });
    };
  };

  useEffect(() => {
    setImageData(photo?.photo);
    refetch();
  }, [photo, setImageData]);

  // useEffect(() => {
  //   setImageData(photo?.photo);
  // }, [photo, setImageData]);

  return (
    <Formik
      initialValues={{
        firstName: data?.user?.firstName,
        lastName: data?.user?.lastName,
        email: data?.user?.email,
        phone: props.candidateData?.phone || '',
        birthDate: props.candidateData?.birthDate || '',
        nationalID: props.candidateData?.nationalID || '',
      }}
      validationSchema={Yup.object({
        phone: Yup.string()
          .required('Le numéro de téléphone est requis')
          .trim()
          .matches(
            /^[0-9]{8}$/,
            'Le numéro de téléphone doit contenir exactement 8 chiffres'
          ),
        nationalID: Yup.string()
          .required('Le numéro de la CIN est requis')
          .trim()
          .matches(
            /^[0-9]{8}$/,
            'Le numéro de téléphone doit contenir exactement 8 chiffres'
          ),
      })}
      onSubmit={(values) => {
        props.nextForm(values);
      }}
    >
      {() => {
        return (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 15,
            }}
          >
            <Flex direction="column" alignItems="center">
              <Text color="gray.700" mb={4}>
                Charger votre photo de profile
              </Text>
              <Flex alignItems="center">
                {imageData && <Avatar src={imageData} mr={2} />}
                <Button colorScheme="tertiary">
                  <UploadIcon fill="#fff" height="20px" width="20px" />
                  <Text ml={2}>photo de profile</Text>
                  <Input
                    type="file"
                    id="profile-picture"
                    onChange={handleFileChange}
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
              </Flex>
            </Flex>
            <Flex>
              <Box w="100%">
                <FormLabel color="#000" ms="4px" fontWeight="normal">
                  Prenom
                </FormLabel>
                <Input
                  name="firstName"
                  value={data?.user?.firstName}
                  bg="gray.200"
                  borderRightRadius="0px"
                  borderRight="none"
                  borderColor="tertiary.500"
                  focusBorderColor="tertiary.500"
                  _hover={{
                    borderColor: 'tertiary.500',
                  }}
                  isReadOnly
                />
              </Box>
              <Box w="100%">
                <FormLabel color="#000" ms="4px" fontWeight="normal">
                  Nom
                </FormLabel>
                <Input
                  name="lastName"
                  value={data?.user?.lastName}
                  bg="gray.200"
                  borderLeftRadius="0px"
                  borderColor="tertiary.500"
                  focusBorderColor="tertiary.500"
                  _hover={{
                    borderColor: 'tertiary.500',
                  }}
                  isReadOnly
                />
              </Box>
            </Flex>
            <Flex>
              <Box w="100%">
                <FormLabel color="#000" ms="4px" fontWeight="normal">
                  E-Mail
                </FormLabel>
                <Input
                  name="email"
                  value={data?.user?.email}
                  bg="gray.200"
                  borderRightRadius="0px"
                  borderRight="none"
                  borderColor="tertiary.500"
                  focusBorderColor="tertiary.500"
                  _hover={{
                    borderColor: 'tertiary.500',
                  }}
                  isReadOnly
                />
              </Box>
              <InputField
                label="Téléphone"
                name="phone"
                placeholder="Votre numero de téléphone"
                borderLeftRadius="0px"
                labelColor="#000"
                secondarycolor="tertiary.500"
              />
            </Flex>
            <Flex>
              <InputField
                type="date"
                max="10"
                min="8"
                label="Date de naissance"
                name="birthDate"
                placeholder="Votre date de naissance"
                borderRightRadius="0px"
                borderRight="none"
                labelColor="#000"
                secondarycolor="tertiary.500"
              />
              <InputField
                label="CIN"
                name="nationalID"
                placeholder="Le numero de votre carte d'identité national"
                borderLeftRadius="0px"
                labelColor="#000"
                secondarycolor="tertiary.500"
              />
            </Flex>

            <Flex justifyContent="end">
              <Button
                isDisabled={true}
                _disabled={{
                  color: 'gray.700',
                  bg: 'transparent',
                  cursor: 'not-allowed',
                  variant: 'ghost',
                  _hover: { bg: 'transparent' },
                }}
              >
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

export default ContactInfo;
