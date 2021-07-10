import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const UserItem = ({ user: { _id, name, email },deleteUser,editUser }) => {
    const onRemoveClick = () => {
        deleteUser(_id)
    }
  return (
<Card>
    <CardImg
      top
      width="100%"
      src={
        "https://images.vexels.com/media/users/3/135248/isolated/preview/c242693ffb353188d2819ad2c6bcaaab-user-sign-over-red-square-by-vexels.png"
      }
      alt="Card Image"
    />
    <CardBody>
      <CardTitle tag="h6">{name}</CardTitle>
      <CardSubtitle className="mb-2 text-muted small">E-mail: {email}</CardSubtitle>
      <Button color="warning" size="sm" className="mr-2" onClick={editUser}>
        Edit
      </Button>
      <Button color="danger" size="sm" onClick={onRemoveClick}>
        Remove User
      </Button>
    </CardBody>
  </Card>)
};

export default UserItem;
