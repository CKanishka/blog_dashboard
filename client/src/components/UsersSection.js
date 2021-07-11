import React from "react";
import { connect } from "react-redux";
import {
  getItems,
  deleteItem,
  updateItem,
  getArticleCount,
  getGenreCount,
} from "../actions/itemActions";
import UserItem from "./UserItem";

class UsersSection extends React.Component {
  componentDidMount() {
    this.props.getItems(); //calling the action
    this.props.getArticleCount();
    this.props.getGenreCount();
  }
  
  editUser = (user) => {
    this.props.toggleShowModal(user)
  }

  deleteUser = (id) => {
    this.props.deleteItem(id); //calling the action
  };

  render() {
    const { items } = this.props.item;
    return (
      <div className="container">
        <div className="row">
          {items.map((user) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-2" key={user._id}>
              <UserItem user={user} editUser={()=>this.editUser(user)} deleteUser={this.deleteUser}></UserItem>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  item: state.item, //from reducer
});
export default connect(mapStateToProps, {
  getItems,
  deleteItem,
  updateItem,
  getArticleCount,
  getGenreCount,
})(UsersSection);
