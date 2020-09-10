import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { addArticle } from '../sagas/actions/articles';

function AddArticle({ addArticle, opened }) {
	const [currentFields, setField] = useState({
		categories: '1',
	});
	const history = useHistory();

	const submitHandler = (e) => {
		e.preventDefault();
		if (currentFields.content.length > 0) {
			const data = new FormData(e.target);
			data.append('content', currentFields.content);
			new Promise((resolve) => {
				addArticle(data, resolve);
			}).then(() => {
				Swal.fire('Success!', 'Article added', 'Success');
			});
		} else {
			Swal.fire('Required!', 'You have to add content.', 'error');
		}
	};

	const addFileHandler = ({ target: { name, files } }) => {
		console.log(files[0]);
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
	console.log(currentFields);
	return (
		<PageWrapper>
			<h2>Add article</h2>
			<Row>
				<Col>
					<Form onSubmit={submitHandler}>
						<Form.Group>
							<Form.Label>Title</Form.Label>
							<FormControl
								required='required'
								placeholder='Input article title'
								aria-label='title'
								name='title'
								onChange={changeInputHandler}
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
								value={currentFields.categories || 1}
							>
								<option defaultValue={1}>1</option>
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
							/>
						</Form.Group>
						<Form.Group className='mt-3'>
							<CustomEditor
								data={'1'}
								name='content'
								onChange={editorHandler}
							/>
						</Form.Group>

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
								<Button type='submit' className='btn-info'>
									Save and edit
								</Button>
								&#8195; &#8195;
								<Button type='submit' className='btn-success'>
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
};

const mapStatetoProps = (state) => ({
	opened: state.articles.opened,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(AddArticle);
