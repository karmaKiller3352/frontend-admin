import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
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
import { addArticle } from "../sagas/actions/articles";
import actionWrap from "../utils/actionWrapper";
import { getCategories } from "../sagas/actions/categories";
import getUrl from "../utils/getUrlFromTitle";

function ArticleAdd({ addArticle, getCategories, catList }) {
  const history = useHistory();
  const [saveBtn, setSaveBtn] = useState("");
  const [currentFields, setField] = useState({
    categories: "5f540f375d1a666be4808a9c",
    content: "",
  });
  const queryCat = { page: 'all' };
  const imgUploadRef = useRef();

  const [previewImage, setPreview] = useState();

  useEffect(() => {
      getCategories(queryCat);
  }, []);

  useEffect(() => {
    imgUploadRef.current.addEventListener("change", (input) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(input.target.files[0]);
    });
  });

  const handlerSucces = (res) => {
    Swal.fire("Success!", "Article added", "success").then(() => {
      if (saveBtn === "save-and-return") {
        history.push("/admin/articles/");
      } else {
        history.push(`/admin/articles/${res._id}`);
      }
    });
  };

  const handlerError = (rej) => {
    console.log(rej);
    Swal.fire("Oops", rej, "error");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (currentFields.content.length > 0) {
      const data = new FormData(e.target);
      data.append("content", currentFields.content);
      if (data.get("categories") === "Not choosed") {
        data.delete("categories");
      }
      actionWrap(addArticle, handlerSucces, handlerError, data);
    } else {
      Swal.fire("Required!", "You have to add content.", "error");
    }
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

  const urlHandler = ({ target: { value } }) => {
    setField((prev) => ({
      ...prev,
      url: getUrl(value),
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
          onChange={changeInputHandler}
          name="categories"
          as="select"
          className="mr-sm-2"
          id="inlineFormCustomSelect"
          custom
        >
          <option value={null}>Not choosed</option>
          {catList &&
            catList.map((cat) => {
              return (
                <option value={cat._id} key={cat._id}>
                  {cat.title}
                </option>
              );
            })}
        </Form.Control>
      </Form.Group>
    );
  };

  return (
    <PageWrapper>
      <h2>Add article</h2>
      <Row>
        <Col>
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <FormControl
                required="required"
                placeholder="Input article title"
                aria-label="title"
                name="title"
                onKeyUp={urlHandler}
                onChange={changeInputHandler}
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
                value={currentFields.url}
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
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <CustomEditor
                data={currentFields.content}
                name="content"
                onChange={editorHandler}
              />
            </Form.Group>
            <Form.Group>
              {previewImage && (
                <img src={previewImage} className="preview-img" alt="Preview" />
              )}
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.File.Label>Article thumb</Form.File.Label>
              <input
                ref={imgUploadRef}
                className="form-control-file"
                type="file"
                name="image"
                onChange={addFileHandler}
                id="formcheck-api-regular"
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
  addArticle,
  getCategories,
};

const mapStatetoProps = (state) => ({
  catList: state.categories.list,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ArticleAdd);
