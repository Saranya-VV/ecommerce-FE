import { Link } from "react-router-dom";
import { cartImg } from "../assets/index";
import { FiMenu } from "react-icons/fi";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const navigation = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "My Orders",
    link: "/Orders",
  },
  {
    title: "Profile",
    link: "/user-details",
  },
];

const HeaderLink = ({ item }) => {
  return (
    <Link
      to={item?.link}
      className="text-base text-black font-semibold hover:text-orange-700 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
    >
      {item?.title}
    </Link>
  );
};

HeaderLink.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.link,
  }).isRequired,
};

const Header = () => {
  const productData = useSelector((state) => state.product.productData);
  const userInfo = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear the token from local storage
    // localStorage.removeItem("persist:product");

    window.location.href = "/login"; // Redirect to login page after a short delay
  };

  return (
    <div className="w-full h-20 bg-white font-titleFont border-b-[1px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between px-4">
        {/* Right nav */}
        <div className="flex justify-end w-full">
          <div className="inline-flex items-center gap-x-12">
            {navigation.map((item) => (
              <HeaderLink key={item.title} item={item} />
            ))}
            {userInfo && (
              <>
                <p className="text-base font-titleFont font-semibold underline underline-offset-2">
                  {userInfo.name}
                </p>
                {/* Logout link with onClick handler */}
                <button
                  onClick={handleLogout}
                  className="text-base font-semibold text-black hover:text-red-600"
                >
                  Logout
                </button>
              </>
            )}
            <Link to={"/cart"} className="relative">
              <img src={cartImg} alt="cartImg" className="w-6" />
              <span className="absolute w-6 top-2 left-0 text-sm flex items-center justify-center font-semibold font-titleFont">
                {productData.length ? productData?.length : 0}
              </span>
            </Link>
            <Link to="/user-details">
              <img
                className="w-8 h-8 rounded-full"
                src={
                  // userInfo
                  //   ? userInfo?.image
                  "https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
                alt="userLogo"
              />
            </Link>

            {userInfo && (
              <p className="text-base font-titleFont font-semibold underline underline-offset-2">
                {userInfo.name}
              </p>
            )}
          </div>
          <button className="md:hidden">
            <FiMenu className="w-6 h-6 text-gray-950" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
