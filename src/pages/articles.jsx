import React, { useEffect } from 'react';
import PageWrapper from '../layots/PageWrapper';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import {
	getArticles,
	removeArticle,
	changeActivityArticle,
} from '../sagas/actions/articles';
import { useHistory, Link } from 'react-router-dom';
import Filter from '../components/Filter';
import actionWrap from '../utils/actionWrapper';
import Tumbler from '../components/ui/Tumbler';

function Articles({ getArticles, list, removeArticle, changeActivityArticle }) {
	const history = useHistory();
	useEffect(() => {
		getArticles();
	}, []);

  useEffect(() => {
		
	}, [list]);

	const removeSuccesHandle = () => {
		Swal.fire('Deleted!', 'Article has been deleted.', 'success');
	};

	const handleError = (rej) => Swal.fire('Oops', rej, 'error');

	const removeHandler = (id) => (e) => {
		Swal.fire({
			title: 'Remove article?',
			text: 'Do you want to continue?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'No, cancel!',
		}).then((result) => {
			if (result.isConfirmed) {
				actionWrap(removeArticle, removeSuccesHandle, handleError, id);
			}
		});
	};

	const activityHandler = (id, active) => () => {
		return new Promise((resolve) => {
			actionWrap(changeActivityArticle, resolve, handleError, { active: !active }, id);
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
					<Button onClick={addHandler} type='button' className='btn-success'>
						Add article
					</Button>
				</Col>
			</Row>

			<Filter />

			<Row>
				<Col>
					<ListGroup className='articles'>
						{list &&
							list.map((article) => {
								return (
									<ListGroup.Item key={article._id}>
										{article.title}

										<div className='action-btn-group'>
											<Tumbler
												action={activityHandler(article._id, article.active)}
												active={article.active}
											/>
											<button
												type='button'
												className='close'
												onClick={removeHandler(article._id)}
											>
												<span aria-hidden='true'>×</span>
											</button>
											<Link
												type='button'
												className='edit-btn'
												to={`/admin/articles/${article._id}`}
											>
												<span aria-hidden='true'>✎</span>
											</Link>
										</div>
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
	changeActivityArticle,
};

const mapStatetoProps = (state) => ({
	list: state.articles.list,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Articles);
