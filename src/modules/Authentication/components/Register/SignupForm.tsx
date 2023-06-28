import { Flex, Heading, Text, Link, Image, Box } from '@chakra-ui/react';
import proxymIcon from 'assets/icons/proxym.png';
import Button from 'components/Button';
import InputField from 'components/InputField';
import { IUser } from 'models/user';
import { useRegisterRequestMutation } from 'modules/Authentication/redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const SignUpForm: any = () => {
  const [registerMutation, { isLoading, isSuccess }] =
    useRegisterRequestMutation();

  const navigate = useNavigate();

  const registerHandler = async (
    values: Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName'>
  ) => {
    registerMutation({
      ...values,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/auth/login');
    }
  }, [isSuccess]);

  return (
    <Flex alignItems="center" justifyContent="center" w="100%" mb={4}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        w={{ lg: '40%', md: '60%', base: '90%' }}
        maxWidth="500px"
        px={{ lg: '36px', md: '28px', base: '16px' }}
        py={{ lg: '18px', md: '14px', base: '8px' }}
        bg="blackAlpha.500"
        borderRadius="10px"
        backdropFilter="blur(20px)"
      >
        <Image src={proxymIcon} alt="logo" boxSize="70px" mb="20px" />
        <Heading
          color="secondary.500"
          fontSize="26px"
          mb="10px"
          textAlign="center"
        >
          Créer un Compte
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color="#fff"
          fontWeight="bold"
          fontSize="10px"
          textAlign="center"
        >
          Créez votre compte pour trouver des stages et avancer votre carrière.
        </Text>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().trim().required('Le prénom est requis'),
            lastName: Yup.string()
              .trim()
              .required('Le nom de famille est requis'),
            email: Yup.string()
              .email('Adresse e-mail invalide')
              .trim()
              .required('L\'adresse e-mail est requise'),
            password: Yup.string()
              .required('Le mot de passe est requis')
              .trim()
              .min(8, 'Le mot de passe doit comporter au moins 8 caractères'),
          })}
          onSubmit={registerHandler}
        >
          {({ isValid }) => {
            return (
              <Box w="100%">
                <Form
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 15,
                  }}
                >
                  <Flex>
                    <InputField
                      label="Prenom"
                      name="firstName"
                      placeholder="Votre prenom"
                      borderRightRadius="0px"
                      borderRight="none"
                      labelColor="#fff"
                      color="#fff"
                      secondarycolor="secondary.500"
                    />
                    <InputField
                      label="Nom"
                      name="lastName"
                      placeholder="Votre nom"
                      borderLeftRadius="0px"
                      labelColor="#fff"
                      color="#fff"
                      secondarycolor="secondary.500"
                    />
                  </Flex>
                  <InputField
                    label="E-mail"
                    name="email"
                    placeholder="Votre adresse e-mail"
                    labelColor="#fff"
                    color="#fff"
                    secondarycolor="secondary.500"
                  />
                  <InputField
                    type="password"
                    label="Mot de Passe"
                    name="password"
                    placeholder="Votre mot de passe"
                    labelColor="#fff"
                    color="#fff"
                    secondarycolor="secondary.500"
                  />
                  <Button
                    type="submit"
                    color="black"
                    w="100%"
                    isLoading={isLoading}
                    isDisabled={!isValid}
                  >
                    S'inscrire
                  </Button>
                </Form>
              </Box>
            );
          }}
        </Formik>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          maxW="100%"
          mt="10px"
        >
          <Text color="#fff" fontWeight="medium">
            Vous avez déjà un compte ?
            <Link
              color="secondary.500"
              as="span"
              ms="5px"
              fontWeight="bold"
              textDecoration="underline"
              onClick={() => navigate('/auth/login')}
            >
              Se Connecter
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUpForm;
