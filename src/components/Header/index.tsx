import { Fragment } from 'react';

import style from './Header.module.scss';

import { ReturnComponentType } from 'types/ReturnComponentType';

export const Header = (): ReturnComponentType => {
  return (
    <Fragment>
      <header className={style.headerBlock}>Header</header>
    </Fragment>
  );
};
