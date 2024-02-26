import { Routes, Route } from "react-router-dom";
import { FC } from "react";
import Home from "../pages/home";
import SignIn from "pages/auth/signin";
import SignUp from "pages/auth/signup";
import BookingStatus from "pages/bookings";
import Meet from "pages/meet";
import Contact from "pages/contact";
import Meets from "pages/meets";
import ProfileBookings from "pages/profile/bookings";
import Profile from "pages/profile";
import ProfilePage from "pages/profiles/Profile";
import ProfileMeets from "pages/profile/meets";
import ProfileMessages from "pages/profile/messages";
import UserPage from "pages/user/messages";
import UserBookings from "pages/user/bookings";
import UserMessages from "pages/user/messages";
import MeetPage from "pages/meets/Meet";
import ProfileMeet from "pages/profile/meets/Meet/page";
import About from "pages/about";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/auth" element={<Home />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/bookings" element={<BookingStatus />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/home" element={<Home />} />
      <Route path="/meet/:id" element={<Meet />} />
      <Route path="/meets" element={<Meets />} />
      <Route path="/meets/:id" element={<MeetPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/bookings" element={<ProfileBookings />} />
      <Route path="/profile/meets" element={<ProfileMeets />} />
      <Route path="/profile/meets/:id" element={<ProfileMeet />} />
      <Route path="/profile/messages" element={<ProfileMessages />} />
      <Route path="/profiles/:id" element={<ProfilePage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/bookings" element={<UserBookings />} />
      <Route path="/user/messages" element={<UserMessages />} />
      <Route path="/user/messages/:id" element={<UserMessages />} />
    </Routes>
  );
};

export default Router;
