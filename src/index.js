import React, {
  createContext,
  useContext,
  useState
} from 'react'
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink
} from "react-router-dom";



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
            path="/"
            element={<NavLink to="/login">Log In</NavLink>}
          />
          <Route
            path="/"
            element={<NavLink to="/login">Log In</NavLink>}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/private1"
            element={
              <RequireLogin redirectTo="/login">
                <Private
                  text="Private Page #1"
                />
              </RequireLogin >
            }
          />

          <Route
            path="/private2"
            element={
              <RequireLogin redirectTo="/login">
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
        <li><NavLink to="/private1">Private #1</NavLink></li>
        <li><NavLink to="/private2">Private #2</NavLink></li>
        <li><NavLink to="/login">Log Out</NavLink></li>
      </ul>
    } else {
      return <ul>
        <li><NavLink to="/private1">Private #1</NavLink></li>
        <li><NavLink to="/private2">Private #2</NavLink></li>
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

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
