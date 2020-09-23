import React, { useEffect } from 'react';
import PageWrapper from '../layots/PageWrapper';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import {
	Form,
	Row,
	Col,
	FormControl,
	ListGroup,
	Button,
} from 'react-bootstrap';
import { getCategories } from '../sagas/actions/categories';
import FilterCategories from '../components/FilterCategories';

function Categories({ list, getCategories }) {
	useEffect(() => {
	 getCategories();
	}, [getCategories]);
	return (
		<PageWrapper>
			<Row className='justify-content-between'>
				<Col>
					<h2>Categories</h2>
				</Col>
				<Col className='text-right'>
					<Button type='button' className='btn-success'>
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

										<button type='button' className='close'>
											<span aria-hidden='true'>×</span>
										</button>
										<Link
											type='button'
											className='edit-btn'
											to={`/admin/category/${cat._id}`}
										>
											<span aria-hidden='true'>✎</span>
										</Link>
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
};

const mapStatetoProps = (state) => {
	return {
		list: state.categories.list,
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Categories);
