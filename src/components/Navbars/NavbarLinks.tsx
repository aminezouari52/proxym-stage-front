// REACT
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from 'app/store';
import { logout } from 'modules/Authentication/redux';

// STYLED COMPONENTS
import { Button, Flex } from '@chakra-ui/react';

// ICONS
import { ReactComponent as LogoutIcon } from 'assets/icons-svg/logout.svg';

const AdminNavbarLinks = () => {
  const dispatch: any = useAppDispatch();

  return (
    <Flex
      alignItems="center"
      w={{ lg: '17%', md: '40%', base: '65%' }}
      justifyContent="space-between"
    >
      <NavLink to="/auth/login">
        <Button
          ms="0px"
          px="0px"
          me={{ sm: '2px', md: '16px' }}
          color="#fff"
          variant="transparent-with-icon"
          rightIcon={<LogoutIcon fill="#fff" width="22px" height="22px" />}
          onClick={() => dispatch(logout())}
        >
          Se déconnecter
        </Button>
      </NavLink>
    </Flex>
  );
};

export default AdminNavbarLinks;
