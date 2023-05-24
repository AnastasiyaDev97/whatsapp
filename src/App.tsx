import { useContext, useEffect } from 'react';

import { ErrorBoundary, LoginForm } from 'components';
import { ModalContext } from 'components/Modal/ModalProvider';
import { ReturnUseModalType } from 'hooks/useModal';
import { Main } from 'pages';
import { ReturnComponentType } from 'types/ReturnComponentType';

const App = (): ReturnComponentType => {
  const { openModal } = useContext<ReturnUseModalType>(ModalContext);

  useEffect(() => {
    openModal({ text: 'Please enter your login details', children: <LoginForm /> });
  }, [openModal]);

  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
};

export default App;
