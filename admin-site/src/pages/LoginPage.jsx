import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {userLogin} from "../stores/action/actionCreator";
import Swal from "sweetalert2";
import {useEffect, useRef} from "react";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {access_token, err} = useSelector((state) => state.users);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Logged in",
      });
    } else if (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    }
  }, [access_token, err]);
  const onLogin = async (data) => {
    await dispatch(userLogin(data));
  };
  const input = {
    email: useRef(),
    password: useRef(),
  };
  const submitForm = (event) => {
    event.preventDefault();
    if (
      input.email.current.value === "" ||
      input.password.current.value === ""
    ) {
      console.log("Error: Please fill in all the required fields.");
    } else {
      onLogin({
        email: input.email.current.value,
        password: input.password.current.value,
      });
    }
  };
  return (
    <div
      className="container"
      style={{
        marginTop: "200px",
        height: "50vh",
        width: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="p-5 m-5">
        <div>
          <div className="text-center p">
            <img
              className="border-bottom"
              style={{
                marginBottom: "25px",
                width: "200px",
              }}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/2560px-H%26M-Logo.svg.png "
              alt=""
            />
          </div>
          <h1 className="d-flex justify-content-center">Login Admin</h1>
          <span className="d-flex justify-content-center border-bottom">
            Log in and autocomplete your order with your personal data
          </span>
        </div>
        <div>
          <div>
            <form onSubmit={(event) => submitForm(event)}>
              <div className="mb-3 mt-3">
                <div>
                  <label>Email</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  ref={input.email}
                  placeholder="Enter email ..."
                  required
                />
              </div>
              <div className="mb-3 mt-3">
                <div>
                  <label>Password</label>
                  <label className="text-danger text-end fw-bold">*</label>
                </div>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="login-password"
                  ref={input.password}
                  placeholder="Enter password ..."
                  required
                />
              </div>
              <div className="text-end">
                <button
                  type="submit"
                  href=""
                  className="btn btn-outline-primary btn-rounded text-dark rounded-pill"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
