import { createBrowserRouter } from "react-router-dom";
import { AppContextProvider } from "../core/state/AppContext";
import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";
import { Guard } from "./guards/AuthGuard";
import TransactionsContainer from "../containers/TransactionsContainer";
import DepositsContainer from "../containers/DepositsContainer";
import WithDrawContainer from "../containers/WithDrawContainer";
import DashboardContainer from "../containers/DashboardContainer";
import PurchaseContainer from "../containers/PurchaseContainer";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AppContextProvider>
        <LoginContainer />
      </AppContextProvider>
    ),
  },
  {
    path: "/register",
    element: (
      <AppContextProvider>
        <RegisterContainer />
      </AppContextProvider>
    ),
  },
  {
    path: "/transacciones",
    element: (
      <AppContextProvider>
        <Guard>
          <TransactionsContainer />
        </Guard>
      </AppContextProvider>
    ),
  },
  {
    path: '/retiros',
    element: (
      <AppContextProvider>
      <Guard>
        <WithDrawContainer />
      </Guard>
    </AppContextProvider>
    )
  },
  {
    path: '/depositos',
    element: (
      <AppContextProvider>
      <Guard>
        <DepositsContainer />
      </Guard>
    </AppContextProvider>
    )
  },
  {
    path: '/compras',
    element: (
      <AppContextProvider>
      <Guard>
        <PurchaseContainer />
      </Guard>
    </AppContextProvider>
    )
  },
  { 
    path: '/inicio',
    element: (
      <AppContextProvider>
      <Guard>
        <DashboardContainer />
      </Guard>
    </AppContextProvider>
    )
  }
]);
