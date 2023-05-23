import { Dialogs, Header } from 'components';
import { ReturnComponentType } from 'types';

export const NavBar = (): ReturnComponentType => {
  return (
    <aside>
      NavBar
      <Header />
      <Dialogs />
    </aside>
  );
};
