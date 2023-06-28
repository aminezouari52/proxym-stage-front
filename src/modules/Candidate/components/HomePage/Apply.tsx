// REACT
import { useNavigate } from 'react-router-dom';

// STYLED COMPONENTS
import { Flex, Heading, Button } from '@chakra-ui/react';

const Content = () => {
  const navigate = useNavigate();
  return (
    <Flex
      direction="column"
      alignItems="center"
      h="100%"
      px={8}
      py={4}
      color="tertiary.500"
      border="1px"
      borderColor="tertiary"
      backgroundColor="#fff"
      borderRadius="15px"
    >
      <Heading size="md" mb={6} textAlign="center">
        Vous n'avez pas encore postuler
      </Heading>
      <Button
        color="#000"
        size="lg"
        onClick={() => navigate('/private/application-form')}
      >
        Postuler
      </Button>
    </Flex>
  );
};

export default Content;
