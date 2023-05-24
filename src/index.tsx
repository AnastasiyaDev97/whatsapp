import React from 'react';

import ReactDOM from 'react-dom/client';
import './style.scss';
import { Provider } from 'react-redux';

import App from './App';

import { ModalProvider } from 'components/Modal/ModalProvider';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
);
