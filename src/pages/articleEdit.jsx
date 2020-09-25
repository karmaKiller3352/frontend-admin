import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import PageWrapper from "../layots/PageWrapper";
import Swal from "sweetalert2";
import {
  Form,
  Row,
  Col,
  FormControl,
  InputGroup,
  Button,
} from "react-bootstrap";
import CustomEditor from "../components/CustomEditor/index";
import { editArticle, setArticle } from "../sagas/actions/articles";
import actionWrap from "../utils/actionWrapper";
import { getCategories } from "../sagas/actions/categories";

function ArticleEdit({ editArticle, setArticle, getCategories, catList }) {
  const history = useHistory();
  const { id } = useParams();
  const [saveBtn, setSaveBtn] = useState("");
  const [currentFields, setField] = useState({});
  const imgUploadRef = useRef();
  const [previewImage, setPreview] = useState(currentFields.image);

  const queryCat = { page: 'all' };

  const handleSuccesSet = (res) => {
    setField(res);
    setPreview(res.image);
  };
  const handleError = (rej) => Swal.fire("Oops", rej, "error");
  const handleSucces = () => {
    Swal.fire("Success!", "Article saved", "success").then(() => {
      if (saveBtn === "save-and-return") {
        history.push("/admin/articles/");
      } else {
        history.push(`/admin/articles/${currentFields._id}`);
      }
    });
  };

  useEffect(() => {
    actionWrap(setArticle, handleSuccesSet, handleError, id);
  }, []);

  useEffect(() => {
    getCategories(queryCat);
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentFields.content.length > 0) {
      const data = new FormData(e.target);
      data.append("content", currentFields.content);
      if(!previewImage){
        data.set("image", "");
      }
      if (!data.get('image').size) {
				data.set('image', currentFields.image);
			}
      if (data.get("categories") === "Not choosed") {
        data.delete("categories");
      }
      actionWrap(editArticle, handleSucces, handleError, data, id);
    } else {
      Swal.fire("Required!", "You have to add content.", "error");
    }
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

  const editorHandler = (e) => {
    setField((prev) => ({
      ...prev,
      ...{
        content: e.editor.getData(),
      },
    }));
  };

  const changeInputHandler = ({ target: { name, value } }) => {
    setField((prev) => ({
      ...prev,
      ...{
        [name]: value,
      },
    }));
  };

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
        history.push("/admin/articles/");
      }
    });
  };

  const showCategories = () => {
    return (
      <Form.Group>
        <Form.Label>Select category</Form.Label>
        <Form.Control
          name="categories"
          as="select"
          className="mr-sm-2"
          id="inlineFormCustomSelect"
          custom
        >
          {currentFields.categories ? (
            <option value={currentFields.categories._id}>
              {currentFields.categories.title}
            </option>
          ) : (
            <option defaultValue>Not choosed</option>
          )}

          {catList &&
            catList
              .filter((cat) => {
                return currentFields.categories
                  ? currentFields.categories._id !== cat._id
                  : true;
              })
              .map((cat) => {
                return (
                  <option value={cat._id} key={cat._id}>
                    {cat.title}
                  </option>
                );
              })}
          {currentFields.categories ? <option>Not choosed</option> : null}
        </Form.Control>
      </Form.Group>
    );
  };

  return (
    <PageWrapper>
      <h2>Edit article</h2>
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <FormControl
                type="text"
                required="required"
                placeholder="Input article title"
                aria-label="title"
                name="title"
                onChange={changeInputHandler}
                value={currentFields.title || ""}
              />
            </Form.Group>
            <Form.Label>URL</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>
                  {`${process.env.REACT_APP_DEV_HOST}/articles/`}
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
            {showCategories()}

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
              <Form.File.Label htmlFor="formcheck-api-regular">Article thumb: <span className="false-link">No file choosed</span></Form.File.Label>
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
    </PageWrapper>
  );
}
const mapDispatchtoProps = {
  editArticle,
  setArticle,
  getCategories,
};

const mapStatetoProps = (state) => ({
  catList: state.categories.list,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ArticleEdit);
