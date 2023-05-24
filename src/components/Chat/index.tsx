import { FC, memo, useCallback, useEffect, useRef, useState, ChangeEvent } from 'react';

import { Header } from './../Header/index';
import style from './Chat.module.scss';

import { useReceiveNotificationQuery, useSendMessageMutation } from 'api/message';
import sendButtonIcon from 'assets/sendButton.svg';
import { useAppDispatch, useAppSelector } from 'store';
import { ReturnComponentType } from 'types';

export const Chat: FC = () => {
  const activeChat = useAppSelector(state => state.chat.activeChat);
  const instanse = useAppSelector(state => state.app.userInstanse);
  const token = useAppSelector(state => state.app.userToken);

  const {
    data: notification,
    isSuccess: isSuccessReceiveNotification,
    isFetching: isFetchingReceiveNotification,
    isError: isErrorReceiveNotification,
  } = useReceiveNotificationQuery(
    {
      instanse: instanse!,
      token: token!,
    },
    /*   { pollingInterval: 10000, skip: !instanse || !token }, */
  );

  const dispatch = useAppDispatch();

  const [sendMessage, { isLoading, isSuccess, isError }] = useSendMessageMutation();

  const onSendMessageButtonClick = useCallback(
    async (message: string) => {
      if (activeChat && instanse && token) {
        const result = await sendMessage({
          chatId: `${activeChat}@c.us`,
          message,
          instanse,
          token,
        });

        console.log(result);
      }
    },
    [activeChat, instanse, token, sendMessage],
  );

  useEffect(() => {
    if (isSuccessReceiveNotification && notification) {
      console.log(notification, 'not');
    }
  }, [isSuccessReceiveNotification, notification]);

  return (
    <div className={style.chatBlock}>
      <>
        {/*  {status === 'error' && <div>Some error occured. Please refresh the page</div>} */}
        <Header />
        <Messages />
        <AddMessageForm onSendMessageButtonClick={onSendMessageButtonClick} />
      </>
    </div>
  );
};

const Messages: FC = () => {
  /* const messages = useSelector((state: AppStateType) => state.chat.messages); */
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const scrollHandler = (
    e: React.UIEvent<HTMLDivElement, UIEvent> /* : UIEvent<HTMLDivElement, UIEvent> */,
  ): void => {
    const element = e.currentTarget;

    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  /*   useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); */

  return (
    <div className={style.messagesWrapper} /* onScroll={scrollHandler} */>
      <div className={style.topScreen} />
      <div className={style.messagesBlock}>
        <Message />
        <Message />
        <Message />
      </div>
      {/* {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))} */}
      {/*  <div ref={messagesAnchorRef}></div> */}
    </div>
  );
};

const Message: FC = memo((/* { message } */) => {
  return (
    <>
      <div className={style.dateWrapper}>
        <div className={style.dateBadge}>
          <span>45 43 345</span>
        </div>
      </div>
      <div className={`${style.messageWrapper} ${style.endAlignItem}`}>
        <div className={style.messageContainer}>
          <div className={`${style.messageBlock} ${style.ownerMessage}`}>
            <div className={style.messageContent}> Message</div>
            <div className={style.messageDate}>66 66 66</div>
          </div>
        </div>
      </div>
    </>
  );
});

type AddMessageFormType = {
  onSendMessageButtonClick: (message: string) => void;
};

const AddMessageForm = ({
  onSendMessageButtonClick,
}: AddMessageFormType): ReturnComponentType => {
  const [message, setMessage] = useState('ddd');

  const onMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.currentTarget.value);
  };

  const onButtonClick = (): void => {
    onSendMessageButtonClick(message);
  };

  return (
    <footer className={style.footer}>
      <input
        className={style.inputWrapper}
        placeholder="Type message"
        onChange={onMessageChange}
        value={message}
      />
      <div className={style.buttonWrapper}>
        <button className={style.sendButton} onClick={onButtonClick}>
          <img src={sendButtonIcon} alt="send button" />
        </button>
      </div>
    </footer>
  );
};
