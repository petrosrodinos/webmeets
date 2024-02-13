import { Routes, Route, Outlet } from "react-router-dom";
import { FC } from "react";
import Home from "../pages/home";
import SignIn from "pages/auth/signin";
import SignUp from "pages/auth/signup";
import BookingStatus from "pages/bookings";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Home />} />
      <Route path="/auth" element={<Home />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/bookings" element={<BookingStatus />} />
      <Route path="/contact" element={<Home />} />
      <Route path="/home" element={<Outlet />} />
      <Route path="/meet" element={<Home />} />
      <Route path="/meet/:id" element={<Home />} />
      <Route path="/meets" element={<Home />} />
      <Route path="/meets/:id" element={<Home />} />
      <Route path="/profile" element={<Home />} />
      <Route path="/profile/bookings" element={<Home />} />
      <Route path="/profile/meets" element={<Home />} />
      <Route path="/profile/messages" element={<Home />} />
      <Route path="/profiles/:id" element={<Home />} />
      <Route path="/user" element={<Home />} />
      <Route path="/user/bookings" element={<Home />} />
      <Route path="/user/messages" element={<Home />} />
    </Routes>
  );
};

export default Router;
