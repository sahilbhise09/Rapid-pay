import React from "react";
import { Row, Form, Col, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";

const Index = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    // console.log("values received from forms ", values);
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        navigate("/dashboard");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="card w-400 p-2">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">RapidPay - Login</h1>
        </div>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input type="email" />
              </Form.Item>
            </Col>

            <Col span={24}>
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
          </Row>
          <Button
            className="primary-contained-btn w-100"
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
          <h1
            className="text-sm underline mt-2"
            onClick={() => navigate("/Register")}
          >
            Not a member? Register
          </h1>
        </Form>
      </div>
    </div>
  );
};

export default Index;
