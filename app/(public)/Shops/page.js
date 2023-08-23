"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import PropTypes from "prop-types";
import { useCart } from "../CartProvider";
import { CloseOutlined } from "@ant-design/icons";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./shops.css";
const Shops = () => {
  const { cartItems, setCartItems } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    console.log("Cart Items in Shops:", cartItems);

    // Saqlangan mahsulotlarni chiqarish
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        console.log("Item in Cart:", item);
        // Mahsulotni shu yerdan chiqarishingiz mumkin
      });
    }
  }, [cartItems]);

  const handleAddToCart = (product, action) => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity:
                action === "increase" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      );
      setCartItems(updatedCartItems);
    }
  };

  const handleRemoveFromCart = (product) => {
    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );
    setCartItems(updatedCartItems);
  };

  const handleFavoriteIconClick = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };
  return (
    <section >
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-items">
        <section className="h-screen py-12 sm:py-16 lg:py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center">
              <h1 id="titleshop" className="text-2xl font-semibold ">
                Your Cart
              </h1>
            </div>
            <div className="mx-auto mt-8 max-w-md md:mt-12">
              <div id="bgshops" className="rounded-3xl  shadow-lg">
                <div className="px-4 py-6 sm:px-8 sm:py-10">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item._id} className="cart-item">
                        <div className="flow-root">
                          <ul style={{ marginTop: "10px" }} className="-my-8">
                            <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                              <div
                                id="imagesun"
                                className="  shrink-0 relative"
                              >
                                <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                                  <i className="material-icons">
                                    <FavoriteIcon
                                      onClick={() =>
                                        handleFavoriteIconClick(item._id)
                                      }
                                      // Add conditional style for red color
                                      style={{
                                        color: selectedProducts.includes(
                                          item._id
                                        )
                                          ? "red"
                                          : "inherit",
                                          fontSize:"17px"
                                      }}
                                    />
                                  </i>
                                </span>

                                <div>
                                  <Image
                                    src={item?.image?.url}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                    className="h-24 w-24 max-w-full rounded-lg object-cover"
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100px",
                                      height: " Hug (36px)",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                    className="hover-button "
                                  >
                                    <button
                                      className="btn "
                                      onClick={() =>
                                        handleAddToCart(item, "decrease")
                                      }
                                      id="quantityshop"
                                    >
                                      -
                                    </button>
                                    <h4
                                      style={{ color: "#FF7010" }}
                                      className="text-center"
                                    >
                                      {item.quantity}
                                    </h4>
                                    <button
                                      onClick={() =>
                                        handleAddToCart(item, "increase")
                                      }
                                      className="btn"
                                      id="quantityshop"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="relative flex flex-1 flex-col justify-between">
                                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                                  <div className="pr-8 sm:pr-5">
                                    <p className="text-base font-semibold text-gray-900">
                                      {item.title}
                                    </p>
                                    <p className="mx-0 mt-1 mb-0 text-sm text-gray-900">
                                      {item.description}
                                    </p>
                                  </div>

                                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                    <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                      {item.price * item.quantity} som
                                    </p>
                                  </div>
                                </div>

                                <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                                  <button
                                    type="button"
                                    className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                                    id="daletesavat"
                                    onClick={() => handleRemoveFromCart(item)}
                                  >
                                    <CloseOutlined />
                                  </button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <hr className="mx-0 mt-6 mb-0 h-0 border-r-0 border-b-0 border-l-0 border-t border-solid border-gray-300" />
                      </div>
                    ))
                  ) : (
                    <p>No items in the cart</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

Shops.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object),
};

export default Shops;
