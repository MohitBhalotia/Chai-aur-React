import React from "react";
import { Container, Logo, LogoutBtn } from "..";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "My posts",
      path: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="shadow-lg bg-gray-800 text-white">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-6">
            <Link to={"/"}>
              <Logo width="50px" />
            </Link>
          </div>
          <ul className="flex space-x-6">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="inline-block px-4 py-2 text-sm font-medium bg-gray-700 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
