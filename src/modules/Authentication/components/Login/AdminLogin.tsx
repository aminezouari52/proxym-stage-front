// REACT
import { Navigate, useNavigate } from 'react-router-dom';
import { useAdminLoginRequestMutation } from 'modules/Authentication/redux';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';

// STYLE
import { Flex, Heading, Text, Image, Box, useToast } from '@chakra-ui/react';
import InputField from 'components/InputField';
import Button from 'components/Button';

// ASSETS
import proxymIcon from 'assets/icons/proxym.png';

const SignInForm = () => {
  const [loginRequest, { isLoading }] = useAdminLoginRequestMutation();
  const navigate = useNavigate();
  const toast = useToast();

  const loginHandler = async (values: any) => {
    const response = await loginRequest({
      username: values?.username,
      password: values?.password,
    });
    if ('data' in response) {
      if (response.data.user) {
        navigate('/private/admin-dashboard');
      } else {
        toast({
          title: 'Error',
          description: response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const _isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  if (_isAuthenticated) {
    return <Navigate to="/private/admin-dashboard" />;
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
          Entrer votre username et mot de passe pour se connecter
        </Text>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .required("L'adresse e-mail est requise")
              .trim(),
            password: Yup.string()
              .required('Le mot de passe est requis')
              .trim(),
            fullName: Yup.string()
              .transform((value) => value.trim().toLowerCase())
              .test(
                'no-spaces',
                "Le nom complet ne doit pas contenir d'espaces",
                (value: any) => !/\s/.test(value)
              ),
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
                    label="username"
                    name="username"
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
      </Flex>
    </Flex>
  );
};

export default SignInForm;
