import React, { useState } from "react";
import { CssBaseline } from "@material-ui/core";
import LoginPage from "./routes/login/LoginPage";
import AppBar from "./components/AppBar";
import IntlProvider from "./i18n/IntlProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Categories from "./routes/categories/Categories";
import Dashboard from "./routes/dashboard/Dashboard";
import AuthRoute from "./components/AuthRoute";
import SignUp from "./routes/signup/SignUp";
import { UsersProvider } from "./components/UserContext/UserContextProvider";
import Records from "./routes/records/Records";
import { RecordsProvider } from "./components/RecordsContext/RecordsContextProvider";
import { NotificationsProvider } from "./components/Notifications/NotificationsProvider";
import AppContent from "./components/AppContent";

const locale = navigator.language;

const App: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <IntlProvider locale={locale}>
      <CssBaseline />
      <NotificationsProvider>
        <UsersProvider>
          <RecordsProvider>
            <Router>
              <AppBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
              <AppContent drawerOpen={drawerOpen}>
                <Switch>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                  <AuthRoute path="/categories">
                    <Categories />
                  </AuthRoute>
                  <AuthRoute path="/records">
                    <Records />
                  </AuthRoute>
                  <AuthRoute path="/">
                    <Dashboard />
                  </AuthRoute>
                </Switch>
              </AppContent>
            </Router>
          </RecordsProvider>
        </UsersProvider>
      </NotificationsProvider>
    </IntlProvider>
  );
};

export default App;
