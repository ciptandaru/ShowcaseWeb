import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {userRegister} from "../stores/action/actionCreator";

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onRegister = async (data) => {
    await dispatch(userRegister(data));
    navigate("/");
  };
  const input = {
    username: useRef(),
    email: useRef(),
    password: useRef(),
    role: useRef(),
    phoneNumber: useRef(),
    address: useRef(),
  };
  const submitForm = (event) => {
    event.preventDefault();
    if (
      input.username.current.value === "" ||
      input.password.current.value === "" ||
      input.email.current.valu === ""
    ) {
      console.log("Error: Please fill in all the required fields.");
    } else {
      onRegister({
        username: input.username.current.value,
        email: input.email.current.value,
        password: input.password.current.value,
        phoneNumber: input.phoneNumber.current.value,
        address: input.address.current.value,
      });
    }
  };
  return (
    <section className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-2">
      <div className="d-flex justify-content-center border-bottom">
        <div className="container">
          <div>
            <div>
              <div className="d-flex justify-content-center">
                <h3>Sign up and enjoy</h3>
              </div>
            </div>
            <div>
              <form onSubmit={(event) => submitForm(event)}>
                <div className="mb-3 mt-3">
                  <div>
                    <label>Username</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    // ref={input.email}
                    type="text"
                    ref={input.username}
                    className="form-control rounded-pill"
                    placeholder="Enter username ..."
                    required
                  />
                </div>
                <div className="mb-3 mt-3">
                  <div>
                    <label>Email</label>
                    <label className="text-danger text-end fw-bold">*</label>
                  </div>
                  <input
                    type="email"
                    ref={input.email}
                    className="form-control rounded-pill"
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
                    ref={input.password}
                    className="form-control rounded-pill"
                    placeholder="Enter password ..."
                    required
                  />
                </div>
                <div className="mb-3 mt-3">
                  <div>
                    <label>Phone Number</label>
                  </div>
                  <input
                    type="text"
                    className="form-control rounded-pill"
                    placeholder="Enter phone number ..."
                    ref={input.phoneNumber}
                  />
                </div>
                <div className="mb-3 mt-3">
                  <div>
                    <label>Address</label>
                  </div>
                  <textarea
                    type="text"
                    ref={input.address}
                    className="form-control rounded-pill"
                    placeholder="Enter address ..."
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    href=""
                    className="btn btn-outline-primary rounded-pill"
                  >
                    Sign Up
                  </button>
                  <button
                    type="click"
                    href=""
                    className="btn btn-outline-secondary m-2 rounded-pill"
                    onClick={() => navigate(`/`)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
