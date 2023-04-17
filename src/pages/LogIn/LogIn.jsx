import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { axiosRequest, saveToken } from "../../utils/axiosRequest";

const LogIn = () => {
  const Nav=useNavigate()
  const onFinish = async (event) => {
    try {
      const { data } = await axiosRequest.post("/login", {
        email: event["username"],
        password: event["password"],
      });

      sessionStorage.setItem("isLogged", JSON.stringify(true));
      saveToken(data.accessToken);
      Nav("/dashboard");
    } catch (error) {}
  };
  return (
    <div className="bg-[#F8F8F8] h-screen">
      <div className="container mx-auto h-screen flex flex-col justify-center items-center ">
          <h1 className="text-[#111111] mb-4 text-2xl font-medium">Login</h1>
        <div className="bg-white w-[420px] p-4 pt-10 rounded-lg">
          <Form
            name="normal_login"
            className="max-w-lg"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="float-right text-[#42a5f5]" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button bg-[#42a5f5]"
                
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
