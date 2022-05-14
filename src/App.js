import './App.css';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route exact path="/login" element={<LoginForm />}></Route>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/signup" element={<SignupForm/>}></Route>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
