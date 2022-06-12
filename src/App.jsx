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
  private:  `${PATH}/private*`,
  private1: `${PATH}/private/1`,
  private2: `${PATH}/private/2`
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
          {/* PUBLIC ROUTES */}
          <Route
            path={p.home}
            element={<Page text="Home"/>}
          />

          <Route
            path={p.login}
            element={<Login />}
          />

          {/* PRIVATE ROUTES WRAPPED IN RequireLogin > Routes */}
          <Route
            path={p.private}
            element={
              <RequireLogin
                redirectTo={p.login}
              >
                <Routes>
                  {/* It doesn't matter how many slashes you use... */}
                  <Route
                    path={"///1"}
                    element={<Page text="Private Page #1"/>}
                  />

                  {/* ... or how few */}
                  <Route
                    path={"2"}
                    element={<Page text="Private Page #2"/>}
                  />
                </Routes>
              </RequireLogin>
            }
          />

          {/* CATCHALL FOR PATHS NOT LISTED ANYWHERE */}
          <Route path="*" element={
            <Navigate
              to={p.home}
              replace={true}
            />} />
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
        <li><NavLink to={p.home + "/unknown"}>Unknown</NavLink></li>
        <li><NavLink to={p.login}>Log Out</NavLink></li>
      </ul>
    } else {
      return <ul>
        <li><NavLink to={p.private1}>Private #1</NavLink></li>
        <li><NavLink to={p.private2}>Private #2</NavLink></li>
        <li><NavLink to={p.home + "/unknown"}>Unknown</NavLink></li>
      </ul>
    }
  } else if (!hideLogOut) {
    return <ul>
        <li><NavLink to={p.home + "/unknown"}>Unknown</NavLink></li>
        <li><NavLink to={p.login}>Log In</NavLink></li>
      </ul>
  } else {
    return <ul>
        <li><NavLink to={p.home + "/unknown"}>Unknown</NavLink></li>
      </ul>
  }
}



function RequireLogin ({ children, redirectTo }) {
  const { loggedIn } = useContext(UserContext);

  return loggedIn
       ? children
       : <Navigate to={redirectTo} />;
}


function Page({text}) {
  const { loggedIn } = useContext(UserContext);

  const status = `${loggedIn ? "Logged In" : "Logged Out"}`

  return (
    <div>
      <strong>{status}</strong>
      <Menu />
      <h1>{text}</h1>
    </div>
  )
}


function Login() {
  const { loggedIn, logIn } = useContext(UserContext)

  const status = `${loggedIn ? "Logged In" : "Logged Out"}`

  const toggleLogged = () => {
    logIn(!loggedIn)
  }

  return (<div>
    <strong>{status}</strong>
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