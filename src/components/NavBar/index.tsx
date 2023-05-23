import style from './NavBar.module.scss';

import { Dialogs, Header } from 'components';
import { ReturnComponentType } from 'types';

export const NavBar = (): ReturnComponentType => {
  return (
    <aside className={style.navbarBlock}>
      <Header />
      <Dialogs />
    </aside>
  );
};
