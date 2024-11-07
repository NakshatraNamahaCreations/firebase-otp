import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Blogs from "./Components/Blogs";
import Courses from "./Components/Courses";
import Tools from "./Components/Tools";
import Login from "./Components/Login";
import Header from "./Components/Header";
import "./App.css";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Coursesdetails from "./Components/Coursesdetails";
import Content from "./Components/Content";
import Asin from "./Components/Asin";
import Product from "./Components/Product";
import Chat from "./Components/Chat";
import Privacy from "./Components/Privacy";
import Terms from "./Components/Terms";
import Refund from "./Components/Refund";
import Chatlogin from "./Components/Chatlogin";
import Chatsignup from "./Components/Chatsignup";
import Header1 from "./Components/Header1";
import Asindetails from "./Components/Asindetails";
import Mobileheader from "./Components/Mobileheader";
import Firebaselogin from "./Components/Firebaselogin";
import Firebaseotp from "./Components/Firebaseotp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Mobileheader /> <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <Mobileheader />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <Header />
              <Mobileheader />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/courses"
          element={
            <>
              <Header />
              <Mobileheader />
              <Courses />
              <Footer />
            </>
          }
        />
        <Route
          path="/tools"
          element={
            <>
              <Header />
              <Mobileheader />
              <Tools />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Signup />
            </>
          }
        />
        <Route
          path="/chatlogin"
          element={
            <>
              <Chatlogin />
            </>
          }
        />
        <Route
          path="/chatsignup"
          element={
            <>
              <Chatsignup />
            </>
          }
        />
        <Route
          path="/coursesdetail"
          element={
            <>
              <Header />
              <Mobileheader />
              <Coursesdetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <Header />
              <Mobileheader />
              <Chat />
              {/* <Footer /> */}
            </>
          }
        />
        <Route
          path="/content/:id"
          element={
            <>
              <Header />
              <Mobileheader />
              <Content />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Mobileheader />
              <Asin />
              <Footer />
            </>
          }
        />
        <Route
          path="/product-search"
          element={
            <>
              <Header />
              <Mobileheader />
              <Product />
              <Footer />
            </>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <>
              <Header />
              <Mobileheader />
              <Privacy />
              <Footer />
            </>
          }
        />
        <Route
          path="/termsofuse"
          element={
            <>
              <Header />
              <Mobileheader />
              <Terms />
              <Footer />
            </>
          }
        />
        <Route
          path="/refund-policy"
          element={
            <>
              <Header />
              <Mobileheader />
              <Refund />
              <Footer />
            </>
          }
        />
        <Route
          path="/product-details"
          element={
            <>
              <Header />
              <Mobileheader />
              <Asindetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/firebaselogin"
          element={
            <>
              {/* <Header />
              <Mobileheader />
              <Asindetails />
              <Footer /> */}
              <Firebaselogin />
            </>
          }
        />
        <Route
          path="/firebaseotp"
          element={
            <>
              {/* <Header />
              <Mobileheader />
              <Asindetails />
              <Footer /> */}
              <Firebaseotp />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
