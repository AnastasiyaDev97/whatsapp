export type getChatHistoryPayloadType = {
  chatId: string;
  counter?: number;
};

export type getChatHistoryResponseType = {
  type: 'outgoing' | 'incoming';
  timestamp: number;
  idMessage: string;
  statusMessage: string;
  typeMessage: string;
  chatId: string;
  senderId?: string;
  senderName?: string;
  textMessage?: string;
};
