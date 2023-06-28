// STYLED COMPONENTS
import { Flex, Text } from '@chakra-ui/react';

const StatisticsBox = (props: any) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      m={4}
      p={4}
      bg="#fff"
      borderRadius="10px"
      w="30%"
      minWidth="200px"
    >
      <Flex mb={4}>
        <Text color="gray" fontSize="xl" fontWeight="700" mr={4}>
          {props.title}
        </Text>
        {props.icon}
      </Flex>
      <Text fontSize="2xl" fontWeight="700">
        {props.number}
      </Text>
    </Flex>
  );
};

export default StatisticsBox;
