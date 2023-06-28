// REACT
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoginRequestMutation } from 'modules/Authentication/redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { IUser } from 'models/user';
import { useSelector } from 'react-redux';

// STYLE
import { Flex, Heading, Text, Link, Image, Box } from '@chakra-ui/react';
import InputField from 'components/InputField';
import Button from 'components/Button';

// ASSETS
import proxymIcon from 'assets/icons/proxym.png';

const SignInForm = () => {
  const [loginRequest, { isLoading }] = useLoginRequestMutation();
  const navigate = useNavigate();

  const loginHandler = async (values: Pick<IUser, 'email' | 'password'>) => {
    await loginRequest({
      email: values?.email,
      password: values?.password,
    });
    navigate('/private/home-page');
  };

  const _isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  if (_isAuthenticated) {
    return <Navigate to="/private/home-page" />;
  }

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
          Bienvenue
        </Heading>
        <Text
          mb="36px"
          ms="4px"
          color="#fff"
          fontWeight="bold"
          fontSize="10px"
          textAlign="center"
        >
          Entrer votre email et mot de passe pour se connecter
        </Text>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Adresse e-mail invalide')
              .required('L\'adresse e-mail est requise')
              .trim(),
            password: Yup.string()
              .required('Le mot de passe est requis')
              .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
              .trim(),
          })}
          onSubmit={loginHandler}
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
                  <InputField
                    label="Email"
                    name="email"
                    placeholder="Votre adresse e-mail"
                    labelColor="#fff"
                    color="#fff"
                    secondarycolor="secondary.500"
                  />
                  <InputField
                    type="password"
                    label="Password"
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
                    SE CONNECTER
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
            Vous n'avez pas un compte?
            <Link
              color="secondary.500"
              as="span"
              ms="5px"
              fontWeight="bold"
              textDecoration="underline"
              onClick={() => navigate('/auth/signup')}
            >
              S'inscrire
            </Link>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignInForm;
