import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button } from "reactstrap";
import UsersSection from "./components/UsersSection";
import UserFormModal from "./components/UserFormModal";
import Chart from "./components/Chart";
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Header";

class App extends Component {
  state = {
    showModal: false,
    user:null
  };

  toggleShowModal = (user) => {
    this.setState({
      showModal: !this.state.showModal,
      user
    });
  };

  addUser = () => {
    this.toggleShowModal();
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <div className="container">
            <Chart />
          </div>
          <hr />
          <div>
            <Button color="info" className="m-2" onClick={this.addUser}>
              Add User
            </Button>
            <UserFormModal
              showModal={this.state.showModal}
              toggleShowModal={this.toggleShowModal}
              user={this.state.user}
            />
            <UsersSection toggleShowModal={this.toggleShowModal} />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
