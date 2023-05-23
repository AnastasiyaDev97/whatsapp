import style from './Dialogs.module.scss';

import userAvatar from 'assets/defaultUserIcon.svg';
import { ReturnComponentType } from 'types';

export const Dialogs = (): ReturnComponentType => {
  return (
    <div className={style.dialogsWrapper}>
      <Dialog />
      <Dialog />
      <Dialog />
    </div>
  );
};

const Dialog = (): ReturnComponentType => {
  return (
    <div className={style.dialogWrapper}>
      <div className={style.avatarBlock}>
        <div className={style.avatarWrapper}>
          <img src={userAvatar} alt="user avatar" className={style.avatar} />
        </div>
      </div>
      <div className={style.messageBlock}>
        <div className={style.headerMessageBlock}>
          <span className={style.userName}>765756757</span>
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
};
