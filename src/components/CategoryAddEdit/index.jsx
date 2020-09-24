import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Row,
  Col,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import { setCategory, editCategory, addCategory } from "../../sagas/actions/categories";
import actionWrap from '../../utils/actionWrapper';
import CustomEditor from '../CustomEditor/index';
import getUrl from '../../utils/getUrlFromTitle';

function CategoryAddEdit({id, setCategory, editCategory, addCategory}) {
  const imgUploadRef = useRef();

  const history = useHistory();

  const [currentFields, setField] = useState({
    content: "",
  });
  const [articles, setArticles] = useState([]);
  const [saveBtn, setSaveBtn] = useState("");
  const [previewImage, setPreview] = useState(currentFields.image && null);

  const handleBack = () => {
    Swal.fire({
      title: "Close adding?",
      text: "Do you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/admin/categories/");
      }
    });
  };

  const handleError = (rej) => Swal.fire("Oops", rej, "error");

  const handleSuccesSet = (res) => {
      setField(res.category);
      setArticles(res.articles);
      setPreview(res.category.image);
  };

  const handleSucces = (cat) => {
    Swal.fire("Success!", "Category saved", "success").then(() => {
      if (saveBtn === "save-and-return") {
        history.push("/admin/categories/");
      } else {
        if(cat._id) {
          history.push(`/admin/categories/${cat._id}`);
        } else {
          history.push(`/admin/categories/${currentFields._id}`);
        }
        
      }
    });
  };
  
  const changeInputHandler = ({ target: { name, value } }) => {
    setField((prev) => ({
      ...prev,
      ...{
        [name]: value,
      },
    }));
  };

  const editorHandler = (e) => {
    setField((prev) => ({
      ...prev,
      ...{
        content: e.editor.getData(),
      },
    }));
  };

  const removeImgHandler = () => {
    setPreview("");
    setField((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const addFileHandler = ({ target: { name, files } }) => {
    setField((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const urlHandler = ({ target: { value } }) => {
    if(id) return
    setField((prev) => ({
      ...prev,
      url: getUrl(value),
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentFields.content.length > 0) {
      const data = new FormData(e.target);
      data.append("content", currentFields.content);
      if(!previewImage){
        data.set("image", "");
      }
      if (!data.get("image")) {
        data.set("image", currentFields.image);
      }
      if (data.get("categories") === "Not choosed") {
        data.delete("categories");
      }
      if(id) {
        actionWrap(editCategory, handleSucces, handleError, data, id);
      } else{
        actionWrap(addCategory, handleSucces, handleError, data);
      }
      
    } else {
      Swal.fire("Required!", "You have to add content.", "error");
    }
  };


  useEffect(()=> {
    if(id) {
      actionWrap(setCategory, handleSuccesSet, handleError, id);
    }
  }, []);

  useEffect(() => {
    function fileLoader(input) {
      const reader = new FileReader();
      reader.readAsDataURL(input.target.files[0]);
      reader.onload = function (e) {
        setPreview(e.target.result);
      };
    }
    imgUploadRef.current.addEventListener("change", fileLoader);
    return () => {
      imgUploadRef.current.removeEventListener("change", fileLoader);
    };
  }, [currentFields, previewImage, imgUploadRef]);

  useEffect(() => {
    if (typeof previewImage === "object") {
      setPreview(currentFields.image);
    }
  });

  return (
    <Row>
        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <FormControl
                type="text"
                required="required"
                placeholder="Input category title"
                aria-label="title"
                name="title"
                onKeyUp={urlHandler}
                onChange={changeInputHandler}
                value={currentFields.title || ""}
              />
            </Form.Group>
            <Form.Label>URL</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  {`${process.env.REACT_APP_DEV_HOST}/categories/`}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                required="required"
                name="url"
                value={currentFields.url || ""}
                onChange={changeInputHandler}
                id="basic-url"
                aria-describedby="basic-addon3"
              />
            </InputGroup>

            <Form.Group>
              <Form.Label>Meta title</Form.Label>
              <FormControl
                onChange={changeInputHandler}
                placeholder="Article title"
                aria-label="Meta title"
                name="metaTitle"
                value={currentFields.metaTitle || ""}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Meta description</Form.Label>
              <FormControl
                onChange={changeInputHandler}
                as="textarea"
                placeholder="Article description"
                aria-label="Meta description"
                name="metaDesc"
                value={currentFields.metaDesc || ""}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <CustomEditor
                data={currentFields.content}
                name="content"
                onChange={editorHandler}
              />
            </Form.Group>

            <Form.Group className="mb-5">
              {previewImage ? (
                <span className="imgWrapper">
                  <img
                    src={previewImage}
                    className="preview-img"
                    alt="Preview"
                  />
                  <button
                    onClick={removeImgHandler}
                    type="button"
                    className="close remove"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </span>
              ) : null}
            </Form.Group>
            <Form.Group className={previewImage ? "hidden" : ""}>
              <Form.File.Label htmlFor="formcheck-api-regular">Category thumb: <span className="false-link">No file choosed</span></Form.File.Label>
              <input
                className="form-control-file"
                type="file"
                ref={imgUploadRef}
                name="image"
                onChange={addFileHandler}
                id="formcheck-api-regular"
                style={{display: 'none'}}
              />
            </Form.Group>

            <Form.Row className="justify-content-between">
              <Col>
                <Button
                  type="button"
                  onClick={handleBack}
                  className="btn-danger"
                >
                  Cancel
                </Button>
              </Col>

              <Col className="text-right">
                <Button
                  type="submit"
                  onClick={() => {
                    setSaveBtn("save-and-edit");
                  }}
                  className="btn-info"
                >
                  Save and edit
                </Button>
                &#8195; &#8195;
                <Button
                  type="submit"
                  onClick={() => {
                    setSaveBtn("save-and-return");
                  }}
                  className="btn-success"
                >
                  Save and exit
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
  )
};

const mapDispatchtoProps = {
  setCategory,
  editCategory,
  addCategory,
};



export default connect(null, mapDispatchtoProps)(CategoryAddEdit);
