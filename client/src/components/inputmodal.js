import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import { Modal,ModalHeader,ModalBody,Button, Form, FormGroup, Label, Input} from 'reactstrap';


class InputModal extends React.Component{
    state={
        modal:false,
        name:" ",
        email:" ",
        count:" "
    };

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      };

    onChangeName = (e) => {
        this.setState({
            name:e.target.value
        });
    };

    onChangeEmail = (e) => {
        this.setState({
            email:e.target.value
        });
    };

    onChangeCount = (e) => {
        this.setState({
            count:e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            name:this.state.name,
            email:this.state.email,
            count:this.state.count
        };

        this.props.addItem(newItem);      //calling the action

        this.toggle();
    };

    render(){
        return(
            <div>
                <Button className="add-btn" 
                color="danger" 
                style={{marginBotom:'2rem'}}
                onClick={this.toggle}>
                    Add User 
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add new users</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                <Label for="item">User Details</Label>
                                <Input type="text" name="name" id="item" 
                                placeholder="Name" 
                                onChange={this.onChangeName}/>
                                <Input type="text" name="email" id="email" 
                                placeholder="email@.com" 
                                onChange={this.onChangeEmail}/>
                                <Input type="text" name="Article count" id="count" 
                                placeholder="No. of Articles" 
                                onChange={this.onChangeCount}/>
                                <Button color="info" style={{margin:'0.5rem'}}>Add +</Button>
                                </FormGroup>
                            </Form>    
                        </ModalBody>
                </Modal>
            </div>     
        );
    }
}

export default connect(null,{addItem})(InputModal);