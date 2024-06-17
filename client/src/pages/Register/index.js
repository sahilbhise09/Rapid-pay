import React from "react";
import { Row, Form, Col, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loadersSlice";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    // console.log("values recieved from forms ", values);
    try {
      dispatch(showLoading());
      const response = await RegisterUser(values);
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  return (
    <div className="m-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">RapidPay - Register</h1>
        <h1 className="text-sm underline" onClick={() => navigate("/login")}>
          Already a member? Login
        </h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Mobile"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Identification Type"
              name="identificationType"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <select>
                <option value="National ID"> National ID</option>
                <option value="PASSPORT">Passport ID</option>
                <option value="DRIVING LICENSE">Driving License ID</option>v
                <option value="SOCIAL CARD">Social Card ID</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Identification Number"
              name="identificationNumber"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="password" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="text" />
            </Form.Item>
          </Col>
        </Row>
        <div className="flex justify-end">
          <button className="primary-contained-btn" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Index;
