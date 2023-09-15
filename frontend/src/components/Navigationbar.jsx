import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
} from 'reactstrap';
import logo from '../assets/logo.png'
import '../styles/navbar.css'
import context from '../Context/context';


export default function Navigationbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { logged } = useContext(context)
    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div>
                <Navbar color="dark" dark expand="lg" sticky='top' className="sticky-navbar">
                    <NavbarBrand href="/"><img src={logo} alt="" className='logo' /></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto menu" navbar >
                            <NavItem>
                                <Link to="/" className="nav-link menuitem" role="button">Home</Link>
                            </NavItem>
                            {!logged &&
                                <>
                                    <UncontrolledDropdown nav inNavbar >
                                        <DropdownToggle nav caret className='menuitem'>Login</DropdownToggle>
                                        <DropdownMenu className='dropmenu'>
                                            <Link className="dropdown-item" to='login/manager'>Manager</Link>
                                            <Link className="dropdown-item" to='login/employee'>Employee</Link>
                                            <DropdownItem divider />
                                            <Link className="dropdown-item" to='login/HR'>HR</Link>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                            }
                            {logged &&
                                <>

                                    <NavItem>
                                        <Link to="/dashboard" className="nav-link menuitem" role="button">Dashboard</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar >
                                        <DropdownToggle nav caret className='menuitem'>{Cookies.get('person')}</DropdownToggle>
                                        <DropdownMenu className='dropmenu'>
                                            <Link className="dropdown-item" to='/logout'>Logout</Link>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>

                            }
                        </Nav>
                        <NavbarText>

                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        </>
    )
}
