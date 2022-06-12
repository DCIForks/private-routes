import React, {
  createContext,
  useContext,
  useState
} from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink
} from "react-router-dom";

// <<< WORKAROUND for deployment to GitHUB
const PATH = "/private-routes" // repository name
const p = {
  home:     `${PATH}/`,
  login:    `${PATH}/login`,
  private1: `${PATH}/private1`,
  private2: `${PATH}/private2`
}
// WORKAROUND >>>


const UserContext = createContext()

const UserProvider = ({children}) => {
  const [ loggedIn, logIn ] = useState("")

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        logIn
      }}
    >
      {children}
    </UserContext.Provider>
  )
 }



function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path={p.home}
            element={<NavLink to={p.login}>Log In</NavLink>}
          />

          <Route
            path={p.login}
            element={<Login />}
          />

          <Route
            path={p.private1}
            element={
              <RequireLogin redirectTo={p.login}>
                <Private
                  text="Private Page #1"
                />
              </RequireLogin >
            }
          />

          <Route
            path={p.private2}
            element={
              <RequireLogin redirectTo={p.login}>
                <Private
                  text="Private Page #2"
                />
              </RequireLogin >
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}



function Menu({hideLogOut}) {
  const { loggedIn } = useContext(UserContext)

  if (loggedIn) {
    if (!hideLogOut) {
      return <ul>
        <li><NavLink to={p.private1}>Private #1</NavLink></li>
        <li><NavLink to={p.private2}>Private #2</NavLink></li>
        <li><NavLink to={p.login}>Log Out</NavLink></li>
      </ul>
    } else {
      return <ul>
        <li><NavLink to={p.private1}>Private #1</NavLink></li>
        <li><NavLink to={p.private2}>Private #2</NavLink></li>
      </ul>
    }
  } else {
    return <p>Not Logged In</p>
  }
}



function RequireLogin ({ children, redirectTo }) {
  const { loggedIn } = useContext(UserContext);
     
  return loggedIn
       ? children
       : <Navigate to={redirectTo} />;
}


function Private({text}) {
  return (
    <div>
      <Menu />
      <h1>{text}</h1>
    </div>
  )
}


function Login() {
  const { loggedIn, logIn } = useContext(UserContext)

  const toggleLogged = () => {
    logIn(!loggedIn)
  }

  return (<div>
    <Menu
      hideLogOut={true}
    />
    <label htmlFor="loggedIn">   
      <input
        type="checkbox"
        name="loggedIn"
        id="loggedIn"
        checked={loggedIn}
        onChange={toggleLogged}
      />
      Pretend that we are logged in
    </label>
  </div>)
}


export default App;