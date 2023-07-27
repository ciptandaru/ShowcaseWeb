import SideBar from "../components/SideBar";
import "../components/SideBar.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../stores/action/actionCreator";
// import Loading from "../components/Loading";

const ProductPage = () => {
  const {products, isLoading, err} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  // if (isLoading) {
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   );
  // }
  return (
    <>
      <section className="container">
        <SideBar />
        {/* {JSON.stringify(products)} */}
        <div className="content">
          {products?.map((elem, index) => {
            return (
              <div
                key={index}
                className="cards"
                onClick={() => navigate(`/products/${elem.slug}`)}
              >
                <img src={elem.mainImg} alt="Cards Image" />
                <h3>{elem.name}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default ProductPage;
