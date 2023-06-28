// REACT
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import { useState, useEffect } from 'react';
import { getToken } from 'utils/functions';

// STYLED COMPONENTS
import { Flex, Image } from '@chakra-ui/react';
import Button from 'components/Button';

// ASSETS
import { ReactComponent as MenuIcon } from 'assets/icons-svg/menu.svg';
import ProxymLogo from 'assets/icons/proxym-white-text.png';

// PROJECT IMPORTS
import AuthNavbarLinks from './NavbarLinks';

const AuthNavbar = (props: any) => {
  const [candidate, setCandidate] = useState<boolean>(false);
  const token = getToken();
  const { data } = useDecodeTokenQuery(token);

  useEffect(() => {
    if (token && data?.user?.role === 'candidate') {
      setCandidate(true);
    }
  }, [token, data]);
  return (
    <Flex
      position="absolute"
      top="0"
      right="0"
      justifyContent="space-between"
      bg="tertiary.500"
      py="8px"
      px="30px"
      w="100%"
    >
      <Flex>
        {!candidate && (
          <Button
            leftIcon={<MenuIcon height="25px" width="25px" fill="#fff" />}
            onClick={props.onOpen}
            colorScheme="transparent"
            minWidth="0px"
          />
        )}

        <Image
          display={{ lg: 'block', md: 'block', base: 'none' }}
          alt="proxym-logo"
          src={ProxymLogo}
          h="40px"
          w="180px"
          mx={4}
        />
      </Flex>
      <AuthNavbarLinks />
    </Flex>
  );
};

export default AuthNavbar;
