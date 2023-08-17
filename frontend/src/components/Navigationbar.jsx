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


export default function Navigationbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
            <div>
                <Navbar color="dark" dark expand="lg" fixed='top'>
                    <NavbarBrand href="/"><img src={logo} alt="" style={{ height: '10vh', width: '10.6vh', margin: '0.5vh' }} /></NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <Link href="/" class="nav-link" role="button">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/dashboard" class="nav-link" role="button">
                                    Dashboard
                                </Link>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Login
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Manager</DropdownItem>
                                    <DropdownItem>Employee</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>HR</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <NavbarText>Simple Text</NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        </>
    )
}
