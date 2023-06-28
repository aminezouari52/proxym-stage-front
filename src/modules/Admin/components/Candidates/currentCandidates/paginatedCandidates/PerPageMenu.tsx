// STYLED COMPONENTS
import { Flex, Text, Select } from '@chakra-ui/react';

// PROJECT COMPONENTS
import { ChevronDownIcon } from '@chakra-ui/icons';

const PerPageMenu = ({
  data,
  numberCandidatesPerPage,
  setNumberCandidatesPerPageHandler,
}: {
  data: any;
  numberCandidatesPerPage: number;
  setNumberCandidatesPerPageHandler: any;
}) => {
  const options = [5, 10, 50];
  return (
    <Flex
      direction={{ lg: 'row', md: 'row', base: 'column' }}
      alignItems="center"
      w="50%"
    >
      <Text fontWeight="900">Candidats par Page</Text>
      <Select
        w="50%"
        colorScheme="tertiary.500"
        variant="outline"
        borderRadius="8px"
        icon={<ChevronDownIcon />}
        ml={4}
        value={numberCandidatesPerPage}
        onChange={(e) =>
          setNumberCandidatesPerPageHandler(parseInt(e.target.value))
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option <= data?.length ? option : data?.length} / {data?.length}
          </option>
        ))}
      </Select>
    </Flex>
  );
};

export default PerPageMenu;
