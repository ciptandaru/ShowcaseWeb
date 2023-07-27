import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <>
      <div className="container">
        <section className="container-fluid">
          <div className="row">
            <Navbar />
            <SideBar />
            <Outlet />
          </div>
        </section>
      </div>
    </>
  );
};

export default Layout;
