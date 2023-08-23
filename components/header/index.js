"use client";

import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { LoginOutlined } from "@ant-design/icons";
import imagelogo from "../../assets/_2156671285840.png";
import imagelogo2 from "../../assets/logo-star.svg";
import Image from "next/image";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { useCart } from "@/app/(public)/CartProvider";

const Header = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems } = useCart();
  const totalQuantity = cartItems.length;
  return (
    <header className="flex justify-center text-[orange] gap-2">
      <header className="header">
        <div id="header" className="container">
          <Link href="/" className="logo">
            <Image src={imagelogo} alt="Picture of the author" id="imagelogo" />
            <Image
              src={imagelogo2}
              alt="Picture of the author"
              width={60}
              height={60}
              id="imagelogo2"
            />
          </Link>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn">
            <span className="navicon"></span>
          </label>
          <ul className="menu">
            <div>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Register</Link>
              </li>
            </div>

            <div>
              <li>
                <Link href="/cart">Products</Link>
              </li>

              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                {isAuth ? (
                  <div style={{ display: "flex" }}>
                    <Link href="/account">Account </Link>
                    <button
                      style={{ padding: "10px", fontSize: "20px" }}
                      onClick={() => dispatch(logout(router))}
                    >
                      <LoginOutlined />
                    </button>
                  </div>
                ) : null}
              </li>
            </div>
            <div>
              <li>
                <Link href="/Shops" className="nav-link" id="button-addon2">
                  <ShoppingCartOutlined
                    style={{
                      fontSize: "30px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    className="cart-icon3"
                    id="cart-icon3"
                  />
                  <span className="cart-total cart-total-3">
                    {totalQuantity}
                  </span>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </header>
    </header>
  );
};

export default Header;
