export type sendMessagePayloadType = {
  chatId: string;
  message: string;
  quotedMessageId?: string;
  archiveChat?: boolean;
  linkPreview?: boolean;
} & PayloadType;

export type sendMessageResponseType = {
  idMessage: string;
};

export type receiveNotificationResponseType = {
  receiptId: number;
  body: {
    textMessage: string;
    isTemplateMessage: boolean;
    timestamp: number;
    messageData: { extendedTextMessageData: { text: string } };
  };
};

export type PayloadType = {
  instanse: string;
  token: string;
};
