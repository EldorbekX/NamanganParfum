"use client";
import { NavLink } from "react-bootstrap";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

import "./Footer.css";
const Footer = () => {
  return (
    <div className="footers">
      <footer className="container ">
        <div className="row">
          <div className="title">
            <a href="#">Show plus 118 2561 Fintown</a>
            <p>Hello@Show plus.com 020 7993 2905</p>
          </div>
          <div className="colFlex">
            <NavLink href="#">
              <FacebookOutlined style={{ fontSize: "20px", color: "white" }} />
            </NavLink>
            <NavLink href="#">
              <InstagramOutlined style={{ fontSize: "20px", color: "white" }} />
            </NavLink>
            <NavLink href="#">
              <TwitterOutlined style={{ fontSize: "20px", color: "white" }} />
            </NavLink>
            <NavLink href="#">
              <LinkedinOutlined style={{ fontSize: "20px", color: "white" }} />
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
