import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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


export default function Navigationbar() {
    const [isOpen, setIsOpen] = useState(false);

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
                                <Link to="/" class="nav-link menuitem" role="button">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/dashboard" class="nav-link menuitem" role="button">Dashboard</Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret className='menuitem'>Login</DropdownToggle>
                                <DropdownMenu className='dropmenu'>
                                    <Link class="dropdown-item" to='login/manager'>Manager</Link>
                                    <Link class="dropdown-item" to='login/employee'>Employee</Link>
                                    <DropdownItem divider />
                                    <Link class="dropdown-item" to='login/HR'>HR</Link>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <NavbarText>

                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        </>
    )
}
