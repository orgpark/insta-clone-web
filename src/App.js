import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './screen/Login';
import Home from './screen/Home';
import SignUp from './screen/SignUp';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { client, isLoggedInVar, darkModeVar } from './apollo';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './styles';
import routes from './routes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route exact path={routes.home}>
                {isLoggedIn ? <Home /> : <Login />}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route>
                <h1>404 Not Found</h1>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
