import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../../sagas/actions/categories';
import { getArticles } from "../../sagas/actions/articles";

import { Form, Row, Col, FormControl } from 'react-bootstrap';



function Filter({ catList, getCategories, getArticles }) {

  const [query, setQuery] = useState({
    page: 1,
    search: "",
    search: ""
  });

	const addFilterHandler = ({ target: { name, value } }) => {
    setQuery((state) => ({
      ...state,
      [name]: value
    }));
	};
	useEffect(() => {
		if (catList.length === 0) getCategories();
	}, [catList, getCategories]);

  useEffect(() => {
    getArticles(query)
  }, [query, getArticles])

	const showCategories = () => {
		return (
			<Form.Group>
				<Form.Label>Select category</Form.Label>
				<Form.Control
					name='categories'
					onChange={addFilterHandler}
					as='select'
					className='mr-sm-2'
					id='inlineFormCustomSelect'
					custom
				>
					{catList &&
						catList.map((cat) => {
							return (
								<option value={cat._id} key={cat._id}>
									{cat.title}
								</option>
							);
						})}
					<option>Not choosed</option>
				</Form.Control>
			</Form.Group>
		);
	};

	return (
		<Form>
			<Row>
				<Col>
					<Form.Group>
						<Form.Label>Search article</Form.Label>
						<FormControl
              type='text'
              name="search"
							placeholder='Search'
							onChange={addFilterHandler}
						/>
					</Form.Group>
				</Col>
				<Col>{showCategories()}</Col>
			</Row>
		</Form>
	);
}
const mapDispatchtoProps = {
  getCategories,
  getArticles,
};

const mapStatetoProps = (state) => ({
	catList: state.categories.list,
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Filter);
