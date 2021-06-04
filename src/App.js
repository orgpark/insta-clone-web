import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './screen/Login';
import Home from './screen/Home';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar, darkModeVar } from './apollo';

import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './styles';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route path="/potato">
            <h1>Potato</h1>
          </Route>
          <Route>
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
