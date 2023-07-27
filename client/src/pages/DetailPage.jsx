// import "./DetailPage.css";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneProduct, fetchProduct} from "../stores/action/actionCreator";
import {useCurrency} from "../hooks/useCurrency";
const DetailPage = () => {
  const {detailProduct, err} = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {slug} = useParams();
  console.log(slug);
  useEffect(() => {
    dispatch(fetchProduct());
    dispatch(fetchOneProduct(slug));
  }, []);
  return (
    <>
      <main className="container mt-4">
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              <img
                src={detailProduct.mainImg}
                className="card-img"
                alt="Product Image"
              />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">
                  Product Name: {detailProduct.name}
                </h5>
                <p className="card-text">
                  Price: {useCurrency(detailProduct.price)}
                </p>
                <p className="card-text">
                  Category: {detailProduct.Category?.name}
                </p>
                <p className="card-text">
                  Created by: {detailProduct.User?.username}
                </p>
                <p className="card-text">{detailProduct.description}</p>
                <a
                  onClick={() => navigate(`/not-found`)}
                  className="btn btn-primary"
                >
                  Add to Cart
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          {detailProduct.Images?.map((el, index) => {
            return (
              <>
                <div key={index} className="col-md-3">
                  <img
                    src={el.imgUrl}
                    className="img-thumbnail"
                    alt="Product Image 1"
                  />
                </div>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
};
export default DetailPage;
