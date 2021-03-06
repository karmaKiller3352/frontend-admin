import React, { useEffect } from 'react';
import PageWrapper from '../layots/PageWrapper';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import {
	getCategories,
	removeCategory,
	changeActivityCategory,
} from '../sagas/actions/categories';
import FilterCategories from '../components/FilterCategories';

import actionWrap from '../utils/actionWrapper';
import Tumbler from '../components/ui/Tumbler/index';

function Categories({
	list,
	getCategories,
	removeCategory,
	changeActivityCategory,
}) {
	useEffect(() => {
		getCategories();
	}, [getCategories, changeActivityCategory]);
  

	const history = useHistory();

	const addHandler = () => {
		history.push('/admin/categories/add');
	};

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
				actionWrap(removeCategory, removeSuccesHandle, handleError, id);
			}
		});
	};

  const activityHandler = (id, active) => () => {
		return new Promise((resolve) => {
			actionWrap(changeActivityCategory, resolve, handleError, { active: !active }, id);
		});
	};

	return (
		<PageWrapper>
			<Row className='justify-content-between'>
				<Col>
					<h2>Categories</h2>
				</Col>
				<Col className='text-right'>
					<Button onClick={addHandler} type='button' className='btn-success'>
						Add category
					</Button>
				</Col>
			</Row>
			<FilterCategories />
			<Row>
				<Col>
					<ListGroup className='categories'>
						{list &&
							list.map((cat) => {
								return (
									<ListGroup.Item key={cat._id}>
										{cat.title}
										<div className='action-btn-group'>
											<Tumbler
												action={activityHandler(cat._id, cat.active)}
												active={cat.active}
											/>
											<button
												type='button'
												onClick={removeHandler(cat._id)}
												className='close'
											>
												<span aria-hidden='true'>×</span>
											</button>
											<Link
												type='button'
												className='edit-btn'
												to={`/admin/categories/${cat._id}`}
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
		</PageWrapper>
	);
}

const mapDispatchtoProps = {
	getCategories,
	removeCategory,
	changeActivityCategory,
};

const mapStatetoProps = (state) => {
	return {
		list: state.categories.list,
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Categories);
