// STYLED COMPONENTS
import {
  Flex,
  Button,
  VStack,
  Avatar,
  Text,
  StackDivider,
  HStack,
  Modal,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

const InterviewsModal = (props: any) => {
  return (
    <Modal
      onClose={props.onClose}
      isOpen={props.isOpen}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Entretien à venir</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack
            w="100%"
            divider={<StackDivider borderColor="gray.200" />}
            spacing={4}
            align="stretch"
          >
            {props?.users?.map((user: any, index: any) => (
              <Flex key={index} justifyContent="space-between" w="100%">
                <HStack>
                  <Avatar src={user.photo} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{user.name}</Text>
                    <Text fontSize="sm">{user.college}</Text>
                  </VStack>
                </HStack>
                <Text fontSize="lg" fontWeight="700">
                  {user.date}
                </Text>
              </Flex>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onClose} colorScheme="error">
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InterviewsModal;
