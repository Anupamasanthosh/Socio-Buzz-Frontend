import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Account from "./Pages/Account";
import FriendAccount from './Pages/FriendAccount'
import Notifications from "./Pages/Notifications";
import AccountSaved from "./components/Account/AccountSaved/AccountSaved";
import Chat from "./Pages/Chat";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/account" element={<Account/>} />
          <Route path="/saved" element={<AccountSaved/>} />
          <Route path="/friendAccount/:id" element={<FriendAccount />} />
          <Route path="/notification" element={<Notifications />}/>
          <Route path="/messages"  element={<Chat />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
