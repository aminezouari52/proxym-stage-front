/* eslint-disable @typescript-eslint/no-explicit-any */
// REACT
// import { useLocation } from 'react-router-dom';

// STYLED COMPONENTS
import { Portal, useDisclosure, Box, Flex } from '@chakra-ui/react';

// PROJECT COMPONENTS
import Drawer from 'components/Drawer';
import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbars/Navbar';
import { Outlet } from 'react-router-dom';
// import routes from 'routes';

const PrivateLayout = () => {
  // to check for active links and opened collapses
  // let location = useLocation();

  // states and functions
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        direction="column"
        justifyContent="space-between"
        w="100%"
        // h="100vh"
        overflowY="auto"
        overflowX="hidden"
      >
        <Portal>
          <Drawer isOpen={isOpen} onClose={onClose} />
          <Navbar onOpen={onOpen} />
        </Portal>
        <Box w="100%" mt={16} mb={4}>
          <Outlet />
        </Box>
        <Footer color="tertiary.500" fontWeight="400" />
      </Flex>
    </>
  );
};

export default PrivateLayout;
