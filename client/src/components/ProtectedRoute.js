import React, { useEffect, useState } from "react";
import { message } from "antd";
import { GetUserInfo } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { hideLoading, showLoading } from "../redux/loadersSlice";
import DefaultLayout from "./DefaultLayout";

const ProtectedRoute = (props) => {
  // const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await GetUserInfo();
      dispatch(hideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      if (!user) {
        getData();
      }
    } else {
      navigate("/login");
    }
  }, []); // Dependency array ensures this effect runs once
  return (
    user && (
      <div>
        <DefaultLayout>
          {" "}
          {user.email}
          {props.children}
        </DefaultLayout>
      </div>
    )
  );
};

export default ProtectedRoute;
