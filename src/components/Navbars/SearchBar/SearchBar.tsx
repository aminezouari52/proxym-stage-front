import React from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBar = () => {
  // Pass the computed styles into the `__css` prop
  // Chakra Color Mode
  const mainTeal = useColorModeValue('teal.300', 'teal.300');
  const searchIconColor = useColorModeValue('gray.700', 'gray.200');
  const inputBg = useColorModeValue('white', 'gray.800');
  return (
    <InputGroup
      bg={inputBg}
      borderRadius="15px"
      w="200px"
      _focus={{
        borderColor: { mainTeal },
      }}
      _active={{
        borderColor: { mainTeal },
      }}
    >
      <InputLeftElement>
        <IconButton
          bg="inherit"
          borderRadius="inherit"
          aria-label="Right"
          _active={{
            bg: 'inherit',
            transform: 'none',
            borderColor: 'transparent',
          }}
          _focus={{
            boxShadow: 'none',
          }}
          icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
        ></IconButton>
      </InputLeftElement>
      <Input
        fontSize="xs"
        py="11px"
        placeholder="Type here..."
        borderRadius="inherit"
      />
    </InputGroup>
  );
};

export default SearchBar;
