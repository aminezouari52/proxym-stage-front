// REACT

// STYLED COMPONENTS
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

// PROJECT COMPONENTS
import AllCandidates from 'modules/Admin/components/Candidates/allCandidates/AllCandidates';
import CurrentCandidates from 'modules/Admin/components/Candidates/currentCandidates/CurrentCandidates';

const Candidates = () => {
  return (
    <Tabs colorScheme="purple" size="lg">
      <TabList>
        <Tab>Évaluer les candidats</Tab>
        <Tab>Tous les candidats</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CurrentCandidates />
        </TabPanel>
        <TabPanel>
          <AllCandidates />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Candidates;
