import React, { useState, useEffect } from "react";
import Layout from '../../components/Layouts/Layout';
import AdminMenu from "../../components/Layouts/AdminMenu";

import axios from "axios";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
      try {
          const { data } = await axios.get(
              `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
          );

          setName(data?.product[0]?.name);
          setId(data?.product[0]?._id);
          setDescription(data?.product[0]?.description);
          setPrice(data?.product[0]?.price);
          setQuantity(data?.product[0]?.quantity);
          setShipping(data?.product[0]?.shipping);
          setCategory(data?.product[0]?.category?._id);    
          
      } catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
        getSingleProduct();
        //eslint-disable-next-line
    }, []);


    //get all cat
    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting catgeory");
      }
    };

    useEffect(() => {
      getAllCategory();
    }, []);

    

    //update product function
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category);
            const { data } = axios.put(
                `/api/v1/product/update-product/${id}`,
                productData
            );
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product Updated Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong");
        }
    };

    //Delete Product
    const handleDelete = async () => {
      try {
        let answer = window.prompt("Are You Sure want to delete this product ? ");
        if (!answer) return;
        const { data } = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
        );
        toast.success("Product DEleted Succfully");
        navigate("/dashboard/admin/products");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };

    return (
        <Layout title={"Dashboard - Update Products"}>
        <div className="container-fluid m-3 p-3 dashboard">
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1>Update Product</h1>
                    <div className='m-1 w-75'>
                      <div className="mb-3">
                        <select className="form-select"
                                aria-label="Default select true" 
                                onChange={(e) => {
                                  setCategory(e.target.value);
                                }} 
                        >
                            <option selected>Open category menu</option>
                            {categories?.map((c) =>( 
                              <option  value={c._id} >{c.name}</option>
                            ))} 
                            
                        </select> 
                      </div>

                      <div className="mb-3">
                        <label className="btn btn-outline-secondary col-md-12">
                          {photo ? photo.name : "Upload Photo"}
                          <input
                            type="file"
                            name="photo"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden
                          />
                        </label>
                      </div>

                      <div className="mb-3">
                        {photo ? (
                          <div className="text-center">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt="product_photo"
                              height={"200px"}
                              className="img img-responsive"
                            />
                          </div>
                        ) : (
                          <div className="text-center">
                            <img
                              src={`/api/v1/product/product-photo/${id}`}
                              alt="product_photo"
                              height={"200px"}
                              className="img img-responsive"
                            />
                          </div>
                        )}
                      </div>
                      

                      <div className="mb-3">
                        <input
                          type="text"
                          value={name}
                          placeholder="write a name"
                          className="form-control"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <textarea
                          type="text"
                          value={description}
                          placeholder="write a description"
                          className="form-control"
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="number"
                          value={price}
                          placeholder="write a Price"
                          className="form-control"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="number"
                          value={quantity}
                          placeholder="write a quantity"
                          className="form-control"
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <select
                          select className="form-select"
                          aria-label="Default select true" 
                          onChange={(value) => {
                            setShipping(value);
                          }}
                        >
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                      </div>

                      <div className="mb-3">
                        <button className="btn btn-primary col-md-12" onClick={handleUpdate} >
                          UPDATE PRODUCT
                        </button>
                      </div>
                      <div className="mb-3">
                        <button className="btn btn-danger col-md-12" onClick={handleDelete}>
                          DELETE PRODUCT
                        </button>
                      </div>

                    </div>
                </div>
            </div>
      </div>
    </Layout>
    )
}

export default UpdateProduct;
