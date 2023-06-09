import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import { getChatHistoryPayloadType, getChatHistoryResponseType } from './types';

import { PayloadType } from 'api/message/types';

const chatHistoryAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    getChatHistory: build.mutation<
      getChatHistoryResponseType[],
      getChatHistoryPayloadType & PayloadType
    >({
      query({ instanse, token, ...data }) {
        const URL = new URI(`waInstance${instanse}/getChatHistory/${token}`);

        return {
          url: URL.toString(),
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const { useGetChatHistoryMutation } = chatHistoryAPI;
