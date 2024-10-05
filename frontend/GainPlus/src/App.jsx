import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/homePage/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import MessageInput from "./components/messages/MessageInput";
import { auth } from "./firebase/firebase";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "./components/protectedRoute";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setFetching(false);
        return;
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, []);

  if (fetching) {
    console.log(user);
    return <h2>Loading...</h2>;
  }

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<SignIn user={user} />} />
          <Route path="/signup" element={<SignUp user={user} />} />
          {/* REMOVE THIS, IT'S FOR MY TESTING ONLY */}
          <Route path="/input" element={<MessageInput />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
