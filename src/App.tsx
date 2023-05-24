import { useContext, useEffect } from 'react';

import { ErrorBoundary, LoginForm } from 'components';
import { ModalContext } from 'components/Modal/ModalProvider';
import { ReturnUseModalType } from 'hooks/useModal';
import { Main } from 'pages';
import { useAppSelector } from 'store';
import { ReturnComponentType } from 'types/ReturnComponentType';

const App = (): ReturnComponentType => {
  const { openModal } = useContext<ReturnUseModalType>(ModalContext);

  const isAuth = useAppSelector(state => state.app.isAuth);

  useEffect(() => {
    if (!isAuth) {
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
