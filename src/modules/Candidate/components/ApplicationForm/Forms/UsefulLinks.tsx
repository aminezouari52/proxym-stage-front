// FORMIK
import { Formik, Form } from 'formik';

// STYLED COMPONENTS
import Button from 'components/Button';
import {
  Stack,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';

// ICONS
import { ReactComponent as LinkedinIcon } from 'assets/icons-svg/linkedin.svg';
import { ReactComponent as GithubIcon } from 'assets/icons-svg/github.svg';
import { ReactComponent as CodewarsIcon } from 'assets/icons-svg/codewars.svg';
import { LinkIcon } from '@chakra-ui/icons';

const UsefulLinks = (props: any) => {
  // INITIAL STATE
  const initialValues = [
    props.candidateData[0],
    props.candidateData[1],
    props.candidateData[2],
    props.candidateData[3],
    props.candidateData[4],
  ];

  const prevStepHandler = () => {
    props.prevForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        props.nextForm(values.filter((str) => str !== undefined));
      }}
    >
      {({ values, handleChange }) => {
        return (
          <Form style={{ width: '100%' }}>
            <Stack spacing={4}>
              <Flex direction="column">
                <Text mb={4} fontWeight="normal">
                  LinkedIn
                </Text>
                <InputGroup borderRadius="0px">
                  <InputLeftElement pointerEvents="none">
                    <LinkedinIcon fill="#0e76a8" width="20px" height="20px" />
                  </InputLeftElement>
                  <Input
                    name="0"
                    defaultValue={values[0]}
                    onChange={handleChange}
                    placeholder="https://www.linkedin.com/in/name-id"
                    colorScheme="tertiary.500"
                    focusBorderColor="tertiary.500"
                    _hover={{ borderColor: 'tertiary.500' }}
                  />
                </InputGroup>
              </Flex>
              <Flex direction="column">
                <Text mb={4} fontWeight="normal">
                  GitHub
                </Text>
                <InputGroup borderRadius="0px">
                  <InputLeftElement pointerEvents="none">
                    <GithubIcon fill="#333" width="20px" height="20px" />
                  </InputLeftElement>
                  <Input
                    name="1"
                    defaultValue={values[1]}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    colorScheme="tertiary.500"
                    focusBorderColor="tertiary.500"
                    _hover={{ borderColor: 'tertiary.500' }}
                  />
                </InputGroup>
              </Flex>
              <Flex direction="column">
                <Text mb={4} fontWeight="normal">
                  Codewars
                </Text>
                <InputGroup borderRadius="0px">
                  <InputLeftElement pointerEvents="none">
                    <CodewarsIcon fill="#B13600" width="20px" height="20px" />
                  </InputLeftElement>
                  <Input
                    name="2"
                    defaultValue={values[2]}
                    onChange={handleChange}
                    placeholder="https://www.codewars.com/users/username"
                    colorScheme="tertiary.500"
                    focusBorderColor="tertiary.500"
                    _hover={{ borderColor: 'tertiary.500' }}
                  />
                </InputGroup>
              </Flex>
              <Flex direction="column">
                <Text mb={4} fontWeight="normal">
                  Web portfolio
                </Text>
                <InputGroup borderRadius="0px">
                  <InputLeftAddon>https://</InputLeftAddon>
                  <Input
                    name="3"
                    defaultValue={values[3]}
                    onChange={handleChange}
                    borderRadius="0px"
                    placeholder="Votre site web de portfolio"
                    colorScheme="tertiary.500"
                    focusBorderColor="tertiary.500"
                    _hover={{ borderColor: 'tertiary.500' }}
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Flex>
              <Flex direction="column">
                <Text mb={4} fontWeight="normal">
                  Autres liens
                </Text>
                <InputGroup borderRadius="0px">
                  <InputLeftElement pointerEvents="none">
                    <LinkIcon width="20px" height="20px" />
                  </InputLeftElement>
                  <Input
                    name="4"
                    defaultValue={values[4]}
                    onChange={handleChange}
                    placeholder="Liens que vous trouvez utiles"
                    colorScheme="tertiary.500"
                    focusBorderColor="tertiary.500"
                    _hover={{ borderColor: 'tertiary.500' }}
                  />
                </InputGroup>
              </Flex>
              <Flex justifyContent="end">
                <Button onClick={prevStepHandler} variant="ghost" color="#000">
                  Précédent
                </Button>
                <Button type="submit" color="#000">
                  Enregistrer
                </Button>
              </Flex>
            </Stack>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UsefulLinks;
