import { memo, useCallback } from 'react';

import style from './Dialogs.module.scss';

import userAvatar from 'assets/defaultUserIcon.svg';
import { useAppDispatch, useAppSelector } from 'store';
import { setActiveChat } from 'store/reducers/chat';
import { ReturnComponentType } from 'types';

type DialogType = {
  isActive: boolean;
  userPhone: string;
  onSetActiveChatClick: (userPhone: string) => void;
};

export const Dialogs = (): ReturnComponentType => {
  const contacts = useAppSelector(state => state.contacts.contacts);
  const activeChat = useAppSelector(state => state.chat.activeChat);

  const dispatch = useAppDispatch();

  const onSetActiveChatClick = useCallback(
    (userPhone: string) => {
      dispatch(setActiveChat({ activeChat: userPhone }));
    },
    [dispatch],
  );

  return (
    <div className={style.dialogsWrapper}>
      {contacts?.map(contact => (
        <Dialog
          key={contact}
          userPhone={contact}
          isActive={contact === activeChat}
          onSetActiveChatClick={onSetActiveChatClick}
        />
      ))}
    </div>
  );
};

const Dialog = memo(
  ({ userPhone, isActive, onSetActiveChatClick }: DialogType): ReturnComponentType => {
    const onDialogClick = (): void => {
      onSetActiveChatClick(userPhone);
    };

    const dialogWrapperStyle = `${style.dialogWrapper} ${
      isActive ? style.activeDialog : ''
    }`;

    return (
      <div className={dialogWrapperStyle} onClick={onDialogClick}>
        <div className={style.avatarBlock}>
          <div className={style.avatarWrapper}>
            <img src={userAvatar} alt="user avatar" className={style.avatar} />
          </div>
        </div>
        <div className={style.messageBlock}>
          <div className={style.headerMessageBlock}>
            <span className={style.userName}>{userPhone}</span>
            <span className={style.date}>22.04.1997</span>
          </div>
          <span className={style.messageWrapper}>
            <span className={style.messageText}>
              sdfsd dsffsdf eerre er werwer wer werew rewrew rwer werwer erew rwe rwsdfsfs
            </span>
          </span>
        </div>
      </div>
    );
  },
);
