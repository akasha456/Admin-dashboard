import './App.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import "./sb-admin-2.min.css";
import Dashboard from './Dashboard';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Userlist from './Userlist';
import Userlist2 from './Userlist2';
import Portal from './Portal';
import UserCreate from './UserCreate';
import UserCreate2 from './UserCreate2';
import UserView from './UserView';
import UserView2 from './UserView2';
import UserEdit from './UserEdit';
import UserEdit2 from './UserEdit2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root path to /portal/user-list */}
        <Route path='/' element={<Navigate to="/portal/user-list" />} />
        <Route path='/portal' element={<Portal />}>
          <Route index element={<Navigate to="user-list" />} /> {/* Optional if you also want to set /portal default */}
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='user-list' element={<Userlist />} />
          <Route path='user-list2' element={<Userlist2 />} />
          <Route path='create-user' element={<UserCreate />} />
          <Route path='create-user2' element={<UserCreate2 />} />
          <Route path='user-view/:id' element={<UserView />} />
          <Route path='event-view/:id' element={<UserView2 />} />
          <Route path='user-edit/:id' element={<UserEdit />} />
          <Route path='event-edit2/:id' element={<UserEdit2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
