// STYLED COMPONENTS
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useUpdateApplicationMutation } from 'modules/Admin/redux';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import { useEffect, useState } from 'react';

const Applications = (props: any) => {
  const [applications, setApplications] = useState(props.applications || []);

  useEffect(() => {
    setApplications(props.applications);
  }, [props]);

  const token = Cookies.get('token');
  const { data } = useDecodeTokenQuery(token);

  const [createRequest] = useUpdateApplicationMutation();

  const acceptApplicationHandler = (userId: number, projectId: number) => {
    createRequest({ userId, projectId, status: 'accepted' });
    const updatedApplications = applications?.map((app: any) => {
      if (app.userId === userId && app.projectId === projectId) {
        return {
          ...app,
          status: 'accepted',
        };
      }
      return app;
    });
    setApplications(updatedApplications);
  };

  const rejectApplicationHandler = (userId: number, projectId: number) => {
    createRequest({ userId, projectId, status: 'rejected' });
    const updatedApplications = applications?.map((app: any) => {
      if (app.userId === userId && app.projectId === projectId) {
        return {
          ...app,
          status: 'rejected',
        };
      }
      return app;
    });
    setApplications(updatedApplications);
  };
  const resetApplicationHandler = (userId: number, projectId: number) => {
    createRequest({ userId, projectId, status: 'pending' });
    const updatedApplications = applications?.map((app: any) => {
      if (app.userId === userId && app.projectId === projectId) {
        return {
          ...app,
          status: 'pending',
        };
      }
      return app;
    });
    setApplications(updatedApplications);
  };
  return (
    <Box p={6} bg="gray.100" borderWidth={1} borderColor="gray.300">
      <Heading as="h3" size="md">
        Candidatures
      </Heading>
      <Flex
        direction={{ lg: 'row', md: 'row', base: 'column' }}
        justifyContent="space-evenly"
        alignItems="center"
        mt={4}
      >
        {applications?.map((app: any) => (
          <Stack
            spacing={6}
            key={`${app.userId}-${app.projectId}`}
            mb={4}
            p={4}
            borderRadius="3px"
            bg="#fff"
            boxShadow="md"
            minH="220px"
            w="280px"
            h="240px"
            justifyContent="space-between"
          >
            <Flex alignItems="start">
              <Heading fontSize="md" mb={1}>
                {app.project.title}
              </Heading>
              <Badge
                variant="subtle"
                colorScheme={
                  app.status == 'accepted'
                    ? 'green'
                    : app.status == 'rejected'
                    ? 'red'
                    : 'purple'
                }
                ml={1}
              >
                {app.status}
              </Badge>
            </Flex>
            <Text fontSize="md" mb={1}>
              Appliqué à {new Date(app.createdAt).toLocaleDateString()}
            </Text>
            {(props.role == 'admin' ||
              (props.role == 'supervisor' &&
                app.project.adminName === data.user.username)) && (
              <Flex justifyContent="flex-end">
                {app.status === 'pending' && (
                  <Button
                    size="sm"
                    colorScheme="error"
                    borderRadius="5px"
                    mr={2}
                    onClick={() =>
                      rejectApplicationHandler(app.userId, app.projectId)
                    }
                  >
                    Refuser
                  </Button>
                )}
                {app.status === 'pending' ? (
                  <Button
                    size="sm"
                    colorScheme="green"
                    borderRadius="5px"
                    onClick={() =>
                      acceptApplicationHandler(app.userId, app.projectId)
                    }
                  >
                    Accepter
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    borderRadius="5px"
                    onClick={() =>
                      resetApplicationHandler(app.userId, app.projectId)
                    }
                  >
                    Réinitialiser
                  </Button>
                )}
              </Flex>
            )}
          </Stack>
        ))}
      </Flex>
    </Box>
  );
};

export default Applications;
