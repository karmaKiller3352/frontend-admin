import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../sagas/actions/categories';
import { getArticles } from '../../sagas/actions/articles';

import { Form, Row, Col, FormControl, Pagination } from 'react-bootstrap';

function FilterCategories({  getCategories, pagination }) {
	const [query, setQuery] = useState({
		page: 1,
		search: '',
	});


	const searchHandler = ({ target: { value } }) => {
		if (value.length > 2 || value.length === 0) {
			setQuery((state) => ({
        ...state,
        page: 1,
				search: value,
			}));
		}
	};

	const paginationHandler = (number) => {
		setQuery((state) => ({
			...state,
			page: number,
		}));
	};
	useEffect(() => {
		getCategories(query);
	}, [getCategories, query]);




	const showPagination = () => {

    if(!pagination) return null
   
		const active = pagination.page;
    const items = [];
		for (let number = 1; number <= pagination.pages; number++) {
			items.push(
				<Pagination.Item
					key={number}
					active={number == active}
					onClick={() => paginationHandler(number)}
				>
					{number}
				</Pagination.Item>
			);
		}
		return (
			<div className='filter-pagination'>
				<Pagination>{pagination.pages > 1 ? items : null}</Pagination>
			</div>
		);
	};



	return (
		<div>
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>Search article</Form.Label>
						<FormControl
							type='text'
							name='search'
							placeholder='Search'
							onChange={searchHandler}
						/>
					</Form.Group>

				</Col>
			</Row>
			{showPagination()}
		</div>
	);
}
const mapDispatchtoProps = {
	getCategories,
	getArticles,
};

const mapStatetoProps = (state) => ({
	catList: state.categories.list,
	pagination: state.categories.pagination,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(FilterCategories);
