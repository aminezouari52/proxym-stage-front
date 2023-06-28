// REACT
import { useEffect, useState } from 'react';
import { getToken } from 'utils/functions';

// CHAKRA COMPONENTS
import {
  Flex,
  Heading,
  Box,
  Text,
  Divider,
  Stack,
  StackDivider,
  List,
  ListItem,
  ListIcon,
  Icon,
} from '@chakra-ui/react';

// ICONS
import { ReactComponent as CheckIcon } from 'assets/icons-svg/check.svg';
import { ReactComponent as CloseIcon } from 'assets/icons-svg/close.svg';
import { ReactComponent as SearchIcon } from 'assets/icons-svg/search.svg';
import { ReactComponent as UserTie } from 'assets/icons-svg/user-tie.svg';
import { ReactComponent as ListCheck } from 'assets/icons-svg/list-check.svg';
import { CalendarIcon, HamburgerIcon, TimeIcon } from '@chakra-ui/icons';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import { useDecodeTokenQuery } from 'modules/Authentication/redux';
import {
  useGetInterviewQuery,
  useUserApplicationsQuery,
} from 'modules/Candidate/redux';

const Application = () => {
  let applicationData;
  let interview;
  const token = getToken();
  const [status, setStatus] = useState('');
  const { data: tokenData } = useDecodeTokenQuery(token);
  const userId = tokenData?.user?.id;
  if (userId) {
    ({ data: applicationData } = useUserApplicationsQuery(userId));
    ({ data: interview } = useGetInterviewQuery(userId));
  }

  // format the date
  const dateTime = new Date(`${interview?.date}T${interview?.time}:00`);
  const dayOfMonth = dateTime.getDate();
  const suffix =
    dayOfMonth >= 11 && dayOfMonth <= 13
      ? 'th'
      : ['st', 'nd', 'rd', 'th'][(dayOfMonth % 10) - 1] || 'th';
  const dayOfMonthWithSuffix = `${dayOfMonth}${suffix}`;
  const monthName = dateTime.toLocaleString('fr-FR', { month: 'long' });
  const year = dateTime.getFullYear();
  const formattedDate = `${dayOfMonthWithSuffix} ${monthName} ${year}`;
  const formattedTime = dateTime
    .toLocaleTimeString('fr-FR', { hour: 'numeric', minute: 'numeric' })
    .replace(':', 'h');
  // Combine the formatted date and time strings with "à" and return the result
  const finalrDateResult = `${formattedDate} à ${formattedTime}`;

  useEffect(() => {
    if (token) {
      setStatus(tokenData?.user?.stage);
    }
  }, [token, tokenData]);

  let color, text, icon;
  switch (status) {
    case 'pending':
      color = 'tertiary.500';
      icon = SearchIcon;
      text = [
        'Merci pour avoir postuler sur notre plateforme, nous somme entrein ',
        'd\'étudier votre CV',
        ', n\'oubliez pas de nous suivre pour rester à jour sur les dernières actualités',
      ];
      break;
    case 'filtered':
      color = 'yellow.500';
      icon = UserTie;
      text = [
        'Votre CV a attiré notre attention. ',
        ' Vous êtes invité pour un entretien. ',
        'Bonne chance et soyez ponctuel.',
      ];
      break;
    case 'interviewed':
      color = 'blue.500';
      icon = ListCheck;
      text = [
        'Vous avez ',
        'passer un entretien',
        ', nous devons étudier votre candidature, rester à jour sur les dernières actualités',
      ];
      break;
    case 'accepted':
      color = 'green.500';
      icon = CheckIcon;
      text = [
        'Félicitations! vous avez été ',
        'embauché.',
        'Bienvenue dans notre équipe,  meilleurs vœux pour ce nouveau chapitre de votre carrière !',
      ];
      break;
    case 'rejected':
      color = 'red.500';
      icon = CloseIcon;
      text = [
        'Malheureusement votre candidature ',
        'n\'a pas été accepté.',
        ' Nous souhaitons le meilleur des chances pour votre carrière.',
      ];
      break;
    default:
      color = 'gray.500';
      text = 'Unknown';
  }
  return (
    <Card
      w={{ lg: '45%', base: '90%' }}
      border="1px"
      borderColor="tertiary.500"
    >
      <CardHeader>
        <Flex alignItems="center" mb={2}>
          <Heading size="sm" textTransform="uppercase">
            entretiens prévus
          </Heading>
          <Icon as={CalendarIcon} fill={color} ml="12px" />
        </Flex>
        {status === 'filtered' ? (
          <Flex>
            <Text mr="4px">Vous avez un entretien le</Text>
            <Text color="tertiary.500" fontWeight="bold">
              {finalrDateResult}
            </Text>
          </Flex>
        ) : (
          <Text>Vous n'avez aucun entretien</Text>
        )}
      </CardHeader>
      <Divider border="1px" color="gray.200" />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Flex alignItems="center" mb={2}>
              <Heading size="xs" textTransform="uppercase">
                status
              </Heading>
              <Icon as={icon} fill={color} ml="12px" />
            </Flex>
            <Text>
              {text[0]}
              <Text as="span" color={color} fontWeight="500">
                {text[1]}
              </Text>
              {text[2]}
            </Text>
          </Box>
          <Box>
            <Flex alignItems="center" mb={2}>
              <Heading size="xs" textTransform="uppercase">
                Vos Sujets
              </Heading>
              <Icon as={HamburgerIcon} fill={color} ml="12px" />
            </Flex>
            <List spacing={3}>
              {applicationData?.map((appData: any) => (
                <ListItem key={appData.project.id}>
                  {appData.status === 'accepted' ? (
                    <ListIcon as={CheckIcon} fill="green.500" />
                  ) : appData.status === 'rejected' ? (
                    <ListIcon as={CloseIcon} fill="red.500" />
                  ) : (
                    <ListIcon as={TimeIcon} fill="green.500" />
                  )}
                  {appData.project.title}
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Application;
