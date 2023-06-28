// material
// components
import { FunctionComponent } from 'react';
import _401 from 'assets/images/401.jpg';

// Customization state
import config from 'config';
import { Box, Container, Image, Link, styled, Text } from '@chakra-ui/react';

// ----------------------------------------------------------------------

const RootStyle = styled('div', {
  baseStyle: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    height: '100vh',
  },
});

// ----------------------------------------------------------------------

const NotFound: FunctionComponent = () => {
  return (
    <RootStyle title="Access Denied">
      <Container>
        <Box sx={{ margin: 'auto', textAlign: 'center' }}>
          <Box boxSize="sm">
            <Image
              src={_401}
              alt="401 No Access"
              sx={{
                height: 450,
                mx: 'auto',
              }}
            />
          </Box>
          <Box sx={{ maxWidth: 480, margin: 'auto' }}>
            <Text variant="h3">Sorry, you can't access this page!</Text>
            <Link href={config.defaultPath}>Go Back</Link>
          </Box>
        </Box>
      </Container>
    </RootStyle>
  );
};

export default NotFound;
