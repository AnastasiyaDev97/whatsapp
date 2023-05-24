import { Fragment } from 'react';

import style from './Layout.module.scss';

import { useAppSelector } from 'store';
import commonStyles from 'styles/Container.module.scss';
import { ReturnComponentType } from 'types/ReturnComponentType';
import { WithChildrenType } from 'types/WithChildrenType';

type LayoutPropsType = WithChildrenType;

export const Layout = ({ children }: LayoutPropsType): ReturnComponentType => {
  const errorText = useAppSelector(state => state.app.errorText);

  return (
    <Fragment>
      <div className={style.layoutContainer}>
        <main className={style.mainBlock}>
          <div className={commonStyles.container}>{children}</div>
        </main>
        {errorText && <div className={style.defaultError}>{errorText} &#128123;</div>}
      </div>
    </Fragment>
  );
};
