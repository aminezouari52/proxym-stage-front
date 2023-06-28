import {
  UseToastOptions,
  createStandaloneToast,
  // RenderProps,
  // Status,
  ToastId,
} from '@chakra-ui/toast';
import { ToastPosition, ToastStatus } from 'models/toast';
import { useTranslation } from 'react-i18next';

const DEFAULT_TOAST_DURATION = 3000;
const defaultOptions = {
  position: ToastPosition.TOP,
  status: ToastStatus.ERROR,
  duration: DEFAULT_TOAST_DURATION,
  isClosable: true,
} as const;

let currentToast: ToastId | undefined;

// Maybe refactor later
const getToastUtils = () => {
  const id = Math.random();
  return { id };
};

const CreateOutsideToast = ({
  description,
  title = 'Error',
  status = ToastStatus.ERROR,
  ...options
}: UseToastOptions) => {
  const { toast } = createStandaloneToast();
  const { id } = getToastUtils();

  if (currentToast) {
    toast.close(currentToast);
  }

  currentToast = toast({
    ...defaultOptions,
    ...options,
    description: <Description description={description} />,
    title,
    status,
    id,
  });
};

const Description = ({ description }: any) => {
  const { t } = useTranslation();
  let translatedDescription;

  if (description && typeof description === 'string') {
    translatedDescription = t(description);
  } else {
    translatedDescription = description;
  }
  return <>{translatedDescription}</>;
};

export default CreateOutsideToast;
// export const notImplemented = () => {
//   const description = i18n.t('COMMON.NOT_IMPLEMENTED');
//   const title = i18n.t('COMMON.INFO');
//   CreateOutsideToast({ description, title, status: ToastStatus.INFO });
// };
