import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import {
  receiveNotificationResponseType,
  sendMessagePayloadType,
  sendMessageResponseType,
} from './types';

const messagesAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    sendMessage: build.mutation<sendMessageResponseType, sendMessagePayloadType>({
      query(data) {
        const URL = new URI(
          `waInstance${process.env.REACT_APP_ID_INSTANCE}/sendMessage/${process.env.REACT_APP_API_TOKEN}`,
        );

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
    }),
    receiveNotification: build.query<receiveNotificationResponseType, void>({
      query() {
        const URL = new URI(
          `waInstance${process.env.REACT_APP_ID_INSTANCE}/receiveNotification/${process.env.REACT_APP_API_TOKEN}`,
        );

        return {
          url: URL.toString(),
        };
      },
    }),
    deleteNotification: build.mutation<{ result: boolean }, { receiptId: number }>({
      query(receiptId) {
        const URL = new URI(
          `waInstance${process.env.REACT_APP_ID_INSTANCE}/deletenotification/${process.env.REACT_APP_API_TOKEN}/${receiptId}`,
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
