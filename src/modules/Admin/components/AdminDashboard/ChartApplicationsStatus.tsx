// STYLED COMPONENTS
import { Divider, Flex, Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useGetApplicationsQuery } from 'modules/Admin/redux';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const countByCandidatesStage = (candidates: any, status: string): number => {
  return candidates?.filter((candidate: any) => candidate.status === status)
    .length;
};

const ChartCV = (props: any) => {
  const { data: applications } = useGetApplicationsQuery({});

  const data = {
    labels: ['Non-traité', 'Accepté', 'Refusé'],
    datasets: [
      {
        label: 'nombre de candidatures',
        data: [
          countByCandidatesStage(applications, 'pending'),
          countByCandidatesStage(applications, 'accepted'),
          countByCandidatesStage(applications, 'rejected'),
        ],
        backgroundColor: ['#56D6D6', '#85BA3C', '#FF4136'],
        borderColor: ['#56D6D6', '#85BA3C', '#FF4136'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Flex
      direction="column"
      alignItems="start"
      m={4}
      p={4}
      bg="#fff"
      borderRadius="10px"
      maxWidth="400px"
    >
      <Text fontSize="2xl">{props.title}</Text>
      <Divider my={4} />
      <Pie data={data} />
    </Flex>
  );
};

export default ChartCV;
