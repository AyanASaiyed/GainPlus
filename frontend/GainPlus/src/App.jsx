import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/homePage/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import MessageInput from "./components/messages/MessageInput";
import { auth } from "./firebase/firebase";
import user from "./Pages/SignIn";

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={auth ? <Home /> : <SignIn/>} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* REMOVE THIS, ITS FOR MY TESTING ONLY*/}
          <Route path="/input" element={<MessageInput />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
