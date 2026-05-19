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
import Analytics from './pages/Analytics.js';
import Settings from './pages/Settings.js';

function App() {
  
  return (
    <Router>
        <div className="App">          
            <Switch>
                  <Route path="/" element={<Login/>} />
                  <Route path="/signup" element={<Signup/>} />
                  <Route path="/home" element={
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
                  <Route path="analytics" element={
                    <Protectedroute>
                      <Analytics />
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
