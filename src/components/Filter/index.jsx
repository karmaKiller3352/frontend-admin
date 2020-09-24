import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../sagas/actions/categories';
import { getArticles } from '../../sagas/actions/articles';

import { Form, Row, Col, FormControl, Pagination } from 'react-bootstrap';

function Filter({ catList, getCategories, getArticles, pagination }) {
	const queryCat = { page: 'all' };
	const [query, setQuery] = useState({
		page: 1,
		search: '',
	});
	const categoriesHandler = ({ target: { name, value } }) => {
		setQuery((state) => ({
      ...state,
      page: 1,
			[name]: value,
		}));
	};

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
		getCategories(queryCat);
	}, [getCategories]);

	useEffect(() => {
		getArticles(query);
  }, [query, getArticles]);
  
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

	const showCategories = () => {
		return (
			<Form.Group>
				<Form.Label>Select category</Form.Label>
				<Form.Control
					name='categories'
					onChange={categoriesHandler}
					as='select'
					className='mr-sm-2'
					id='inlineFormCustomSelect'
					custom
				>
					{catList
						? catList.map((cat) => {
								return (
									<option value={cat._id} key={cat._id}>
										{cat.title}
									</option>
								);
						  })
						: null}
					<option value={null}>Not choosed</option>
				</Form.Control>
			</Form.Group>
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
				<Col>{showCategories()}</Col>
			</Row>
			{showPagination()}
		</div>
	);
}
const mapDispatchtoProps = {
	getCategories,
	getArticles,
};

const mapStatetoProps = (state) => {
	return {
		catList: state.categories.list,
		pagination: state.articles.pagination,
	};
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Filter);
