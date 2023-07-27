import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  editProduct,
  fetchCategory,
  fetchOneProduct,
} from "../stores/action/actionCreator";
import {useNavigate, useParams} from "react-router";
import Swal from "sweetalert2";

const FormEditProduct = () => {
  const {categories} = useSelector((state) => state.categories);
  const {detailProduct, err} = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {slug} = useParams();
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchOneProduct(slug));
    if (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    }
  }, []);
  const onEditProduct = async (slug) => {
    await dispatch(editProduct(slug, categories));
    Swal.fire({
      width: 200,
      icon: "success",
      text: `Edit Succesfully`,
      showConfirmButton: false,
      timer: 1500,
    });
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
      onEditProduct({
        id: detailProduct.id,
        name: input.name.current.value,
        slug: input.name.current.value.replace(/\s+/g, "-").toLowerCase(),
        description: input.description.current.value,
        price: input.price.current.value,
        mainImg: input.mainImg.current.value,
        CategoryId: +input.CategoryId.current.value,
        AuthorId: 1,
      });
    }
  };

  return (
    <>
      {/* {JSON.stringify(categories)} */}
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-center border-bottom">
          <h1>Edit Product</h1>
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
                  defaultValue={detailProduct?.name}
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
                  // onChange={()=>handleSelect()}
                  className="form-select"
                  required
                >
                  {Array.isArray(categories) &&
                    categories?.map((elem) => {
                      return (
                        <option
                          key={elem.id}
                          value={elem.id}
                          selected={elem.id === detailProduct?.CategoryId}
                        >
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
                  defaultValue={detailProduct?.description}
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
                  defaultValue={detailProduct?.price}
                  ref={input.price}
                  className="form-control"
                  placeholder="Enter product price"
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  Image <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  defaultValue={detailProduct?.mainImg}
                  name="mainImg"
                  ref={input.mainImg}
                  className="form-control"
                  placeholder="Enter product image url"
                  required
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

export default FormEditProduct;
