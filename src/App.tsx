import { ErrorBoundary, Layout } from 'components';
import { ReturnComponentType } from 'types/ReturnComponentType';

const App = (): ReturnComponentType => {
  return (
    <ErrorBoundary>
      <Layout />
    </ErrorBoundary>
  );
};

export default App;
