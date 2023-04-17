import { Route, Routes } from "react-router-dom";
import Albums from "./pages/Albums/Albums";
import Dashboard from "./pages/Dashboard/Dashboard";
import LogIn from "./pages/LogIn/LogIn";
import Todos from "./pages/Todos/Todos";
import Users from "./pages/Users/Users";
import { RequireAuth } from "./utils/RequireAuth";

function App() {
  return (
    <div className="App bg-[#000000]">
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route path="users" element={<Users />}/>
          <Route path="todos" element={<Todos />}/>
          <Route path="albums" element={<Albums />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
