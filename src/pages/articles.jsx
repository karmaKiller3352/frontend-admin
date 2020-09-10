import React, { useEffect } from 'react';
import PageWrapper from '../layots/PageWrapper';
import { connect } from 'react-redux';
import {
	Form,
	Row,
	Col,
	FormControl,
	ListGroup,
	Button,
} from 'react-bootstrap';
import CustomEditor from '../components/CustomEditor';
import Swal from 'sweetalert2';

import { getArticles, removeArticle } from '../sagas/actions/articles';
import { useHistory } from 'react-router-dom';

function Articles({ getArticles, list, removeArticle }) {
	const history = useHistory();
	useEffect(() => {
		getArticles();
	}, []);

	const removeHandler = (id) => (e) => {
		Swal.fire({
			title: 'Remove article?',
			text: 'Do you want to continue?',
			confirmButtonText: 'Cool',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
		}).then((result) => {
			if (result.isConfirmed) {
				new Promise((resolve) => {
					removeArticle(id, resolve);
				}).then(() => {
					Swal.fire(
						'Deleted!',
						'Article has been deleted.',
						'success'
					);
				});
			}
		});
	};

	const addHandler = () => {
		history.push('/admin/articles/add');
	};

	return (
		<PageWrapper>
			<Row className='justify-content-between'>
				<Col>
					<h2>Articles</h2>
				</Col>
				<Col className='text-right'>
					<Button
						onClick={addHandler}
						type='button'
						className='btn-success'
					>
						Add article
					</Button>
				</Col>
			</Row>

			<Form>
				<Row>
					<Col>
						<Form.Group>
							<Form.Label>Search article</Form.Label>
							<FormControl type='text' placeholder='Search' />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group>
							<Form.Label>Select category</Form.Label>
							<Form.Control as='select'>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
			</Form>

			<Row>
				<Col>
					<ListGroup className='articles'>
						{list &&
							list.map((article) => {
								return (
									<ListGroup.Item key={article._id}>
										{article.title}
										<button
											type='button'
											className='close'
											onClick={removeHandler(article._id)}
										>
											<span aria-hidden='true'>×</span>
											<span className='sr-only'>
												Close
											</span>
										</button>
									</ListGroup.Item>
								);
							})}
					</ListGroup>
				</Col>
			</Row>
			{/* <CustomEditor /> */}
		</PageWrapper>
	);
}

const mapDispatchtoProps = {
	getArticles,
	removeArticle,
};

const mapStatetoProps = (state) => ({
	list: state.articles.list,
	opened: state.articles.opened,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Articles);
