import { Input as ChakraInput } from '@chakra-ui/react';

export const Input = ({ ...props }) => {
  return (
    <ChakraInput
      borderRadius="15px"
      colorScheme="tertiary.500"
      borderColor="tertiary.500"
      focusBorderColor="tertiary.500"
      _hover={{ borderColor: 'tertiary.500' }}
      {...props}
    />
  );
};
