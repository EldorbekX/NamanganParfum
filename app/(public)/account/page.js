"use client";

import { request } from "@/server/request";
import React, { useEffect, useState } from "react";
import image from "../../../assets/20230809_165116s.png";
import Image from "next/image";
import { Form, Input, Button } from "antd";
import Loading from "../loading";
import "./acaunt.css"
const UserAccount = () => {
  // const { user } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(""); // Create a form instance
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await request.get("auth/me");
        console.log(data);
        setUser(data);
        form.setFieldsValue(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [form]);

  const handleChange = (changedValues, allValues) => {
    console.log("Changed values:", changedValues);
    console.log("All values:", allValues);
    setUser((prevUser) => ({ ...prevUser, ...changedValues }));
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      await request.put("auth/update", values);
      message.success("Edited successfully!");
      fetchData();
      console.log(values);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(user);
  return (
    <div>
      <section className="acaunt">
        <div className="containerac">
          <div className="flexacaunt">
            <div className="col-lg-12 col-xl-11">
              <div className="cardacaunt" >
                <div className="cardacaunt-body ">
                  <div className="flexacaund2">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <h4 className="tileac text-center h4 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Accound {user?.role === 1 ? "Admin" : "User"}
                      </h4>
                      {loading ? (
                        <Loading/>
                      ) : (
                        <Form
                          form={form}
                          onFinish={handleSubmit}
                          onValuesChange={handleChange}
                        >
                          <Form.Item
                            name="firstName"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your first name",
                              },
                            ]}
                          >
                            <Input placeholder="Firstname" />
                          </Form.Item>
                          <Form.Item
                            name="lastName"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your last name",
                              },
                            ]}
                          >
                            <Input placeholder="Lastname" />
                          </Form.Item>
                          <Form.Item
                            name="username"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your username",
                              },
                            ]}
                          >
                            <Input placeholder="Username" />
                          </Form.Item>
                          <Form.Item
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "Please enter your phoneNumber",
                              },
                            ]}
                          >
                            <Input placeholder="phoneNumber" />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              className="button"
                              htmlType="submit"
                            >
                              Save
                            </Button>
                          </Form.Item>
                          {errorMessage && (
                            <p style={{ color: "red" }}>{errorMessage}</p>
                          )}
                        </Form>
                      )}
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center justify-content-center order-1 order-lg-2">
                      <Image src={image} alt="sing up image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserAccount;

// "use client";

// import { request } from "@/server/request";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const UserAccount = () => {
//   // const { user } = useSelector((state) => state.auth);
//   const [user, setUser] = useState(null);
//   async function getUserData() {
//     const { data } = await request.get("auth/me");
//     setUser(data);
//   }
//   useEffect(() => {
//     getUserData();
//   }, []);
//   return <div style={{marginTop:"252px"}}>{JSON.stringify(user)}</div>;
// };

// export default UserAccount;
