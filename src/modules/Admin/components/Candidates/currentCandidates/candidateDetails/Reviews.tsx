// STYLED COMPONENTS
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  Heading,
  StackDivider,
  Text,
  VStack,
  useToast,
  Button,
} from '@chakra-ui/react';
// import Button from 'components/Button';
import { AddIcon, StarIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';

// FORMIK
import * as Yup from 'yup';
import { Formik } from 'formik';
import InputField from 'components/InputField';

import { SmallCloseIcon } from '@chakra-ui/icons';
import { useParams } from 'react-router-dom';
import {
  useCreateReviewMutation,
  useGetCandidateReviewsQuery,
} from 'modules/Admin/redux';

const AdminReview = (props: any) => {
  const date = new Date(props.review.createdAt);
  const formattedDate = `${date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} à ${date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
  return (
    <Flex w="100%">
      <Avatar />
      <Flex w="100%" direction="column" mx={2}>
        <Flex justifyContent="space-evenly" w="100%">
          <Flex w="100%">
            <Heading size="md">{props.review.admin.username}</Heading>
            <Text ml={2} color="gray.600" fontWeight="500">
              {formattedDate}
            </Text>
          </Flex>
          <Flex
            px={2}
            borderRadius="10px"
            border="1px"
            borderColor="gray.300"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text mx={2} fontWeight="800">
              {props.review.score}.0
            </Text>
            <StarIcon color="primary.500" />
          </Flex>
        </Flex>
        <Text color="#000" py={2}>
          {props.review.note}
        </Text>
      </Flex>
    </Flex>
  );
};

const Reviews = (props: any) => {
  const { id } = useParams<{ id: any }>();
  const toast = useToast();
  const { data: reviews, refetch } = useGetCandidateReviewsQuery(Number(id));
  const [createRequest] = useCreateReviewMutation();

  useEffect(() => {
    refetch();
  }, []);

  // formik
  const initialValues = {
    note: '',
    score: 1,
  };
  const validationSchema = Yup.object({
    note: Yup.string().required('La remarque est requis'),
  });
  const onSubmit = async (values: any) => {
    try {
      const res = await createRequest({
        userId: Number(id),
        adminId: props?.admin?.user?.id,
        ...values,
      });
      console.log(res);
      if ('data' in res) {
        toast({
          title: 'Votre remarque a été publié!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
    }

    setShowForm(false);
    refetch();
  };

  const handleScoreClick = (selectedScore: any, setFieldValue: any) => {
    setFieldValue('score', selectedScore);
  };
  const [showForm, setShowForm] = useState<any>();
  const showFormHandler = (cond: boolean) => {
    setShowForm(cond);
  };

  const [hoveredStarColor, setHoveredStarColor] = useState<any>();
  const handleHover = (star: any) => {
    setHoveredStarColor(star);
  };

  return (
    <Box p={6} bg="gray.100" borderWidth={1} borderColor="gray.300">
      <Heading as="h3" size="md" mb={4}>
        Remarques
      </Heading>
      <Flex px={2} direction="column">
        {!showForm ? (
          <Button
            wordBreak="break-word"
            size="sm"
            leftIcon={<AddIcon />}
            colorScheme="green"
            variant="solid"
            justifyContent="start"
            alignItems="center"
            w="180px"
            fontSize={12}
            onClick={() => showFormHandler(true)}
          >
            Ajouter une remarque
          </Button>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <Flex
                  border="1px"
                  borderRadius="6px"
                  py={2}
                  px={4}
                  bg="#fff"
                  borderColor="gray.300"
                  pos="relative"
                  direction="column"
                  alignItems="end"
                >
                  <SmallCloseIcon
                    pos="absolute"
                    top="0"
                    right="0"
                    color="red"
                    boxSize={6}
                    mt={2}
                    mr={2}
                    cursor="pointer"
                    onClick={() => showFormHandler(false)}
                  />
                  <FormControl
                    mt={6}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <InputField
                      label="Remarque"
                      name="note"
                      placeholder="écrire une remarque.."
                      labelColor="#000"
                      secondarycolor="tertiary.500"
                      mb={2}
                      w="80%"
                    />
                    <Flex height="40px">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Box
                          key={star}
                          as="button"
                          type="button"
                          onClick={() =>
                            handleScoreClick(star, formik.setFieldValue)
                          }
                          color={
                            (star <= formik.values.score &&
                              !hoveredStarColor) ||
                            (hoveredStarColor && star <= hoveredStarColor)
                              ? 'yellow.400'
                              : 'gray.300'
                          }
                          transition="color 0.2s ease-in-out"
                          onMouseEnter={() => handleHover(star)}
                          onMouseLeave={() => handleHover(null)}
                          _focus={{ outline: 'none' }}
                        >
                          <StarIcon boxSize={6} />
                        </Box>
                      ))}
                    </Flex>
                  </FormControl>
                  <Button
                    mt={4}
                    colorScheme="primary"
                    color="#000"
                    type="submit"
                    w="10%"
                    minWidth="100px"
                  >
                    Publier
                  </Button>
                </Flex>
              </form>
            )}
          </Formik>
        )}

        <VStack
          py={6}
          align="start"
          spacing={4}
          divider={<StackDivider borderColor="gray.300" />}
        >
          {reviews?.map((review: any, index: number) => (
            <AdminReview review={review} key={index} />
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Reviews;
