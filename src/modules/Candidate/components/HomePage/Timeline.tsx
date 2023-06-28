// REACT
import { getToken } from 'utils/functions';
import { useState, useEffect } from 'react';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';

// CHAKRA COMPONENTS
import { Box, Flex, Icon, Text } from '@chakra-ui/react';

// ICONS
import { ReactComponent as UserTie } from 'assets/icons-svg/user-tie.svg';
import { ReactComponent as SearchIcon } from 'assets/icons-svg/search.svg';
import { ReactComponent as ListCheck } from 'assets/icons-svg/list-check.svg';
import { ReactComponent as Check } from 'assets/icons-svg/check.svg';

// ASSETS
import { getCurrentFrenchDateAndTime } from 'utils/functions';

// status list: [applied(being-filtered), filtered(upcoming-interveiw), interviewed(studying-application), accepted, rejected]
const statusList = [
  'rejected',
  'pending',
  'filtered',
  'interviewed',
  'accepted',
];

// Get the index of the current status

const Timeline = () => {
  const [status, setStatus] = useState('');
  const currentStatusIndex = statusList.indexOf(status);
  const token = getToken();
  const { data } = useDecodeTokenQuery(token);

  useEffect(() => {
    if (token) {
      setStatus(data?.user?.stage);
    }
  }, [token, data]);
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      p={{ base: 5, lg: 55 }}
      // bg="#fff"

      borderRadius="15px"
      mb={{ lg: 0, base: 4 }}
    >
      <Flex direction="column" w="100%" mb={4}>
        <Text fontSize="lg" fontWeight="bold" mb={1}>
          Suivi de votre candidature
        </Text>
        <Text fontSize="sm" color="gray.400">
          <Text fontWeight="bold" as="span" color="tertiary.500">
            {getCurrentFrenchDateAndTime().date}
          </Text>{' '}
          {' à ' + getCurrentFrenchDateAndTime().time}
        </Text>
      </Flex>

      <Flex direction="column" width="100%" px={6} py={3}>
        <Flex alignItems="center" justifyContent="start" h="78px" mb="22px">
          <Flex direction="column" h="100%">
            <Icon
              as={SearchIcon}
              fill={currentStatusIndex > 0 ? 'tertiary.500' : 'gray.500'}
              h="30px"
              w="26px"
              mb="12px"
              mr="12px"
            />

            <Box
              w="2px"
              bg={currentStatusIndex > 1 ? 'tertiary.500' : 'gray.500'}
              h="100%"
              ml="12px"
            ></Box>
          </Flex>
          <Flex direction="column" justifyContent="flex-start" h="100%">
            <Text fontSize="sm">Filtrage des CV</Text>
            {/* <Text fontSize="sm" color="gray.400">
              22 DEC 7:20 PM
            </Text> */}
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="start"
          minH="78px"
          h="78px"
          mb="22px"
        >
          <Flex direction="column" h="100%">
            <Icon
              as={UserTie}
              fill={currentStatusIndex > 1 ? 'tertiary.500' : 'gray.500'}
              h="30px"
              w="26px"
              mb="12px"
              mr="12px"
            />
            <Box
              bg={currentStatusIndex > 2 ? 'tertiary.500' : 'gray.500'}
              w="2px"
              h="100%"
              ml="12px"
            ></Box>
          </Flex>
          <Flex direction="column" justifyContent="flex-start" h="100%">
            <Text fontSize="sm">Passer un entretien</Text>
            {/* <Text color="gray.400" fontSize="sm">
              21 DEC 11:21 PM
            </Text> */}
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="start"
          h="78px"
          minH="78px"
          mb="22px"
        >
          <Flex direction="column" h="100%">
            <Icon
              as={ListCheck}
              fill={currentStatusIndex > 2 ? 'tertiary.500' : 'gray.500'}
              h="30px"
              w="26px"
              mb="12px"
              mr="12px"
            />
            <Box
              bg={currentStatusIndex > 3 ? 'tertiary.500' : 'gray.500'}
              w="2px"
              h="100%"
              ml="12px"
            ></Box>
          </Flex>
          <Flex direction="column" justifyContent="flex-start" h="100%">
            <Text fontSize="sm">Préselectionnées les candidatures</Text>
            {/* <Text color="gray.400" fontSize="sm">
              21 DEC 9:28 PM
            </Text> */}
          </Flex>
        </Flex>
        <Flex justifyContent="start" alignItems="center">
          <Flex direction="column" h="100%">
            <Icon
              as={Check}
              fill={currentStatusIndex > 3 ? 'green.500' : 'gray.500'}
              h="30px"
              w="26px"
              mr="12px"
            />
          </Flex>
          <Flex direction="column" justifyContent="flex-start" h="100%">
            <Text fontSize="sm">Embauché</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Timeline;
