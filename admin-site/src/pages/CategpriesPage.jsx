import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Loading from "../components/Loading";
import {useEffect} from "react";
import {deleteCategory, fetchCategory} from "../stores/action/actionCreator";
import {NavLink} from "react-router-dom";
import Swal from "sweetalert2";

const CategoriesPage = () => {
  const {categories, isLoading, err} = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategory());
    // if (err) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: `${err}`,
    //   });
    // }
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
    Swal.fire({
      width: 200,
      icon: "success",
      text: `Delete Category Success!`,
      showConfirmButton: false,
      timer: 1500,
    });
  };
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
          <h1 className="display-2">Categories</h1>
          <button
            onClick={() => navigate(`/create-category`)}
            className="btn btn-primary rounded-pill"
          >
            New Category
          </button>
        </div>
        <div className="row">
          <div className="col-12 table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((elem, index) => {
                  return (
                    <tr key={elem.id}>
                      <td>{index + 1}</td>
                      <td className="fw-bold">{elem.name}</td>
                      <td>
                        <button className="btn btn-outline-warning text-dark rounded-pill text-center">
                          <NavLink
                            className={"text-dark"}
                            to={`/categories/${elem.id}`}
                          >
                            Edit
                          </NavLink>
                        </button>
                        <button
                          className="btn btn-outline-danger text-dark rounded-pill text-center"
                          onClick={() => handleDelete(elem.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoriesPage;
