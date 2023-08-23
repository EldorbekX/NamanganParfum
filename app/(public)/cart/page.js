"use client";

import Image from "next/image";
import { request } from "@/server/request";
import { Pagination } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Input } from "antd";
import "./allProduct.css";
import Loading from "../loading";
import { useCart } from "../CartProvider";
import axios from "axios";

export default function Cart() {
  const [categorie, setCategorie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const { Search } = Input;
  const [search, setSearch] = useState("");

  const { cartItems, setCartItems } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // let { data } = await request.get(`product?limit=192`);
        let { data } = await axios.get(
          `https://ap-vodiy-parfum-backend.up.railway.app/api/v1/product?limit=192`
        );
        let categordata = data.products;
        console.log(categordata);
        setCategorie(categordata);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Cart Items in Cart:", cartItems); // cartItems holatini tekshirish
  }, [cartItems]);

  const filteredProduct = categorie.filter(
    (pr) =>
      pr &&
      pr.title && // Add null/undefined checks
      pr.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = filteredProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleAddToShop = (productId) => {
    const productToAdd = filteredProduct.find(
      (product) => product._id === productId
    );
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
    <section>
      <main style={{ marginTop: "100px" }} className="mainP">
        <div id="search" className="container ">
          <Search
            placeholder="input search text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            style={{
              width: 400,
            }}
          />
        </div>
        <div className="container sarlavha">
          <ShoppingOutlined
            style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
          />
          <h2> All Products </h2>
        </div>
        <br />
        <div className="container CardsPas">
          {isLoading ? ( // Ma'lumotlar yuklanayotgan payt
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            paginatedTeachers?.map((ctg) => (
              <div className="" key={ctg._id}>
                <div className="cardwer">
                  <div className="imgcard">
                    {ctg?.image?.url ? (
                      <Image
                        src={ctg.image.url}
                        alt="Picture of the author"
                        width={300}
                        height={200}
                        id="Images"
                      />
                    ) : (
                      <div className="placeholder-image">
                        No Image Available
                      </div>
                    )}
                  </div>
                  <div className="titlecard">
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                      {ctg.title}:{ctg.description}
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Narxi:{ctg.price}som
                    </p>{" "}
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Miqdori: {ctg.sold}ta
                    </p>
                    <p style={{ fontSize: "15px", fontWeight: "bold" }}>
                      Number{ctg.number}
                    </p>
                    <button
                      onClick={() => handleAddToShop(ctg._id)}
                      className="cardFooter"
                    >
                      {"Qo'shish"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <div className="paganation">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredProduct.length} // Ma'lumotlar to'plami uzunligi
            showSizeChanger={false} // Elementlar sonini o'zgartirish imkoniyatini o'chirish
            onChange={handlePageChange}
            style={{ padding: "10px" }}
          />
        </div>
      </div>
    </section>
  );
}
