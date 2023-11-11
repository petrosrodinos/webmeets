import { Center, Spinner as ChakraSpinner } from '@chakra-ui/react';
import { FC } from 'react';

type SpinnerProps = {
  loading: boolean;
} & React.ComponentProps<typeof ChakraSpinner>;

const Spinner: FC<SpinnerProps> = ({ loading, ...rest }) => {
  return loading ? (
    <Center>
      {' '}
      <ChakraSpinner {...rest} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Center>
  ) : null;
};

export default Spinner;
