import { useContext, useEffect } from 'react';

import { ErrorBoundary, LoginForm } from 'components';
import { ModalContext } from 'components/Modal/ModalProvider';
import { ReturnUseModalType } from 'hooks/useModal';
import { Main } from 'pages';
import { useAppDispatch, useAppSelector } from 'store';
import { setIsAuth, setUserInstanse, setUserToken } from 'store/reducers/app';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { loadState } from 'utils/localStorage';

const App = (): ReturnComponentType => {
  const { openModal } = useContext<ReturnUseModalType>(ModalContext);

  const isAuth = useAppSelector(state => state.app.isAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (loadState('isAuth') && loadState('userToken') && loadState('userInstanse')) {
      dispatch(setIsAuth(true));
      dispatch(setUserToken({ userToken: loadState('userToken')! }));
      dispatch(setUserInstanse({ userInstanse: loadState('userInstanse')! }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth || !loadState('isAuth')) {
      openModal({ text: 'Please enter your login details', children: <LoginForm /> });
    }
  }, [openModal, isAuth]);

  if (!isAuth) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
};

export default App;
