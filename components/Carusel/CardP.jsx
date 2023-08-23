"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { ShopOutlined, ShoppingOutlined } from "@ant-design/icons";
import axios from "axios"; // Don't forget to import axios.
import SampleNextArrow from "../SampleNextArrow";
import SamplePrevArrow from "../SamplePrevArrow";
import Imagela from "../../assets/1618553780_27-phonoteka_org-p-genetika-fon-32.jpg";
import "./CardP.css";
import { request } from "@/server/request";
import { useCart } from "@/app/(public)/CartProvider";

const Responsive = () => {
  const [carusel, setCarusel] = useState([]);
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let { data } = await axios.get(
        //   `https://vodiy-parfum-backend.vercel.app/api/v1/last-products`
        // );
        let { data } = await request.get("last-products");
        // console.log(data);
        setCarusel(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddToShop = (productId) => {
    const productToAdd = carusel.find((product) => product._id === productId);
    if (productToAdd) {
      const existingItem = cartItems.find(
        (item) => item._id === productToAdd._id
      );

      if (existingItem) {
        const updatedCartItems = cartItems.map((item) =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCartItems(updatedCartItems);
        console.log("Cart Items after update:", updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
        console.log("Cart Items after adding new product:", [
          ...cartItems,
          { ...productToAdd, quantity: 1 },
        ]);
      }
    }
  };

  return (
    <div className="Caruselbg">
      <div className="sarlavhaCarus">
        <ShopOutlined
          style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
        />
        <h2> Yangi mahsulotlar </h2>
      </div>
      <Slider {...settings}>
        {carusel?.map((pr) => (
          <div key={pr} className="cardw">
            {pr?.image?.url ? (
              <Image
                src={pr.image.url}
                alt="Najot ta'lim"
                className="cardw__img"
                width={300}
                height={200}
              />
            ) : (
              <div className="placeholder-image">
                <Image
                  src={Imagela}
                  alt="Najot ta'lim"
                  className="cardw__img"
                  width={300}
                  height={200}
                />
              </div>
            )}
            <span className="cardw__footer">
              {pr?.title ? (
                <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                  {pr.title}
                </span>
              ) : (
                <span style={{ fontSize: "17px", fontWeight: "bold" }}>
                  No title
                </span>
              )}
            </span>
            <button
              onClick={() => handleAddToShop(pr._id)}
              className="cardw__action"
            >
              <ShoppingOutlined
                style={{ fontWeight: "bold", fontSize: "40px", color: "black" }}
              />
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Responsive;
