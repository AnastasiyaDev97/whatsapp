import { createContext } from 'react';

import { Modal } from 'components';
import { ReturnUseModalType, useModal } from 'hooks/useModal';
import { ReturnComponentType, WithChildrenType } from 'types';

const ModalContext = createContext<ReturnUseModalType>({} as ReturnUseModalType);
const { Provider } = ModalContext;

const ModalProvider = ({ children }: WithChildrenType): ReturnComponentType => {
  const { modal, openModal, closeModal, modalContent } = useModal();

  return (
    <Provider value={{ modal, openModal, closeModal, modalContent }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
