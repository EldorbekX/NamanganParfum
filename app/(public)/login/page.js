"use client";

import "./login.css";

import { TOKEN } from "@/constants";
import { setAuth, setUser } from "@/redux/slices/authSlice";

import { request } from "@/server/request";
import { Button, Form, Input } from "antd";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../loading";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const login = async (form) => {
    try {
      setLoading(true);
      const {
        data: { accesstoken, user },
      } = await request.post("auth/login", form);
      setCookie(TOKEN, accesstoken);
      dispatch(setAuth());
      dispatch(setUser(user));
      if (user?.role === 1) {
        router.push("/admin");
      } else {
        router.push("/");
      }
      request.defaults.headers.Authorization = `Bearer ${accesstoken}`;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formItemLayout = {
    labelCol: {
      md: { span: 6 },
    },
  };

  return (
    <div className="loginac">
      <div style={{ marginTop: "200px" }} className="loginInput text-center">
        <h2 className="containr text-center text-4xl py-5 font-semibold">
          LogIn
        </h2>
        <Form
          name="login"
          onFinish={login}
          {...formItemLayout}
          className="text-center"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            hasFeedback
          >
            <Input
              style={{ height: "50px" }}
              placeholder="username"
              className="w-1/2 border mb-3"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password
              style={{ height: "50px" }}
              placeholder="password"
              className="w-1/2 border mb-3"
            />
          </Form.Item>
          <div className="buttonlogin">
            <Button
              htmlType="submit"
              className="card-footer"
              disabled={loading}
            >
              {loading ? <Loading /> : "Login"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
