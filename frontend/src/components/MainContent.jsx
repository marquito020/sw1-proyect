import { Outlet } from "react-router-dom";

// import Sidebar from "./Sidebar";
import Navbar from "./Nabvar";
import Footer from "./Footer";

function MainContent() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] text-gray-800 shadow-lg">
     {/*  <Sidebar /> */}
      <Navbar />

      {/* <main className="
        xl:pl-[270px] xl:pr-[35px] py-5 px-4 min-h-screen grid justify-center items-center
      "> */}
      <main
        className="
        xl:pl-[100px] xl:pr-[100px] py-12 min-h-screen flex justify-center items-center"
      >
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}

export default MainContent;
