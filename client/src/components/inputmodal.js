import React from "react";
import { connect } from "react-redux";
import { addItem, updateItem } from "../actions/itemActions";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

class InputModal extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
  };

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newItem = {
      name: name || this.props.user.name,
      email: email || this.props.user.email,
      password,
    };
    this.props.user
      ? this.props.updateItem(newItem, this.props.user._id)
      : this.props.addItem(newItem); //calling the action

    this.props.toggleShowModal();
  };

  render() {
    const { showModal, toggleShowModal, user } = this.props;
    return (
      <Modal isOpen={showModal} toggle={toggleShowModal}>
        <ModalHeader toggle={toggleShowModal}>User Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                defaultValue={user ? user.name : ""}
                onChange={this.onChangeName}
              />
              <Label for="email" className="mt-2">
                Email Id
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                placeholder="user@domain"
                defaultValue={user ? user.email : ""}
                onChange={this.onChangeEmail}
              />
              {!this.props.user && (
                <React.Fragment>
                  <Label for="password" className="mt-2">
                    Password
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={this.onChangePassword}
                  />
                </React.Fragment>
              )}
              <Button color="info" className="d-flex ml-auto my-2">
                {this.props.user ? "Update" : "Add +"}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default connect(null, { addItem, updateItem })(InputModal);
