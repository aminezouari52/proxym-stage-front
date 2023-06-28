// COMPONENTS
import FormSideBox from './FormSideBox';

// SVG IMAGES
import ContactInfoImage from 'assets/images-svg/contactInformation.svg';
import CareerInfoImage from 'assets/images-svg/careerInformation.svg';
import OrganizingProjectsImage from 'assets/images-svg/organizingProjects.svg';
import LinkImage from 'assets/images-svg/Link.svg';

// FORMS
import ContactInfoForm from './Forms/ContactInfo';
import CareerInfoForm from './Forms/CareerInfo';
import ProjectsForm from './Forms/Projects';
import SocialMediaForm from './Forms/UsefulLinks';

//CHAKRA_COMPONENTS
import { Flex, Box } from '@chakra-ui/react';

const FormsWrapper = (props: any) => {
  let description, image, form;
  switch (props.activeStep) {
    case 0:
      description =
        'En fournissant des informations de contact, vous nous permettez de vous contacter facilement pour toute mise à jour concernant votre candidature.';
      image = ContactInfoImage;
      form = (
        <ContactInfoForm
          candidateData={props.candidateData.contactInfo}
          prevForm={props.prevForm}
          nextForm={props.nextForm}
        />
      );
      break;
    case 1:
      description =
        'Fournir une description détaillée de votre parcours professionnel nous permettra de mieux évaluer votre profil pour les projets sélectionnés.';
      image = CareerInfoImage;
      form = (
        <CareerInfoForm
          prevForm={props.prevForm}
          nextForm={props.nextForm}
          candidateData={props.candidateData.careerInfo}
        />
      );
      break;
    case 2:
      description =
        'Veuillez sélectionner trois projets au maximum qui suscitent votre intérêt et qui reflètent vos compétences';
      image = OrganizingProjectsImage;
      form = (
        <ProjectsForm
          prevForm={props.prevForm}
          nextForm={props.nextForm}
          candidateData={props.candidateData.projects}
        />
      );
      break;
    case 3:
      description =
        'Fournir vos liens de réseaux sociaux nous aide à prendre un regard détaillé sur vos projets et votre profil professionnel';
      image = LinkImage;
      form = (
        <SocialMediaForm
          prevForm={props.prevForm}
          nextForm={props.nextForm}
          candidateData={props.candidateData.usefulLinks}
        />
      );
      break;
    default:
      description = 'form description';
      image = 'form image';
      form = <Box></Box>;
      break;
  }

  return (
    <Flex justifyContent="space-between" p={8} mt={4}>
      <FormSideBox description={description} image={image} />
      <Flex w={{ lg: '60%', base: '90%' }}>{form}</Flex>
    </Flex>
  );
};

export default FormsWrapper;
