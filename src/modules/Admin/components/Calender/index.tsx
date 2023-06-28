// REACT
import { useGetInterviewsQuery } from 'modules/Admin/redux';

// STYLED COMPONENTS
import { Box } from '@chakra-ui/react';

// CALENDER
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './calender.css';

const Calender = () => {
  const { data: interviews } = useGetInterviewsQuery({});
  const transformedInterviews = interviews?.map((interview: any) => {
    return {
      title: `${interview.user.firstName} ${interview.user.lastName}`,
      date: new Date(`${interview.date}T${interview.time}:00`),
    };
  });
  const calendarOptions = {
    plugins: [dayGridPlugin],
    events: transformedInterviews,
    locale: 'fr',
    buttonText: {
      today: 'Aujourd\'hui', // Customize the "today" button text
    },
  };
  return (
    <Box p={4} className="App">
      <FullCalendar {...calendarOptions} />
    </Box>
  );
};

export default Calender;
