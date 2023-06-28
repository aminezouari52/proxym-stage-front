// REACT
import { Outlet } from 'react-router-dom';

// STYLE
import { Flex } from '@chakra-ui/react';

// COMPONENTS
import Footer from 'components/Footer/Footer';
import AuthNavBar from 'components/Navbars/AuthNavbar';

// ASSETS
import background from 'assets/images/bg.png';

// ==============================|| MINIMAL LAYOUT ||============================== //

const PublicLayout = () => (
  <Flex
    direction="column"
    justifyContent="space-between"
    bg={`url(${background}) 0 0/cover`}
    w="100%"
    h="100vh"
    overflowY="auto"
    overflowX="hidden"
  >
    <AuthNavBar />
    <Outlet />
    <Footer />
  </Flex>
);

export default PublicLayout;
