import React from 'react';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import { Modal,ModalHeader,ModalBody,Button, Form, FormGroup, Label, Input} from 'reactstrap';


class EditModal extends React.Component{
    state={
        name:" ",
        email:" ",
        count:" "
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

        this.props.toggle();
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
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>Edit User Detail</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                <Label for="item">User Details</Label>
                                <Input type="text" name="name" id="item" 
                                placeholder="Name" defaultValue={this.props.name}
                                onChange={this.onChangeName}/>
                                <Input type="text" name="email" id="email" 
                                placeholder="email@.com" defaultValue={this.props.email}
                                onChange={this.onChangeEmail}/>
                                <Input type="text" name="Article count" id="count" 
                                placeholder="No. of Articles" defaultValue={this.props.count}
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

export default connect(null,{addItem})(EditModal);