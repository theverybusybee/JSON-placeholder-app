import { StrictMode } from 'react';
import App from './views/App';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}></Route>
      <Route
        path="*"
        element={
          <div style={{ color: '#fff' }}>This route does not exist 404</div>
        }
      />
    </>,
  ),
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
