import { useState, useCallback } from 'react';

import { WithChildrenType } from 'types';

export type ModalContentType = {
  title?: string;
  text: string;
} & WithChildrenType;

export type ReturnUseModalType = {
  modal: boolean;
  openModal: (content: ModalContentType) => void;
  closeModal: () => void;
  modalContent: ModalContentType;
};

export const useModal = (): ReturnUseModalType => {
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>({
    title: '',
    text: '',
    children: null,
  });

  const closeModal = useCallback(() => {
    setModal(false);
  }, []);

  const openModal = useCallback((content: ModalContentType): void => {
    setModal(true);
    setModalContent(content);
  }, []);

  return { modal, closeModal, openModal, modalContent };
};
