// STYLED COMPONENTS
import { Divider, Flex, Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const countByCandidatesStage = (candidates: any, stage: string): number => {
  return candidates?.filter((candidate: any) => candidate.stage === stage)
    .length;
};

const ChartCandidatesStage = (props: any) => {
  const data = {
    labels: ['Non-traité', 'Filtré', 'Interviewé', 'Accepté', 'Refusé'],
    datasets: [
      {
        label: 'nombre de candidats',
        data: [
          countByCandidatesStage(props.session?.candidates, 'pending'),
          countByCandidatesStage(props.session?.candidates, 'filtered'),
          countByCandidatesStage(props.session?.candidates, 'interviewed'),
          countByCandidatesStage(props.session?.candidates, 'accepted'),
          countByCandidatesStage(props.session?.candidates, 'rejected'),
        ],
        backgroundColor: [
          '#56D6D6',
          '#FFC000',
          '#7b2cbf',
          '#85BA3C',
          '#FF4136',
        ],
        borderColor: ['#56D6D6', '#FFC000', '#7b2cbf', '#85BA3C', '#FF4136'],
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

export default ChartCandidatesStage;
