import React from "react";
import Layout from "./../components/Layouts/Layout";
import { useSearch } from "../context/Search";

import axios from "axios";
import toast from 'react-hot-toast';
import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/cart";

import "../styles/ProductDetails.css";

const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();

  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4 similar-products">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
              </div>

              <p className="card-text ">
                  {p.description.substring(0, 60)}...
              </p>

              <div className="card-name-price">
                
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                    toast.success("Item Added to cart");
                    }}
                  >
                  ADD TO CART
                </button>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;