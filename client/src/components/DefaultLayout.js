import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const userMenu = [
    {
      title: "Home",
      icon: <i class="ri-home-smile-fill"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transaction",
      icon: <i class="ri-bank-fill"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i class="ri-hand-heart-fill"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Profile",
      icon: <i class="ri-profile-fill"></i>,
      onClick: () => navigate("/profile"),
      path: "/profile",
    },
    {
      title: "Logout",
      icon: <i class="ri-logout-box-fill"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/requests",
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      icon: <i class="ri-home-smile-fill"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <i class="ri-group-fill"></i>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transaction",
      icon: <i class="ri-bank-fill"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i class="ri-hand-heart-fill"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Logout",
      icon: <i class="ri-logout-box-fill"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/requests",
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;
  return (
    <div className="layout">
      <div className="sidebar">
        <div className="menu">
          {menuToRender.map((item) => {
            const isActive = window.location.pathname === item.path;
            return (
              <div
                className={`menu-item ${isActive ? "active-menu-item" : ""}`}
                onClick={item.onClick}
              >
                {item.icon}
                {!collapsed && <h1 className="text-sm">{item.title}</h1>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header flex justify-between items-center">
          <div className="text-secondary">
            {collapsed && (
              <i
                class="ri-close-circle-fill"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            {!collapsed && (
              <i
                class="ri-menu-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
          </div>

          <div>
            <h1 className="text-xl text-secondary">Rapid-Pay</h1>
          </div>

          <div>
            <h1 className="text-sm underline text-secondary">
              {user?.firstName}
              {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;

