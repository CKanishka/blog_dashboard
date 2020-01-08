import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class NavigationBar extends React.Component {
    state={
        collapsed:false
    }    
    
    toggle = () => {
        this.setState({collapsed:!this.state.collapsed})
    }
    
    
    render(){
        return(
            <div>
                
                <Navbar color="dark" dark>
                    <NavbarBrand href="/" className="mr-auto animated infinite pulse delay-5s">My Blog's Dashboard</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className="mr-2" />
                    <Collapse isOpen={this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="https://github.com/CKanishka/blog_dashboard">GitHub</NavLink>
                        </NavItem>
                    </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;