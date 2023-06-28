import { Helmet } from 'react-helmet-async';
// routing
import Routes from './routes/index';

// defaultThe
import { NavigationScroll } from './layout/index';
import { ChakraProvider } from '@chakra-ui/react';
import themes from 'theme';
import { login, useVerifyUserQuery } from 'modules/Authentication/redux';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/store';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'utils/functions';

const App = () => {
  const [toggleVerify, setToggleVerify] = useState(true);
  const { data, isSuccess } = useVerifyUserQuery({}, { skip: toggleVerify });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToggleVerify(false);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        login({
          token: data?.user?._newToken,
        })
      );
      if (data.user.role === 'candidate') {
        navigate('/private/home-page');
      } else {
        navigate('/private/admin-dashboard');
      }
    }
  }, [isSuccess]);

  return (
    <ChakraProvider theme={themes}>
      <NavigationScroll>
        <Helmet>
          <title>STAGES | PROXYM-GROUP</title>
        </Helmet>
        <Routes />
      </NavigationScroll>
    </ChakraProvider>
  );
};

export default App;
