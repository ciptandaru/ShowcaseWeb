import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {logout} from "../stores/action/actionCreator";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <>
      <nav
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        style={{height: "100vh"}}
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                onClick={() => navigate(`/`)}
                className="nav-link"
                id="nav-product"
              >
                Products
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => navigate(`/categories`)}
                className="nav-link"
                id="nav-category"
              >
                Categories
              </a>
            </li>
          </ul>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
            <span>Account</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate(`/register`)}>
                Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={handleLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default SideBar;
