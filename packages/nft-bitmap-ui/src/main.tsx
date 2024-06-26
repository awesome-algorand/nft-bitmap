import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from "./pages/App.tsx";
import './style.css'
import {RouterProvider, createBrowserRouter} from "react-router-dom";

import {Providers} from "./layout/Providers.tsx";

// Make KMD Headless
import {KmdWallet} from "@txnlab/use-wallet-react";
import {ErrorPage} from "./pages/Error.tsx";

//@ts-expect-error, this is a hack to make the wallet headless
KmdWallet.prototype.getPassword = function getPassword(){
    //@ts-expect-error, just use the default password of ''
    return this.password
}
const router = createBrowserRouter(
    [
        {
          path: '/',
          element: <App/>,
          errorElement: <ErrorPage />,
        },
        {
            path: "/image/:id",
            element: <App/>,
            errorElement: <ErrorPage />,
        }
    ]
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Providers>
        <RouterProvider router={router}/>
      </Providers>
  </React.StrictMode>,
)
