import React , { useEffect, useState } from 'react';
import Layout from '../../components/Layouts/Layout';
import AdminMenu from "../../components/Layouts/AdminMenu";

import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";


const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");


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

    //create product function
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("photo", photo);
        productData.append("category", category);
        const { data } = axios.post(
          `${process.env.REACT_APP_API}/api/v1/product/create-product`,
          productData
        );
        if (data?.success) {
          console.log("error");
          toast.error(data?.message);
        } else {
          toast.success("Product Created Successfully");
          navigate("/dashboard/admin/products");
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };


    return (
      <Layout title={"Dashboard - Create Products"}>
          <div className="container-fluid m-3 p-3 dashboard">
              <div className='row'>
                  <div className='col-md-3'>
                      <AdminMenu />
                  </div>
                  <div className='col-md-9'>
                      <h1>Create Product</h1>
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
                          {photo && (
                            <div className="text-center">
                              <img
                                src={URL.createObjectURL(photo)}
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
                          <button className="btn btn-primary" onClick={handleCreate} >
                            CREATE PRODUCT
                          </button>
                        </div>
 
                      </div>
                  </div>
              </div>
        </div>
      </Layout>
  )
}

export default CreateProduct
