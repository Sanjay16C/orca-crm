import './App.css';
import Login from './pages/auth/Login.js';
import { BrowserRouter as Router , Route , Routes as Switch } from 'react-router-dom';
import Signup from './pages/auth/Signup.js';
import Home from './components/Home.js';
import NotFound from './pages/auth/Notfound.js';
import Protectedroute from './components/Protectedroute.js';
import Notes from './pages/Notes.js';
import Customers from './pages/Customers.js';
import Dashboard from './pages/Dashboard.js';
import Calendar from './pages/Calendar.js';
import Team from './pages/Team.js';
import Tasks from './pages/Tasks.js';
import Settings from './pages/Settings.js';
import ForgotPass from './pages/auth/ForgotPass.js';
import ResetPass from './pages/auth/ResetPass.js';
import OauthSuccess from './pages/auth/OauthSuccess.js';
import VerifyMail from './pages/auth/verifyMail.js';
import Workspaces from './pages/Workspaces.js';

function App() {

  const isMobile = window.innerWidth < 768;
  if(isMobile) return (
    <div className="mobile-warning">
      <h1>Oops ...</h1>
      <p>Orca CRM is a Desktop Only Software.</p>
      <p>It is not compatible on this device.</p>
    </div>
  );
  
  return (
    <Router>
        <div className="App">          
            <Switch>
                  <Route path="/" element={<Login/>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/forgot-password" element={<ForgotPass />} />
                  <Route path="/reset-password/:token" element={<ResetPass/>} />
                  <Route path="/oauth-success" element={<OauthSuccess/>}/>
                  <Route path="/verify-mail/:token" element={<VerifyMail />} />
                  <Route path="/workspaces" element={
                    <Protectedroute>
                      <Workspaces/>
                    </Protectedroute>
                  } />
                  <Route path="/workspace/:workspaceId" element={
                    <Protectedroute>
                        <Home/>
                    </Protectedroute>
                    }>
                  <Route index element={
                    <Protectedroute>
                      <Customers />
                    </Protectedroute>
                  }/>
                  <Route path="dashboard" element={
                    <Protectedroute>
                      <Dashboard />
                    </Protectedroute>
                  }/>
                  <Route path="calendar" element={
                    <Protectedroute>
                      <Calendar />
                    </Protectedroute>
                  }/>
                  <Route path="team" element={
                    <Protectedroute>
                      <Team />
                    </Protectedroute>
                  }/>
                  <Route path="tasks" element={
                    <Protectedroute>
                      <Tasks />
                    </Protectedroute>
                  }/>
                  <Route path="settings" element={
                    <Protectedroute>
                      <Settings />
                    </Protectedroute>
                  }/>
                  <Route path="customer/:id/notes" element={
                    <Protectedroute>
                      <Notes />
                    </Protectedroute>
                  }/>
                  </Route>
                  
                  <Route path="*" element={<NotFound/>} />
            </Switch>
        </div>
        
    </Router>
    
  );
}

export default App;
