import style from './Main.module.scss';

import { Chat, Layout, NavBar } from 'components';
import { ReturnComponentType } from 'types';

export const Main = (): ReturnComponentType => {
  return (
    <Layout>
      <div className={style.contentContainer}>
        <NavBar />
        {/* <Chat /> */}
      </div>
    </Layout>
  );
};
