import React from "react";
import Navbar from "./navbar/Navbar";
import Login from "./components/Login";
import Section from "./home/section/Section";
import Signup from "./components/Signup";
import Newpassword from "./components/newpassword/Newpassword";
import Footer from "./home/footer/Footer";
import Footer1 from "./home/footer/Footer1";
import Footer2 from "./home/footer/Footer2";
import Caresoul from "./home/caresoul/caresoul";
import { SearchProvider } from "./navbar/searchbar/Searchcontext";
import ForgotPassword from "./components/forgotpassword/Fotgotpassword";
import { Route,Routes } from "react-router-dom";
import Moviedetails from "./home/section/moviedetails/Moviedetails";
function App(){
  return(<div>
    <SearchProvider>
 <Navbar/>
 </SearchProvider>
 <Routes>

   <Route path="/login" element={<Login/>}/>
   <Route path="/forgotpassword" element={<ForgotPassword/>}/>
   <Route path="/Newpassword" element = {<Newpassword/>}/>
   <Route path="/" element = {<div> <Caresoul/><Section/><Footer/><Footer1/><Footer2/></div>}/>
   <Route path="/movies/:id" element={ <div><Moviedetails/></div> }/>
   <Route path="/signup" element={<Signup/>}/>
   </Routes>
   
  </div>)
}
export default App;



