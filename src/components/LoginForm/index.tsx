import { useContext } from 'react';

import { useFormik } from 'formik';

import style from './LoginForm.module.scss';

import { useLazyGetStateInstanceQuery } from 'api/auth';
import { SuperButton, UniversalInput } from 'components';
import { ModalContext } from 'components/Modal/ModalProvider';
import { ReturnUseModalType } from 'hooks/useModal';
import { useAppDispatch } from 'store';
import {
  setErrorText,
  setIsAuth,
  setUserInstanse,
  setUserToken,
} from 'store/reducers/app';
import { ReturnComponentType } from 'types';
import { saveState } from 'utils/localStorage';

export const LoginForm = (): ReturnComponentType => {
  const [fetchStatus] = useLazyGetStateInstanceQuery();

  const dispatch = useAppDispatch();

  const { closeModal } = useContext<ReturnUseModalType>(ModalContext);

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
        const result = await fetchStatus({
          instanse: values.instanse,
          token: values.token,
        });

        if (result?.data?.stateInstance === 'authorized') {
          dispatch(setIsAuth(true));
          saveState('true', 'isAuth');
          dispatch(setUserToken({ userToken: values.token }));
          saveState(`${values.token}`, 'userToken');
          dispatch(setUserInstanse({ userInstanse: values.instanse }));
          saveState(`${values.instanse}`, 'userInstanse');
          closeModal();
        } else {
          setErrorText({
            errorText: 'Something went wrong :(',
          });
        }
      } catch (err) {
        setErrorText({
          errorText: 'Something went wrong :(',
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={style.formBlock}>
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
      <SuperButton type="submit">Login</SuperButton>
    </form>
  );
};
