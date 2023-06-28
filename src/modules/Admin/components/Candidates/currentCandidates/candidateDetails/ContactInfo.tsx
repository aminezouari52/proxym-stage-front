// STYLED COMPONENTS
import {
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Link,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';

// ASSETS
import { ReactComponent as PhoneIcon } from 'assets/icons-svg/phone.svg';
import { ReactComponent as MailIcon } from 'assets/icons-svg/mail.svg';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const ContactInfo = (props: any) => {
  const linkList = [
    { label: 'LinkedIn', icon: '', href: props.candidate?.usefulLinks[0] },
    { label: 'Github', icon: '', href: props.candidate?.usefulLinks[1] },
    { label: 'Codewas', icon: '', href: props.candidate?.usefulLinks[2] },
    { label: 'Portfolio', icon: '', href: props.candidate?.usefulLinks[3] },
    { label: 'Autres', icon: '', href: props.candidate?.usefulLinks[4] },
  ];

  return (
    <Box p={6} bg="gray.100" borderWidth={1} borderColor="gray.300">
      <Flex
        direction={{ lg: 'row', md: 'row', base: 'column' }}
        fontSize={{ lg: 'lg', md: 'lg', base: 'xs' }}
        alignItems="center"
      >
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar src={props?.candidate?.photo} />
          <Box>
            <Flex>
              <Heading size="md">
                {props.candidate?.firstName} {props.candidate?.lastName}
              </Heading>
              <Badge variant="subtle" colorScheme="purple" ml={1} h="50%">
                {props.candidate?.stage}
              </Badge>
            </Flex>
            <Flex>
              {props.candidate?.skills.map((skill: string) => (
                <Tag
                  key={skill}
                  size="sm"
                  colorScheme="primary"
                  color="#000"
                  variant="solid"
                  mr={1}
                  mt={1}
                >
                  {skill}
                </Tag>
              ))}
            </Flex>
          </Box>
        </Flex>
        <Stack h="100%" direction={{ lg: 'row', md: 'row', base: 'column' }}>
          <Flex
            alignItems="center"
            p={2}
            borderRadius="3px"
            bg="#fff"
            boxShadow="md"
            mt={{ lg: 0, md: 0, base: 2 }}
            mr={{ lg: 2, md: 2, base: 0 }}
          >
            <PhoneIcon height="15px" width="15px" fill="#562AD6" />
            <Text ml={2}>{props.candidate?.phone}</Text>
          </Flex>
          <Flex
            alignItems="center"
            p={2}
            borderRadius="3px"
            bg="#fff"
            boxShadow="md"
          >
            <MailIcon height="15px" width="15px" fill="#562AD6" />
            <Text ml={2}>{props.candidate?.email}</Text>
          </Flex>
        </Stack>
      </Flex>

      <Divider my={4} />

      <Stack wrap="wrap">
        {linkList.map(
          (link: any) =>
            !!link.href && (
              <Flex alignItems="start" key={link.label}>
                <Text fontWeight={500} mr={2}>
                  {link.label}:{' '}
                </Text>
                <Link
                  key={link.label}
                  href={link.href}
                  isExternal
                  color="gray.800"
                  _hover={{
                    color: 'tertiary.600',
                    textDecoration: 'underline',
                  }}
                  display="inline-flex"
                  alignItems="center"
                  wordBreak="break-all"
                >
                  {link.href} <ExternalLinkIcon mx="2px" />
                </Link>
              </Flex>
            )
        )}
      </Stack>
    </Box>
  );
};

export default ContactInfo;
