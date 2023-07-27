import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchProduct} from "../stores/action/actionCreator";
import Loading from "../components/Loading";
import TDataProduct from "../components/TDataProduct";
import Swal from "sweetalert2";

const HomePage = () => {
  const {products, isLoading, err} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProduct());
    if (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    }
  }, [dispatch]);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Products</h1>
          <button
            onClick={() => navigate(`/create-product`)}
            className="btn btn-primary rounded-pill"
          >
            New Product
          </button>
        </div>
        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th width="180px">Image</th>
                  <th width="250px">Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Created by</th>
                  <th>Images</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <TDataProduct data={products} />
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
