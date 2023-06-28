import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
  colors: {
    primary: {
      500: '#FFC000',
    },
    secondary: {
      500: '#56D6D6',
    },
    tertiary: {
      500: '#562AD6',
    },
    green: {
      500: '#85BA3C',
    },
    error: {
      500: '#FF4136',
    },
    gray: {
      200: '#e9ecef',
      500: '#cbcbcb',
      700: '#707070',
      900: '#1f2733',
    },
    blackAlpha: {
      500: 'rgba(0, 0, 0, 0.15)',
      700: '#00000099',
    },
  },
  fonts: {
    body: '"Montserrat", Helvetica, sans-serif',
    heading: '"Montserrat", Helvetica, sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.50', 'gray.800')(props),
        fontFamily: '"Montserrat", Helvetica, sans-serif',
      },

      html: {
        fontFamily: '"Montserrat", Helvetica, sans-serif',
      },
      button: {
        fontFamily: 'body',
      },
      input: {
        fontFamily: 'body',
      },
    }),
  },
};
