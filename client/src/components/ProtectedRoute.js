import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      const response = await GetUserInfo();
      if (response.success) {
        setUserData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!userData) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []); // Dependency array ensures this effect runs once
  return <div>{props.children}</div>;
};

export default ProtectedRoute;
