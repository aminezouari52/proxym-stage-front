// REACT IMPORT
import { NavLink } from 'react-router-dom';

// STYLE IMPORTS
import { Button, Flex, Text, Image, Icon } from '@chakra-ui/react';
import { ReactComponent as HomeIcon } from 'assets/icons-svg/home.svg';
import { ReactComponent as UserAdd } from 'assets/icons-svg/user-add.svg';
import { ReactComponent as SignInIcon } from 'assets/icons-svg/sign-in.svg';

// ASSETS
import logoImg from 'assets/icons/proxym-white-text.png';

const NavBar = () => {
  return (
    <Flex
      mx="16px"
      my="22px"
      justifyContent={{ lg: 'space-evenly', base: 'space-around' }}
      alignItems="center"
    >
      <Image
        alt="logo-proxym"
        src={logoImg}
        h="55px"
        display={{ lg: 'flex', md: 'flex', base: 'none' }}
      />
      <Flex w="40%" justifyContent="space-around">
        <NavLink
          to="/on-boarding"
          style={({ isActive }) =>
            isActive
              ? { color: '#adb5bd', fill: '#adb5bd' }
              : { color: '#fff', fill: '#fff' }
          }
        >
          <Button
            fontSize={{ lg: '16px', base: '12px' }}
            fontWeight="700"
            variant="transparent-with-icon"
            leftIcon={<Icon as={HomeIcon} />}
          >
            <Text>Acceuil</Text>
          </Button>
        </NavLink>

        <NavLink
          to="/auth/signup"
          style={({ isActive }) =>
            isActive
              ? { color: '#adb5bd', fill: '#adb5bd' }
              : { color: '#fff', fill: '#fff' }
          }
        >
          <Button
            fontSize={{ lg: '16px', base: '12px' }}
            fontWeight="700"
            variant="transparent-with-icon"
            leftIcon={<Icon as={UserAdd} />}
          >
            <Text>S'inscrire</Text>
          </Button>
        </NavLink>
        <NavLink
          to="/auth/login"
          style={({ isActive }) =>
            isActive
              ? { color: '#adb5bd', fill: '#adb5bd' }
              : { color: '#fff', fill: '#fff' }
          }
        >
          <Button
            fontSize={{ lg: '16px', base: '12px' }}
            fontWeight="700"
            variant="transparent-with-icon"
            leftIcon={<Icon as={SignInIcon} />}
          >
            <Text>Se connecter</Text>
          </Button>
        </NavLink>
      </Flex>
      {/* <NavLink to="/admin/profile">
        <Button
          fontSize="lg"
          fontWeight="light"
          color="white"
          variant="transparent-with-icon"
          leftIcon={<BsPersonCircle color="white" />}
        >
          <Text fontSize={{sm: 8 }}>Profile</Text>
        </Button>
      </NavLink> */}

      {/* PROFILE_COMPONENT */}
      {/* <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name="Segun Adebayo" src={avatarImg} />
            <Box>
              <Heading size="md">Amine Zouari</Heading>
              <Text>Frontend, React et Node</Text>
            </Box>
          </Flex> */}
    </Flex>
  );
};

export default NavBar;
