import { Box } from '@chakra-ui/react';
import SignUp from './Signup';

const AuthWrapper = () => {
  return (
    <Box w="100%">
      <Box w="100%">
        <Box w="100%">
          <SignUp />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthWrapper;
