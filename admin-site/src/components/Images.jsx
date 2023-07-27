import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {fetchOneProduct} from "../stores/action/actionCreator";

const Images = (data, handleImage, images, elem) => {
  //   console.log(data);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="outline-primary rounded-pill"
        onClick={(() => setModalShow(true), handleImage(elem.id))}
      >
        Show Images
      </Button>
      <Modal
        {...data}
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
          {/* <div className="card-group">
            {data.data?.map((image) => {
              return (
                <> */}
          <div className="card">
            <img src="" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className="card-footer">
              <small className="text-body-secondary">
                Last updated 3 mins ago
              </small>
            </div>
          </div>
          {/* </>
              );
            })} */}
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={data.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Images;
