import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';

import style from './Chat.module.scss';

import { useGetChatHistoryMutation } from 'api/chatHistory';
import {
  useDeleteNotificationMutation,
  useReceiveNotificationQuery,
  useSendMessageMutation,
} from 'api/message';
import sendButtonIcon from 'assets/sendButton.svg';
import { Header } from 'components';
import { useAppDispatch, useAppSelector } from 'store';
import { setErrorText } from 'store/reducers/app';
import { Nullable, ReturnComponentType } from 'types';

type MessagesPropsType = {
  messages: MessageType[];
};

type MessageType = {
  type: 'outgoing' | 'incoming';
  timestamp: number;
  idMessage: string;
  textMessage: string;
};

export const Chat: FC = () => {
  const activeChat = useAppSelector(state => state.chat.activeChat);
  const instanse = useAppSelector(state => state.app.userInstanse);
  const token = useAppSelector(state => state.app.userToken);

  const dispatch = useAppDispatch();

  const chatId = `${activeChat}@c.us`;

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState('');

  const {
    data: notification,
    isSuccess: isSuccessReceiveNotification,
    isError: isErrorReceiveNotification,
  } = useReceiveNotificationQuery(
    {
      instanse: instanse!,
      token: token!,
    },
    { pollingInterval: 10000, skip: !instanse || !token },
  );

  const [deleteNotification, { isError: isErrordeleteNotification }] =
    useDeleteNotificationMutation();

  const [sendMessage, { data: sendMessageData, isError: isErrorSendMessage }] =
    useSendMessageMutation();

  const [
    getChatHistory,
    { data: chatHistory, isSuccess: isSuccessChatHistory, isError: isErrorChatHistory },
  ] = useGetChatHistoryMutation();

  const onSendMessageButtonClick = useCallback(async () => {
    try {
      if (activeChat && instanse && token) {
        await sendMessage({
          chatId,
          message,
          instanse,
          token,
        });
        setMessages(state => [
          ...state,
          {
            type: 'outgoing',
            timestamp: Math.floor(new Date().getTime() / 1000),
            idMessage: `${Math.random()}`,
            textMessage: message,
          },
        ]);
      }
    } catch (err) {
      dispatch(setErrorText({ errorText: 'Something went wrong' }));
    }
  }, [chatId, instanse, token, sendMessage, activeChat, dispatch, message]);

  useEffect(() => {
    if (messages.length === 0 && activeChat && instanse && token) {
      getChatHistory({ chatId, instanse, token });
    }
  }, [messages, activeChat, instanse, token, chatId, getChatHistory]);

  useEffect(() => {
    if (isSuccessReceiveNotification && notification && instanse && token) {
      getChatHistory({ chatId, instanse, token });
      deleteNotification({ receiptId: notification?.receiptId, instanse, token });
    }
  }, [
    isSuccessReceiveNotification,
    notification,
    instanse,
    token,
    deleteNotification,
    chatId,
    getChatHistory,
  ]);

  useEffect(() => {
    if (isSuccessChatHistory && chatHistory) {
      setMessages([...chatHistory].reverse());
    }
  }, [chatHistory, isSuccessChatHistory]);

  useEffect(() => {
    if (
      isErrorReceiveNotification &&
      isErrordeleteNotification &&
      isErrorSendMessage &&
      isErrorChatHistory
    ) {
      dispatch(setErrorText({ errorText: 'Something went wrong' }));
    }
  }, [
    isErrorReceiveNotification,
    isErrordeleteNotification,
    isErrorSendMessage,
    isErrorChatHistory,
    dispatch,
  ]);

  return (
    <div className={style.chatBlock}>
      <>
        <Header />
        {activeChat ? (
          <>
            <Messages messages={messages} />
            <AddMessageForm
              onSendMessageButtonClick={onSendMessageButtonClick}
              setMessage={setMessage}
              message={message}
            />
          </>
        ) : null}
      </>
    </div>
  );
};

const Messages = memo(({ messages }: MessagesPropsType): ReturnComponentType => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  const commonDateOptions = { weekday: 'short', day: 'numeric', month: 'short' } as const;
  const timeOptions = { hour: 'numeric', minute: 'numeric' } as const;

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const element = e.currentTarget;

    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      !isAutoScroll && setIsAutoScroll(true);
    } else {
      isAutoScroll && setIsAutoScroll(false);
    }
  };

  useEffect(() => {
    if (isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAutoScroll]);

  let messagesDate: string;

  return (
    <div className={style.messagesWrapper} onScroll={scrollHandler}>
      <div className={style.topScreen} />
      <div className={style.messagesBlock}>
        {messages?.reverse()?.map(({ idMessage, textMessage, type, timestamp }, i) => {
          const defaultMessageDate = new Date(timestamp * 1000);
          const formattedMessageDate = defaultMessageDate?.toLocaleDateString(
            'en-GB',
            commonDateOptions,
          );
          const formattedMessageTime = defaultMessageDate?.toLocaleTimeString(
            'en-GB',
            timeOptions,
          );

          if (messagesDate !== formattedMessageDate) {
            messagesDate = formattedMessageDate;
          }

          const isMessageDateShown = i === 0 || messagesDate !== formattedMessageDate;

          return (
            <Message
              key={idMessage}
              textMessage={textMessage}
              type={type}
              formattedMessageDate={isMessageDateShown ? formattedMessageDate : null}
              formattedMessageTime={formattedMessageTime}
            />
          );
        })}
      </div>

      <div ref={messagesAnchorRef}></div>
    </div>
  );
});

type MessagePropsType = {
  textMessage: string;
  type: 'outgoing' | 'incoming';
  formattedMessageDate: Nullable<string>;
  formattedMessageTime: string;
};

const Message = memo(
  ({
    textMessage,
    type,
    formattedMessageDate,
    formattedMessageTime,
  }: MessagePropsType) => {
    const messageWrapperClassName = `${style.messageWrapper} ${
      type === 'incoming' ? style.startAlignItem : style.endAlignItem
    }`;

    const messageContentClassName = `${style.messageBlock} ${
      type === 'incoming' ? style.userMessage : style.ownerMessage
    }`;

    return (
      <>
        <div className={style.dateWrapper}>
          {formattedMessageDate && (
            <div className={style.dateBadge}>
              <span>{formattedMessageDate}</span>
            </div>
          )}
        </div>
        <div className={messageWrapperClassName}>
          <div className={style.messageContainer}>
            <div className={messageContentClassName}>
              <div className={style.messageContent}>{textMessage}</div>
              <div className={style.messageDate}>{formattedMessageTime}</div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

type AddMessageFormType = {
  onSendMessageButtonClick: (message: string) => void;
  message: string;
  setMessage: (message: string) => void;
};

const AddMessageForm = ({
  onSendMessageButtonClick,
  message,
  setMessage,
}: AddMessageFormType): ReturnComponentType => {
  const onMessageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.currentTarget.value);
  };

  const onButtonClick = (): void => {
    onSendMessageButtonClick(message);
    setMessage('');
  };

  const onKeyPressSendMessage = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <footer className={style.footer}>
      <input
        className={style.inputWrapper}
        placeholder="Type message"
        onChange={onMessageChange}
        value={message}
        onKeyPress={onKeyPressSendMessage}
      />
      <div className={style.buttonWrapper}>
        <button className={style.sendButton} onClick={onButtonClick}>
          <img src={sendButtonIcon} alt="send button" />
        </button>
      </div>
    </footer>
  );
};
