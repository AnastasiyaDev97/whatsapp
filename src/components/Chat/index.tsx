import { FC, memo, useEffect, useRef, useState } from 'react';

import { Header } from './../Header/index';
import style from './Chat.module.scss';

import sendButtonIcon from 'assets/sendButton.svg';
import { ReturnComponentType } from 'types';

export const Chat: FC = () => {
  /* const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []); */

  return (
    <div className={style.chatBlock}>
      <>
        {/*  {status === 'error' && <div>Some error occured. Please refresh the page</div>} */}
        <Header />
        <Messages />
        <AddMessageForm />
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

const AddMessageForm: React.FC = (): ReturnComponentType => {
  /*   const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  }; */

  return (
    <footer className={style.footer}>
      <input className={style.inputWrapper} placeholder="Type message" />
      <div className={style.buttonWrapper}>
        <button className={style.sendButton}>
          <img src={sendButtonIcon} alt="send button" />
        </button>
      </div>
    </footer>
  );
};
