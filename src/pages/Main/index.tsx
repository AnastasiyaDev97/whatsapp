import { useContext, useEffect } from 'react';

import style from './Main.module.scss';

import { Chat, Layout, NavBar, PhoneInputForm } from 'components';
import { ModalContext } from 'components/Modal/ModalProvider';
import { ReturnUseModalType } from 'hooks/useModal';
import { useAppSelector } from 'store';
import { ReturnComponentType } from 'types';

export const Main = (): ReturnComponentType => {
  const { openModal } = useContext<ReturnUseModalType>(ModalContext);

  const contacts = useAppSelector(state => state.contacts.contacts);

  useEffect(() => {
    if (contacts?.length < 1) {
      openModal({ text: 'Type phone number', children: <PhoneInputForm /> });
    }
  }, [openModal, contacts]);

  return (
    <Layout>
      <div className={style.contentContainer}>
        <NavBar />
        <Chat />
      </div>
    </Layout>
  );
};
