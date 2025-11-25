import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createHashRouter, RouterProvider } from "react-router-dom";

// Components
import Payments from './Components/Payment/Payments';
import Schedules from './Components/Schedule/Schedules';
import Staffs from './Components/Staff/staffs';
import Books from './Components/Book/Books';
import Passengers from './Components/Passenger/Passengers';
import Checks from './Components/Check/Checks';
import Registers from './Components/Register/Registers';

// MUI Date Picker
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const router = createHashRouter([
  { path: "/", element: <App /> },
  { path: "/payments", element: <Payments /> },
  { path: "/schedules", element: <Schedules /> },
  { path: "/staffs", element: <Staffs /> },
  { path: "/books", element: <Books /> },
  { path: "/passengers", element: <Passengers /> },
  { path: "/checks", element: <Checks /> },
  { path: "/registers", element: <Registers /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <RouterProvider router={router} />
  </LocalizationProvider>
);
