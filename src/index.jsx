import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './styles/index.scss'
import { store } from './store'
import { routers } from './routes/root';

const browserRouter = createBrowserRouter(routers, {
  basename: process.env.PUBLIC_URL || '/'
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  </React.StrictMode>
);
