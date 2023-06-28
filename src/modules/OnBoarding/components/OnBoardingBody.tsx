import { Flex, Box, Image, Heading, Text } from '@chakra-ui/react';
import Button from 'components/Button';
import hiringSteps from 'assets/images/hiring-steps.png';
import { DownloadIcon, InfoIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useGetActiveSessionQuery } from 'modules/Admin/redux';
const OnBoardingPage = () => {
  const navigate = useNavigate();
  const { data: session } = useGetActiveSessionQuery({});

  const handleDownload = () => {
    fetch('http://localhost:3000/api/admins/download/PFEBook')
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'proxym.pdf'; // Replace with the actual file name
        a.click();
      });
  };

  return (
    <Flex
      direction={{ lg: 'row', base: 'column-reverse' }}
      justifyContent={{ lg: 'space-evenly', md: 'start', base: 'center' }}
      w="100%"
      color="white"
      alignItems="center"
    >
      {session ? (
        <Flex
          direction="column"
          alignItems={{ lg: 'start', base: 'center' }}
          justifyContent="center"
          w={{ lg: '40%' }}
          p="20px"
        >
          <Heading
            fontSize={{ lg: '40px', md: '36px', base: '28px' }}
            mb={{ lg: 4, base: 0 }}
            textAlign={{ lg: 'start', base: 'center' }}
          >
            Bienvenue dans la session {session.title}!
          </Heading>

          <Text fontSize="xl" display={{ lg: 'flex', base: 'none' }}>
            Télécharger notre PFE Book et éxplorer les stages proposés par notre
            équipe.
          </Text>
          <Button
            mt="24px"
            colorScheme="secondary"
            color="black"
            onClick={handleDownload}
            // disabled={isLoading || isError}
          >
            PFE Book <DownloadIcon />
          </Button>

          <Text fontSize="xl" mt="24px" display={{ lg: 'flex', base: 'none' }}>
            Devenez un stagiaire chez Proxym et développez vos compétences
            professionnelles.
          </Text>
          <Button
            color="black"
            colorScheme="primary"
            mt="24px"
            onClick={() => navigate('/auth/signup')}
          >
            Devenez un stagiare chez Proxym!
          </Button>
        </Flex>
      ) : (
        <Flex alignItems="center" textAlign={{ lg: 'start', base: 'center' }}>
          <InfoIcon boxSize={7} />
          <Heading ml="6px">Aucune session est active!</Heading>
        </Flex>
      )}
      <Box>
        <Image
          alt="hiring-steps"
          src={hiringSteps}
          // w={{ sm: '90%' }}
          // h={{ sm: '30vh', lg: '50vh' }}
          h={{ lg: '60vh', md: '40vh', base: '30vh' }}
        />
      </Box>
    </Flex>
  );
};

export default OnBoardingPage;
