"use client";

import Image from "next/image";
import Link from "next/link";
import { request } from "@/server/request";
import "./page.css";
import { Pagination } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import Responsive from "@/components/Carusel/CardP";
import { useEffect, useState } from "react";
import Loading from "./loading";


export default function Home() {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let { data } = await request.get("category");
        // console.log(data);
        setCategories(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function shopPraducts(id, name) {
    localStorage.setItem("ID", JSON.stringify(id));
    localStorage.setItem("Name", JSON.stringify(name));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedTeachers = categories.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <section>
      <div className="container">
        <Responsive />
      </div>
      <main className="mainP">
        <div className="container sarlavha">
          <ShoppingOutlined
            style={{ fontWeight: "bold", fontSize: "20px", color: "white" }}
          />
          <h2> Mahsulotlar kategorisi </h2>
        </div>
        <br />
        <div className="container Cardsp">
          {isLoading ? ( // Ma'lumotlar yuklanayotgan payt
            <div className="loading-container">
              <Loading />
            </div>
          ) : (
            paginatedTeachers?.map((ctg) => (
              <div className="" key={ctg._id}>
                <div className="card">
                  {ctg?.image?.url ? (
                    <Image
                      src={ctg.image.url}
                      alt="Picture of the author"
                      width={300}
                      height={200}
                      style={{ height: "200px", marginTop: "-20px" }}
                      id="Images"
                    />
                  ) : (
                    <div className="placeholder-image">No Image Available</div>
                  )}
                  <Link
                    onClick={() => shopPraducts(ctg._id, ctg.name)}
                    className="card-footerp"
                    href={`category/${ctg._id}`}
                  >
                    {ctg.name}
                  </Link>
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
            total={categories.length} // Ma'lumotlar to'plami uzunligi
            showSizeChanger={false} // Elementlar sonini o'zgartirish imkoniyatini o'chirish
            onChange={handlePageChange}
            style={{ padding: "10px" }}
          />
        </div>
      </div>
    </section>
  );
}
