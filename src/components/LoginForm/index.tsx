import { useContext } from 'react';

import { useFormik } from 'formik';

import { useLazyGetStateInstanceQuery } from 'api/auth';
import { useSendMessageMutation } from 'api/message';
import { SuperButton, UniversalInput } from 'components';
import { ModalContext } from 'components/Modal/ModalProvider';
import { ReturnUseModalType } from 'hooks/useModal';
import { ReturnComponentType } from 'types';

export const LoginForm = (): ReturnComponentType => {
  const [fetchStatus, result] = useLazyGetStateInstanceQuery();

  const { modalContent, closeModal, modal } =
    useContext<ReturnUseModalType>(ModalContext);

  const formik = useFormik({
    initialValues: {
      instanse: '',
      token: '',
    },
    validate: values => {
      const errors = {} as { instanse: string; token: string };

      if (!values.instanse) {
        errors.instanse = 'Required';
      }
      if (!values.token) {
        errors.token = 'Required';
      }

      return errors;
    },
    onSubmit: async values => {
      try {
        /*  if (result.status === 200) {
          openModal({
            title: 'success!',
            text: 'You have successfully subscribed to the email newsletter',
          });
        } else {
          openModal({
            text: 'Something went wrong :(',
          });
        } */
      } catch (err) {
        /* openModal({
          text: 'Something went wrong :(',
        }); */
      } finally {
        /* formik.resetForm(); */
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <UniversalInput
        placeholder="IdInstance"
        validationErr={(formik.touched.instanse && formik.errors.instanse) || ''}
        formikProps={formik.getFieldProps('instanse')}
      />
      <UniversalInput
        placeholder="ApiTokenInstance"
        validationErr={(formik.touched.token && formik.errors.token) || ''}
        formikProps={formik.getFieldProps('token')}
      />
      <SuperButton /* onClick={closeModal} */ type="submit">Close</SuperButton>
    </form>
  );
};
