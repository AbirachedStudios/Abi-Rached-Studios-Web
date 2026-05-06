'use client'
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/sections/Hero/Hero";
import Loader from "@/components/loader/Loader.jsx"
import Bento from "@/sections/Bento/Bento";
import Talents from "@/sections/Talents/Talents";
import Contact from "@/sections/Contact/Contact";
import Apply from "@/components/Forms/ApplyForm";
import Login from "@/components/Forms/LoginForm";
import Register from "@/components/Forms/RegisterForm";
import Dashboard from "@/components/Dashboard/Dashboard";
import News from "@/sections/News/News";


export default function Home() {
  return (
    <div className="">
      <Loader/>
      <Navbar />
      <Hero></Hero>
      <Bento></Bento>
      <Talents></Talents>
      <Contact></Contact>
      <Login></Login>
      <Register></Register>
      <Dashboard></Dashboard> 
      <News></News>
    </div>
  );
}
