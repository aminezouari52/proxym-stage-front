// REACT
import { useLocation } from 'react-router-dom';
import {
  useGetCandidateByIdQuery,
  useUserApplicationsQuery,
} from 'modules/Candidate/redux';

// PROJECT COMPONENTS
import ContactInfo from './ContactInfo';
import Experience from './Experience';
import EvaluateCandidate from './evaluateCandidate/EvaluateCandidate';
import Reviews from './Reviews';

// STYLED COMPONENTS
import { Stack } from '@chakra-ui/react';
import Applications from './Applications';
import { useEffect, useState } from 'react';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import Cookies from 'js-cookie';

const CandidateDetails = () => {
  const [role, setRole] = useState<string>('');
  const token = Cookies.get('token');
  const { data } = useDecodeTokenQuery(token);

  useEffect(() => {
    if (data?.user?.role === 'admin') {
      setRole('admin');
    } else {
      setRole('supervisor');
    }
  }, [token, data]);

  const location = useLocation();

  const { data: candidate } = useGetCandidateByIdQuery(location.state?.email);
  const { data: applications } = useUserApplicationsQuery(location.state?.id);

  return (
    <Stack spacing={6} w="100%">
      <ContactInfo candidate={candidate} />
      <Experience candidate={candidate} />
      <Applications applications={applications} role={role} />
      {role == 'admin' && <EvaluateCandidate candidate={candidate} />}
      <Reviews candidate={candidate} admin={data} />
    </Stack>
  );
};

export default CandidateDetails;
