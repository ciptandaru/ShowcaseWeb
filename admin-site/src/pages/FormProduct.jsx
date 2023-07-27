import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPostProduct, fetchCategory} from "../stores/action/actionCreator";
import {useNavigate} from "react-router";
import Swal from "sweetalert2";

const FormProduct = () => {
  const {categories} = useSelector((state) => state.categories);
  const {success, err} = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
    if (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    } else if (success) {
      Swal.fire({
        width: 200,
        icon: "success",
        text: `Products Created!`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, []);
  const onAddProduct = async (data) => {
    await dispatch(addPostProduct(data));

    navigate("/");
  };
  const input = {
    name: useRef(),
    slug: useRef(),
    description: useRef(),
    price: useRef(),
    mainImg: useRef(),
    CategoryId: useRef(),
    AuthorId: useRef(),
    images1: useRef(),
    images2: useRef(),
    images3: useRef(),
  };
  const submitForm = (event) => {
    event.preventDefault();
    if (
      input.name.current.value === "" ||
      input.price.current.value === "" ||
      input.mainImg.current.value === "" ||
      input.CategoryId.current.value === ""
    ) {
      console.log("Error: Please fill in all the required fields.");
    } else {
      onAddProduct({
        name: input.name.current.value,
        slug: input.name.current.value.replace(/\s+/g, "-").toLowerCase(),
        description: input.description.current.value,
        price: input.price.current.value,
        mainImg: input.mainImg.current.value,
        CategoryId: +input.CategoryId.current.value,
        AuthorId: 1,
        images1: input.images1.current.value,
        images2: input.images2.current.value,
        images3: input.images3.current.value,
      });
    }
  };

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-center border-bottom">
          <h1>Create Product</h1>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <div className=" col-12 col-md-6">
            <form onSubmit={(event) => submitForm(event)}>
              <div className="mb-3">
                <label>
                  Name <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  ref={input.name}
                  className="form-control"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Category <span className="text-danger fw-bold">*</span>
                </label>
                <select
                  name="categoryId"
                  ref={input.CategoryId}
                  className="form-select"
                  required
                >
                  {categories?.map((elem, index) => {
                    return (
                      <option key={index} value={elem.id}>
                        {elem.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label>
                  Description
                  <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="description"
                  ref={input.description}
                  className="form-control"
                  placeholder="Enter product description"
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Price <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="number"
                  min="0"
                  name="price"
                  ref={input.price}
                  className="form-control"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Main Image <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="mainImg"
                  ref={input.mainImg}
                  className="form-control"
                  placeholder="Enter product image url"
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Image 1 <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="mainImg"
                  ref={input.images1}
                  className="form-control"
                  placeholder="Enter product image url"
                />
              </div>
              <div className="mb-3">
                <label>
                  Image 2 <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="mainImg"
                  ref={input.images2}
                  className="form-control"
                  placeholder="Enter product image url"
                />
              </div>
              <div className="mb-3">
                <label>
                  Image 3 <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  name="mainImg"
                  ref={input.images3}
                  className="form-control"
                  placeholder="Enter product image url"
                />
              </div>
              <div>
                <div>
                  <a
                    onClick={() => navigate(`/`)}
                    className="btn btn-lg btn-light rounded-pill"
                    href=""
                  >
                    Cancel
                  </a>
                  <button
                    className="btn btn-lg btn-outline-primary rounded-pill ms-2"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default FormProduct;
