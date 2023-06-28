// REACT
import { useRef } from 'react';
import { useSubmitApplicationMutation } from 'modules/Candidate/redux';

// PROJECT COMPONENTS
import FormsWrapper from './FormsWrapper';
import VerifyData from './VerifyData';

// CHARA-UI-STEPS
import { Steps, Step, useSteps } from 'chakra-ui-steps';

// STYLED COMPONENTS
import { Flex, Portal, useDisclosure } from '@chakra-ui/react';

const Content = () => {
  const [submitRequest] = useSubmitApplicationMutation();

  const candidateData = useRef({
    contactInfo: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      image: '',
      phone: '',
      birthDate: '',
      CIN: '',
    },
    careerInfo: {
      cv: '',
      skills: [],
      experience: [],
    },
    projects: [],
    usefulLinks: [],
  });
  const { onClose } = useDisclosure();

  // chakra-ui-steps
  const steps = [
    'Remplissage des informations de contact',
    'Ajout des informations professionnelles',
    'Selection des sujets',
    'Liens utiles',
  ];
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const hasCompletedAllSteps = activeStep === steps.length;

  // FORMS METHODS
  const prevFormHandler = () => {
    prevStep();
  };
  const nextFormHandler = (values: any) => {
    switch (activeStep) {
      case 0:
        candidateData.current.contactInfo = values;
        break;
      case 1:
        candidateData.current.careerInfo = values;
        break;
      case 2:
        candidateData.current.projects = values;
        break;
      case 3:
        candidateData.current.usefulLinks = values;
        break;
      default:
        break;
    }
    nextStep();
  };
  const finalSubmit = () => {
    // send post request to the backend
    submitRequest(candidateData.current);
  };
  const resetHandler = () => {
    onClose();
    prevStep();
  };

  return (
    <Flex flexDir="column" bg="#fff" m={4} p={4} borderRadius="12px" h="100%">
      <Steps
        variant="circles-alt"
        colorScheme={hasCompletedAllSteps ? 'green' : 'tertiary'}
        activeStep={activeStep}
      >
        {steps.map((label) => (
          <Step label={label} key={label}>
            <FormsWrapper
              activeStep={activeStep}
              prevForm={prevFormHandler}
              nextForm={nextFormHandler}
              candidateData={candidateData?.current}
            />
          </Step>
        ))}
      </Steps>
      {hasCompletedAllSteps && (
        <Portal>
          <VerifyData
            finalSubmit={finalSubmit}
            candidateData={candidateData.current}
            isOpen={hasCompletedAllSteps}
            onClose={resetHandler}
          />
        </Portal>
      )}
    </Flex>
  );
};

export default Content;
