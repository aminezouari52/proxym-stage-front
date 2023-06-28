/*eslint-disable*/
import { Text, Flex } from '@chakra-ui/react';

export default function Footer(props: any) {
  return (
    <Flex justifyContent="center" width="100%">
      <Text
        color="#fff"
        textAlign="center"
        letterSpacing={5}
        textTransform="uppercase"
        fontWeight="100"
        {...props}
      >
        © {new Date().getUTCFullYear()} Proxym Tunisia, INC. All rights
        reserved.
      </Text>
    </Flex>
  );
}
