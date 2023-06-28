// REACT
import { useState } from 'react';

// PROJECT_COMPONENT
import Application from './Application';
import Timeline from './Timeline';
import Apply from './Apply';

//CHAKRA_COMPONENTS
import { Flex } from '@chakra-ui/react';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import { getToken } from 'utils/functions';
import { useEffect } from 'react';

const Content = () => {
  const [applied, setApplied] = useState<boolean>(true);
  const token = getToken();
  const { data, refetch } = useDecodeTokenQuery(token);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (token) {
      setApplied(!!data?.user?.submissionDate);
    }
  }, [token, data]);

  return (
    <Flex
      direction={{ lg: 'row', base: 'column' }}
      w="100%"
      // gap={10}
      justifyContent="space-evenly"
      alignItems="center"
      mb={4}
    >
      <Timeline />
      {applied ? <Application /> : <Apply />}
    </Flex>
  );
};

export default Content;
