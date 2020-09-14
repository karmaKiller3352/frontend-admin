import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

function Header({ addClasses = null }) {
	return (
		<header className={`${addClasses ? addClasses : ''} bg-light`}>
			<div className='container'>
				<Navbar bg='light' expand='lg'>
					<Link className='navbar-brand' to='/admin'>
						ARTHOWS
					</Link>

					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto'>
							<NavLink className='nav-link' to='/admin/articles'>
								Articles
							</NavLink>
							<NavLink
								className='nav-link'
								to='/admin/categories'
							>
								Categories
							</NavLink>
							<NavLink className='nav-link' to='/admin/users'>
								Users
							</NavLink>
						</Nav>
					</Navbar.Collapse>
					<button type='button' className='btn btn-danger'>
						Log out
					</button>
				</Navbar>
			</div>
		</header>
	);
}

export default Header;
