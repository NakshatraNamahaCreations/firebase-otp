import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Blogs from "./Components/Blogs";
import Courses from "./Components/Courses";
import Tools from "./Components/Tools";
import Login from "./Components/Login";
import Header from "./Components/Header";
// import "./App.css";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Coursesdetails from "./Components/Coursesdetails";
import Content from "./Components/Content";
import Asin from "./Components/Asin";
import Product from "./Components/Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
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
              <Tools />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
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
          path="/coursesdetail"
          element={
            <>
              <Header />
              <Coursesdetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/content/:id"
          element={
            <>
              <Header />
              <Content />
              <Footer />
            </>
          }
        />
        <Route
          path="/asin-code"
          element={
            <>
              <Header />
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
              <Product />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
