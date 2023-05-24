import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import { getStateInstanceResponseType } from './types';

const authAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    getStateInstance: build.query<
      getStateInstanceResponseType,
      { instanse: string; token: string }
    >({
      query({ instanse, token }) {
        const URL = new URI(`waInstance${instanse}/getStateInstance/${token}`);

        return {
          url: URL.toString(),
        };
      },
    }),
  }),
});

export const { useGetStateInstanceQuery, useLazyGetStateInstanceQuery } = authAPI;
