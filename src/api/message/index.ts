import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import {
  PayloadType,
  receiveNotificationResponseType,
  sendMessagePayloadType,
  sendMessageResponseType,
} from './types';

const messagesAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    sendMessage: build.mutation<sendMessageResponseType, sendMessagePayloadType>({
      query({ instanse, token, ...data }) {
        const URL = new URI(`waInstance${instanse}/sendMessage/${token}`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
    }),
    receiveNotification: build.query<receiveNotificationResponseType, PayloadType>({
      query({ instanse, token }) {
        const URL = new URI(`waInstance${instanse}/receiveNotification/${token}`);

        return {
          url: URL.toString(),
        };
      },
    }),
    deleteNotification: build.mutation<
      { result: boolean },
      { receiptId: number } & PayloadType
    >({
      query({ receiptId, instanse, token }) {
        const URL = new URI(
          `waInstance${instanse}/deletenotification/${token}/${receiptId}`,
        );

        return {
          url: URL.toString(),
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useDeleteNotificationMutation,
  useReceiveNotificationQuery,
  useSendMessageMutation,
} = messagesAPI;
