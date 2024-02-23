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

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}></Route>
      <Route path="*" element={<div>This route does not exist 404</div>} />
    </>,
  ),
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
