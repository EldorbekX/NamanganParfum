"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import "./admin.css";
const { Header, Sider, Content } = Layout;

const PrivateLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{ color: "white", padding: "10px 20px", fontSize: "20px" }}
        >
          Najot news
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link href="/">Dashboard</Link>,
            },
            {
              key: "/experiences",
              icon: <VideoCameraOutlined />,
              label: <Link href="/">Experiences</Link>,
            },
            {
              key: "/messages",
              icon: <UploadOutlined />,
              label: <Link href="/messages">Messages</Link>,
            },
            {
              key: "/portfolios",
              icon: <UserOutlined />,
              label: <Link href="/portfolios">Portfolio</Link>,
            },
            {
              key: "/skills",
              icon: <UserOutlined />,
              label: <Link href="/UsersP">Skills</Link>,
            },
            {
              key: "/education",
              icon: <UserOutlined />,
              label: <Link href="/education">Education</Link>,
            },
            {
              key: "/account",
              icon: <UserOutlined />,
              label: <Link href="account">Account</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            className="notification"
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "end",
            }}
          >
            <Link href="/messages" style={{ marginRight: "20px" }}>
              <Avatar
                shape="square"
                size={40}
                icon={<MessageIcon sx={{ fontSize: "25px" }} />}
              />
            </Link>
            <Link
              href="/account"
              style={{ marginRight: "40px", borderRadius: "50px" }}
            >
              <Avatar
                shape="square"
                size={40}
                icon={<AccountCircleIcon sx={{ fontSize: "25px" }} />}
              />
            </Link>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <main>{children}</main>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
