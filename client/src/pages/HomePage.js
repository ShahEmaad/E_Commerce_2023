import React ,{ useState ,useEffect } from 'react';
import Layout from '../components/Layouts/Layout';
import { useAuth } from '../context/auth';

import toast from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";

import "../styles/HomePage.css";


const HomePage = () => {
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();

    const [cart, setCart] = useCart();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    //Filters
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);

    //Load Pages
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //get all cat
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
      }
    };

    //get Total Product Count
    const getTotal = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
        setTotal(data?.total);
      } catch (error) {
        console.log(error);
      }
    };
    
    // call functions
    useEffect(() => {
      getAllCategory();
      getTotal();
    }, []);

    //get all products
    const getAllProducts = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
          setLoading(false);
          setProducts(data.products);
        } catch (error) {
          setLoading(false);
          console.log(error);
          toast.error("Someething Went Wrong");
        }
    };

    //load more
    const loadMore = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
          setLoading(false);
          setProducts([...products, ...data?.products]);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    };

    // filter by cat
    const handleFilter = (value, id) => {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    };

    //Load Pages
    useEffect(() => {
      if (page === 1) return;
      loadMore();
    }, [page]);


    //call functions
    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
      if (checked.length || radio.length) filterProduct();
    }, [checked, radio]);

    //get filterd product
    const filterProduct = async () => {
      try {
        console.log(radio);
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
          checked,
          radio,
        });
        setProducts(data?.products);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Layout title={'All Products - Best Offers'}>
          {/* banner image */}
          <img
            src="/images/banner.png"
            className="banner-img"
            alt="bannerimage"
            width={"100%"}
          />
          {/* banner image */}
          <div className='container-fluid row mt-3 home-page'>
              <div className='col-md-3 filters '>
                  <h4 className='text-center'>Filter By Category</h4>
                  <div className='d-flex flex-column'>
                    {categories?.map((c) => (
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          key={c._id}
                          onChange={(e) => handleFilter(e.target.checked , c._id)}
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          {c.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-center mt-4">Filter By Price</h4>
                  <div className='d-flex flex-column' >
                      {Prices?.map((p) => (
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            // Value wasn't taking an array and typecasted it to a string 
                            id={p.array[0]}
                            value={p.array[1]}
                            defaultChecked= ""
                            onChange={(e) => setRadio([e.target.id,e.target.value])}
                          />
                          <label className="form-check-label" htmlFor="flexRadioDefault2">
                            {p.name}
                          </label>
                        </div>
                      ))}
                  </div>
                  <div className="d-flex flex-column mt-4">
                    <button
                      className="btn btn-danger"
                      onClick={() => window.location.reload()}
                    >
                      RESET FILTERS
                    </button>
                  </div>
              </div>
              <div className='col-md-9'>
                  <h1 className='text-center'>All Products</h1>
                  <div >
                    <div className='d-flex flex-wrap'>
                        {products?.map((p) => (
                          <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
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
                                
                                <p className="card-name-price">
                                  {p.description.substring(0, 60)}...
                                </p>
                                
                                <div className="card-name-price">
                                  <button
                                    className="btn btn-info ms-1"
                                    onClick={() => navigate(`/product/${p.slug}`)}
                                  >
                                    More Details
                                  </button>
                                
                                  <button
                                    className="btn btn-dark ms-1"
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
                          </div>
                        ))}
                    </div>
                    <div className='m-2 p-3'>
                      {products && products.length < total && (
                        <button
                          className="btn loadmore"
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(page + 1);
                          }}
                        >
                          {loading ? "Loading ..." : "Loadmore"}
                        </button>
                      )}
                    </div>
                  </div>                  
              </div>
          </div>
      </Layout>
    )
}

export default HomePage
