
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router,Routes,Route, useNavigate} from "react-router-dom";
import Product from './Components/Product';
import AddProduct from './Components/AddProduct';
import UpdateProduct from './Components/UpdateProduct';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import PrivateComponent from './Components/PrivateComponent';

function App() {
  // const navigate=useNavigate();
  // if(localStorage.getItem("token")){
  //   navigate("/")
  // }
  
  return (
  <>
  <Router>
  <Navbar/>
  <Routes>
    {/* <Route element={<PrivateComponent/>}> */}
    <Route exact path="/" element={<Product/>}></Route>
    <Route exact path="/addproduct" element={<AddProduct/>}></Route>
    <Route exact path="/updateproduct/:id" element={<UpdateProduct/>}></Route>
    <Route exact path="/profile" element={<Profile/>}></Route>
    {/* </Route> */}

    <Route exact path="/signup" element={<Signup/>}></Route>
    <Route exact path="/login" element={<Login/>}></Route>




  </Routes>
  </Router>
  


    </>
  );
}

export default App;
