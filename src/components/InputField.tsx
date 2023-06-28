import { Box, FormLabel } from '@chakra-ui/react';
import { Input } from 'components/Input/Input';
import { useField } from 'formik';

const InputField: React.FC<any> = ({ label, labelColor, ...props }) => {
  const [field, meta] = useField(props);
  const errorMessageColor =
    meta.touched && meta.error ? 'error.500' : props.secondarycolor;

  return (
    <Box w="100%">
      <FormLabel color={labelColor} ms="4px" fontWeight="normal">
        {label}
      </FormLabel>
      <Input
        borderRadius="15px"
        borderColor={errorMessageColor}
        focusBorderColor={errorMessageColor}
        _hover={{
          borderColor: errorMessageColor,
        }}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Box mt={1} color="error.500" fontSize="sm">
          {meta.error}
        </Box>
      ) : null}
    </Box>
  );
};

export default InputField;
