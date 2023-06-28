import { Flex, Text, Image } from '@chakra-ui/react';

const FormSideBox = (props: any) => {
  return (
    <Flex direction="column" w="30%" display={{ lg: 'block', base: 'none' }}>
      <Text color="gray.700">{props.description}</Text>
      <Image src={props.image} mt={2} p={4} />
    </Flex>
  );
};

export default FormSideBox;
