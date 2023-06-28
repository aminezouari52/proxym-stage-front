export const buttonStyles = {
  components: {
    Button: {
      sizes: {
        md: {
          fontSize: '14px',
        },
      },
      variants: {
        'no-hover': {
          _hover: {
            boxShadow: 'none',
          },
        },
        'transparent-with-icon': {
          bg: 'transparent',
          fontWeight: 'bold',
          borderRadius: 'inherit',
          cursor: 'pointer',
          _active: {
            bg: 'transparent',
            transform: 'none',
            borderColor: 'transparent',
          },
          _focus: {
            boxShadow: 'none',
          },
          _hover: {
            boxShadow: 'none',
          },
        },
      },

      baseStyle: {
        borderRadius: '15px',
        _hover: {
          opacity: '0.8',
          boxShadow: 'none',
        },

        _focus: {
          boxShadow: 'none',
        },
      },
      defaultProps: {
        colorScheme: 'primary', // default is gray
      },
    },
  },
};
