// STYLED COMPONENTS
import { Box, Flex, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Button from 'components/Button';

const Experience = (props: any) => {
  return (
    <Box p={6} bg="gray.100" borderWidth={1} borderColor="gray.300">
      <Heading as="h3" size="md" mb={4}>
        Experience
      </Heading>
      <Wrap spacing={4} justify="start" minWidth="300px">
        {props.candidate?.experience?.map((exp: any) => (
          <WrapItem key={exp.title}>
            <Box
              p={4}
              h="100%"
              borderWidth="1px"
              borderRadius="lg"
              bgColor="white"
              boxShadow="md"
              maxW="sm"
              minW="xs"
            >
              <Flex justifyContent="space-between">
                <Heading as="h3" size="md" mb={2} color="purple.500">
                  {exp.title}
                </Heading>
                <Text fontWeight="bold" mb={4} color="gray.500">
                  {exp.duration}
                </Text>
              </Flex>
              <Text mb={2}>{exp.description}</Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>

      <Button mt={4} colorScheme="tertiary" color="#fff">
        <a
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
            top: 0,
            left: 0,
          }}
          download={`CV de ${props.candidate?.firstName} ${props.candidate?.lastName}`}
          href={props.candidate?.CV}
        ></a>
        Télécharger CV
      </Button>
    </Box>
  );
};

export default Experience;
