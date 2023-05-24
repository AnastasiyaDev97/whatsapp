import URI from 'urijs';

import { clientAPI } from '..';
import type { builderType } from '..';

import { getStateInstanceResponseType } from './types';

const authAPI = clientAPI.injectEndpoints({
  endpoints: (build: builderType) => ({
    getStateInstance: build.query<
      getStateInstanceResponseType,
      void /* { instanse: string; token: string } */
    >({
      query(/* { instanse, token } */) {
        const URL = new URI(
          `waInstance${process.env.REACT_APP_ID_INSTANCE}/getStateInstance/${process.env.REACT_APP_API_TOKEN}`,
        );

        return {
          url: URL.toString(),
        };
      },
    }),
  }),
});

export const { useGetStateInstanceQuery, useLazyGetStateInstanceQuery } = authAPI;
