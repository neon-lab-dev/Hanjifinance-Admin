import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.png";
import Button from "../../Reusable/Button/Button";
import { MdArticle, MdSettings } from "react-icons/md";
import { logout } from "../../../redux/Features/Auth/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarLinks = [
  // {
  //   label: "Categories",
  //   icon: <MdCategory />,
  //   path: "/dashboard/categories",
  // },
  {
    label: "Blogs",
    icon: <MdArticle />,
    path: "/dashboard/blogs",
  },
  {
    label: "Settings",
    icon: <MdSettings />,
    path: "/dashboard/settings",
  },
];

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-[280px] bg-white min-h-screen font-Montserrat p-4 flex flex-col justify-between">
      <div className="flex flex-col gap-16">
        <img src={logo} alt="" className="w-44" />

        <div className="flex flex-col">
          {sidebarLinks?.map((item) => (
            <Link
              key={item?.label}
              to={item?.path}
              className={`p-3 rounded-lg font-medium hover:bg-primary-10/10 transition duration-300 ease-in-out flex items-center gap-2 ${
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
        onClick={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
