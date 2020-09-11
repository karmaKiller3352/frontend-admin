import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PageWrapper from '../layots/PageWrapper';
import Swal from 'sweetalert2';
import {
	Form,
	Row,
	Col,
	FormControl,
	InputGroup,
	Button,
} from 'react-bootstrap';
import CustomEditor from '../components/CustomEditor/index';
import { editArticle, setArticle } from '../sagas/actions/articles';
import actionWrap from '../utils/actionWrapper';

function ArticleEdit({ opened, editArticle, setArticle }) {
	const history = useHistory();
	const [saveBtn, setSaveBtn] = useState('');
	const [currentFields, setField] = useState({});

	const { id } = useParams();

	const handlerSucces = () => {
		Swal.fire('Success!', 'Article saved', 'success').then(() => {
			if (saveBtn === 'save-and-return') {
				history.push('/admin/articles/');
			} else {
				history.push(`/admin/articles/${currentFields._id}`);
			}
		});
	};

	const handlerSuccesSet = (res) => {
		setField({ ...res, categories: res.categories._id || null });
	};

	const handlerError = (rej) => {
		console.log(rej);
		Swal.fire('Oops', rej, 'error');
	};

	useEffect(() => {
		console.log(id);
		if (id !== opened._id) {
			actionWrap(setArticle, handlerSuccesSet, handlerError, id);
		}
	}, []);

	const submitHandler = (e) => {
		e.preventDefault();

		if (currentFields.content.length > 0) {
			const data = new FormData(e.target);
			data.append('content', currentFields.content);
			actionWrap(editArticle, handlerSucces, handlerError, data, id);
		} else {
			Swal.fire('Required!', 'You have to add content.', 'error');
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

	const handleBack = () => {
		Swal.fire({
			title: 'Close adding?',
			text: 'Do you want to continue?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				history.push('/admin/articles/');
			}
		});
	};

	const showPreviewImg = () => {
		return (
			currentFields.image && (
				<img
					src={currentFields.image}
					className='preview-img'
					alt='Preview image'
				/>
			)
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
								type='text'
								required='required'
								placeholder='Input article title'
								aria-label='title'
								name='title'
								onChange={changeInputHandler}
								value={currentFields.title || ''}
							/>
						</Form.Group>
						<Form.Label>URL</Form.Label>
						<InputGroup className='mb-3'>
							<InputGroup.Prepend>
								<InputGroup.Text>
									{`${process.env.REACT_APP_DEV_HOST}/articles/`}
								</InputGroup.Text>
							</InputGroup.Prepend>
							<FormControl
								required='required'
								name='url'
								value={currentFields.url || ''}
								onChange={changeInputHandler}
								id='basic-url'
								aria-describedby='basic-addon3'
							/>
						</InputGroup>
						<Form.Group>
							<Form.Label>Select category</Form.Label>
							<Form.Control
								onChange={changeInputHandler}
								name='categories'
								as='select'
								className='mr-sm-2'
								id='inlineFormCustomSelect'
								custom
							>
								<option
									value={
										currentFields.categories || 'Не выбрана'
									}
								>
									Не выбрана
								</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
								<option value={5}>5</option>
							</Form.Control>
						</Form.Group>

						<Form.Group>
							<Form.Label>Meta title</Form.Label>
							<FormControl
								onChange={changeInputHandler}
								placeholder='Article title'
								aria-label='Meta title'
								name='metaTitle'
								value={currentFields.metaTitle || ''}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Meta description</Form.Label>
							<FormControl
								onChange={changeInputHandler}
								as='textarea'
								placeholder='Article description'
								aria-label='Meta description'
								name='metaDesc'
								value={currentFields.metaDesc || ''}
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<CustomEditor
								data={currentFields.content}
								name='content'
								onChange={editorHandler}
							/>
						</Form.Group>

						<Form.Group>{showPreviewImg()}</Form.Group>
						<Form.Group className='mt-3'>
							<Form.File.Label>Article thumb</Form.File.Label>
							<input
								className='form-control-file'
								type='file'
								name='image'
								onChange={addFileHandler}
								id='formcheck-api-regular'
							/>
						</Form.Group>

						<Form.Row className='justify-content-between'>
							<Col>
								<Button
									type='button'
									onClick={handleBack}
									className='btn-danger'
								>
									Cancel
								</Button>
							</Col>

							<Col className='text-right'>
								<Button
									type='submit'
									onClick={() => {
										setSaveBtn('save-and-edit');
									}}
									className='btn-info'
								>
									Save and edit
								</Button>
								&#8195; &#8195;
								<Button
									type='submit'
									onClick={() => {
										setSaveBtn('save-and-return');
									}}
									className='btn-success'
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
};

const mapStatetoProps = (state) => ({
	opened: state.articles.opened,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ArticleEdit);
