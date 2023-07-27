import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  editCategory,
  fetchCategory,
  fetchOneCategory,
} from "../stores/action/actionCreator";
import {useNavigate, useParams} from "react-router";
import Swal from "sweetalert2";

const FormEditCategory = () => {
  const {categoriesDetail, err} = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchOneCategory(id));
    if (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    }
  }, [dispatch]);
  const onEditProduct = async (id, data) => {
    await dispatch(editCategory(id, data));
    Swal.fire({
      width: 200,
      icon: "success",
      text: `Edit Succesfully`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/categories");
  };
  const input = {
    name: useRef(),
  };
  const submitForm = (event) => {
    event.preventDefault();
    if (input.name.current.value === "") {
      console.log("Error: Please fill in all the required fields.");
    } else {
      onEditProduct({
        id: categoriesDetail.id,
        name: input.name.current.value,
      });
    }
  };

  return (
    <>
      <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div className="d-flex justify-content-center border-bottom">
          <h1>Edit Category</h1>
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
                  defaultValue={categoriesDetail?.name}
                  ref={input.name}
                  className="form-control"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <div>
                  <a
                    onClick={() => navigate(`/categories`)}
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

export default FormEditCategory;
