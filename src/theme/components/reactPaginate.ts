export const ReactPaginate = {
  components: {
    ReactPaginate: {
      // Style for the pagination container
      container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '1rem',
      },
      // Style for the pagination link
      link: {
        color: 'gray.500',
        fontWeight: 'semibold',
        padding: '0.5rem',
        border: '1px solid',
        borderColor: 'gray.500',
        borderRadius: 'md',
        _hover: {
          bg: 'gray.500',
          color: 'white',
        },
      },
      // Style for the active pagination link
      activeLink: {
        bg: 'gray.500',
        color: 'white',
        fontWeight: 'semibold',
        padding: '0.5rem',
        border: '1px solid',
        borderColor: 'gray.500',
        borderRadius: 'md',
      },
      // Style for the disabled pagination link
      disabledLink: {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
};
