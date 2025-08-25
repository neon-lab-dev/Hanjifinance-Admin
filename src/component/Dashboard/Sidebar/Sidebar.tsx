import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";
import Button from "../../Reusable/Button/Button";
import { MdEmail } from "react-icons/md";
const Sidebar = () => {
  const location = useLocation();
  const sidebarLinks = [
    {
      label: "Emails",
      icon: <MdEmail />,
      path: "/dashboard/emails",
    },
  ];
  return (
    <div className="w-[280px] bg-white min-h-screen font-Montserrat p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-16">
        <img src={logo} alt="" className="w-44" />

        <div className="flex flex-col">
          {sidebarLinks?.map((item) => (
            <Link
              key={item?.label}
              to={"/dashboard/emails"}
              className={`py-3 px-2 rounded-lg font-medium hover:bg-primary-10/10 transition duration-300 ease-in-out flex items-center gap-2 ${
                location.pathname === item?.path
                  ? "bg-primary-10/10 text-primary-10"
                  : "text-neutral-10"
              }`}
            >
              {item?.icon}
              {item?.label}
            </Link>
          ))}
        </div>
      </div>

      <Button
        type="button"
        label="Logout"
        variant="primary"
        classNames="w-full py-3"
      />
    </div>
  );
};

export default Sidebar;
