import "./Navbar.css";
import {useNavigate} from "react-router";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className="navimg">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/640px-H%26M-Logo.svg.png"
            height="50px;"
          ></img>
        </div>
        <nav>
          <ul>
            <li>
              <a onClick={() => navigate(`/`)}>Home</a>
            </li>
            <li>
              <a onClick={() => navigate(`/products`)}>Product</a>
            </li>
            <li>
              <a onClick={() => navigate(`/not-found`)}>Men</a>
            </li>
            <li>
              <a onClick={() => navigate(`/not-found`)}>Kids</a>
            </li>
            <li>
              <a onClick={() => navigate(`/not-found`)}>H&M HOME</a>
            </li>
            <li>
              <a onClick={() => navigate(`/not-found`)}>Sale</a>
            </li>
            <li>
              <a onClick={() => navigate(`/not-found`)}>Sustainability</a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}

export default Navbar;
