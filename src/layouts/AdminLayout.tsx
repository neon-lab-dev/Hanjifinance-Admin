import { Outlet } from "react-router-dom";
import Sidebar from "../component/Dashboard/Sidebar/Sidebar";
import Header from "../component/Dashboard/Header/Header";

const AdminLayout = () => {
  return (
    <div className="flex bg-neutral-150">
      <Sidebar />
      <div className="w-full flex flex-col">
        <Header/>
        <div className="px-5 py-4">
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
