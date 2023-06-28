// REACT
import { useNavigate } from 'react-router-dom';

// STYLED COMPONENTS
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Stack,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react';
import Button from 'components/Button';

// ASSETS
import ProxymLogo from 'assets/icons/proxym-black-text.png';
import { ReactComponent as ChartIcon } from 'assets/icons-svg/chart.svg';
import { ReactComponent as UsersIcon } from 'assets/icons-svg/users.svg';
import { ReactComponent as LaptopIcon } from 'assets/icons-svg/laptop.svg';
import { ReactComponent as GraphTreeIcon } from 'assets/icons-svg/graph-tree.svg';
import { CalendarIcon } from '@chakra-ui/icons';

const drawerElements = [
  {
    title: 'Dashboard',
    icon: (
      <Box mr={4} fill="gray.700">
        <ChartIcon height="20px" width="20px" />
      </Box>
    ),
    link: 'admin-dashboard',
  },
  {
    title: 'Candidats',
    icon: (
      <Box mr={4} fill="tertiary.500">
        <UsersIcon height="20px" width="20px" />
      </Box>
    ),
    link: 'candidates',
  },
  {
    title: 'Calender',
    icon: (
      <Box mr={4}>
        <CalendarIcon color="primary.500" h="20px" w="20px" />
      </Box>
    ),
    link: 'calender',
  },
  {
    title: 'Sujets',
    icon: (
      <Box mr={4} fill="green.500">
        <LaptopIcon height="20px" width="20px" />
      </Box>
    ),
    link: 'projects',
  },
  {
    title: 'Sessions',
    icon: (
      <Box mr={4} fill="error.500">
        <GraphTreeIcon height="20px" width="20px" />
      </Box>
    ),
    link: 'sessions',
  },
];

const index = ({ onClose, isOpen }: any) => {
  const navigate = useNavigate();

  return (
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex direction="column" justifyContent="center" alignItems="start">
            <Image alt="proxym-logo" src={ProxymLogo} h="40px" w="160px" />
            <Text fontWeight="400" fontSize="xs" ml={10}>
              Resources Humaines
            </Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing={4} direction="column">
            {drawerElements.map((element) => (
              <Button
                key={element.title}
                color="#000"
                colorScheme="transparent"
                justifyContent="start"
                _hover={{
                  bg: 'gray.500',
                }}
                onClick={() => navigate(element.link)}
              >
                {element.icon}
                <Box>{element.title}</Box>
              </Button>
            ))}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default index;
