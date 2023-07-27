import {NavLink, useNavigate} from "react-router-dom";
import {
  deleteProduct,
  fetchImage,
  fetchProduct,
} from "../stores/action/actionCreator";
import {useDispatch, useSelector} from "react-redux";
import {useCurrency} from "../hooks/useCurrency";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";
import Images from "./Images";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

function TDataProduct({data}) {
  const [modalShow, setModalShow] = useState(false);
  const {images, err} = useSelector((state) => state.images);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchImage());

    // Fetch image for each element in the data array
    // data.forEach((elem) => {
    //   dispatch(fetchImage(elem.id));
    // });

    if (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err}`,
      });
    }
  }, []);
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    dispatch(fetchProduct());
    Swal.fire({
      width: 200,
      icon: "success",
      text: `Delete Success!!`,
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/");
  };
  const handleImages = (id) => {
    console.log(id);
    dispatch(fetchImage(id));
  };
  // useEffect(() => {
  //   dispatch(fetchProduct());
  // }, [dispatch]);
  return (
    <>
      {/* {JSON.stringify(data)} */}

      {data &&
        data?.map((elem, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="fw-bold">{elem.name}</td>
              <td>
                <img src={elem.mainImg} className="img-fluid" />
              </td>
              <td>{elem.description}</td>
              <td>{useCurrency(elem.price)}</td>
              <td>{elem.Category?.name}</td>
              {/* {JSON.stringify(elem.Category?.name)} */}
              <td>{elem.User?.username}</td>
              <td>
                {" "}
                <Button
                  variant="outline-primary rounded-pill"
                  onClick={() => {
                    setModalShow(true);
                    handleImages(elem.id);
                  }}
                >
                  Show Images
                </Button>
                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Modal heading
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="card-group">
                      {/* {JSON.stringify(images)} */}
                      {images.map((image, index) => {
                        return (
                          <>
                            <div key={index} className="card">
                              <img
                                src={image.imgUrl}
                                className="card-img-top"
                                alt="..."
                              />
                            </div>
                          </>
                        );
                      })}{" "}
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </td>
              <td>
                <button className="btn btn-outline-warning text-dark rounded-pill text-center">
                  <NavLink className={"text-dark"} to={`/${elem.slug}`}>
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
    </>
  );
}
export default TDataProduct;
