import React from 'react';
import {Button,Modal,ModalHeader,ModalBody,Form, FormGroup, Label, Input} from 'reactstrap';
import {connect} from 'react-redux';
import {getItems,deleteItem,updateItem,getArticleCount,getGenreCount} from '../actions/itemActions';


class ShoppingList extends React.Component{
    state={
        modal:false,
        name:" ",
        email:" ",
        count:0,
        id:" "
    }
    componentDidMount(){
        this.props.getItems();      //calling the action
        this.props.getArticleCount();
        this.props.getGenreCount();
    }

    onDeleteClick = (id) =>{
        console.log(id)
        this.props.deleteItem(id);  //calling the action
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      };

    onEditClick = (id,name,email,count) =>{
        console.log(id)
        this.setState({id,name,email,count},() => { this.toggle(); })
    }

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

        this.props.updateItem(newItem,this.state.id);      //calling the action

        this.toggle();
    };

    render(){
        const {items}=this.props.item;
        //console.log(items);
        return(
            /*<div className="container">
                <CardDeck>
                    {
                    items.map(({_id,name})=>
                    <Card key={_id}>
                    <CardImg top width="25%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{name}</CardTitle>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                      <Button className="remove-btn" color="danger" size="sm"
                            onClick={this.onDeleteClick.bind(this,_id)}>
                        - </Button>
                    </CardBody>
                  </Card>
                    )
                     }
                
                </CardDeck>
            </div>    
           */
      <div className="container">
            <div className="row">
            { 
                items.map(({_id,name,email,count}) => {
            return (
                <section key={_id}>
                 {
                     (this.state.modal)?<Modal isOpen={this.state.modal} toggle={this.toggle}>
                     <ModalHeader toggle={this.toggle}>Edit User Details</ModalHeader>
                         <ModalBody>
                             <Form onSubmit={this.onSubmit}>
                                 <FormGroup>
                                 <Label for="item">User Detail</Label>
                                 <Input type="text" name="name" id="item" onChange={this.onChangeName}
                                 placeholder="user-name" value={this.state.name}
                                 />
                                 <Input type="text" name="email" id="email" onChange={this.onChangeEmail}
                                 placeholder="user@mail.com" value={this.state.email}
                                 />
                                 <Input type="text" name="Article count" id="count" onChange={this.onChangeCount}
                                 placeholder="article-count" value={this.state.count}
                                 />
                                 <Button type="submit" color="info" style={{margin:'0.5rem'}}>Update</Button>
                                 </FormGroup>
                             </Form>    
                         </ModalBody>
                 </Modal>:<div key={_id} className="col-md-4 col-lg-8" style={{ marginBottom:"2rem" }}>
                <div className="card_box">
                    <img 
                    className="card_img" 
                    src={"https://images.vexels.com/media/users/3/135248/isolated/preview/c242693ffb353188d2819ad2c6bcaaab-user-sign-over-red-square-by-vexels.png"} 
                    alt=" "/>
                    
                    <div className="card__text">
                        <h5 className="card__title">
                        {name}
                        </h5>
                        <p>Email: <span>
                        {email}
                        </span></p>
                        <p>
                        Article Count: <span>{count}</span>
                        </p>
                    </div>
                    <Button className="remove-btn" color="danger" size="sm"
                                    onClick={this.onDeleteClick.bind(this,_id)}>
                                Remove User</Button>
                    <Button className="edit-btn" color="warning" size="sm"
                                    onClick={this.onEditClick.bind(this,_id,name,email,count)}>
                                Edit</Button>         
                </div>
                </div>
                 }
                </section>
            );
            })}
            </div>
            </div> 
           
        
                );
            }
        }
const mapStateToProps = (state) => ({
    item:state.item   //from reducer
});
export default connect(mapStateToProps,{getItems,deleteItem,updateItem,getArticleCount,getGenreCount})(ShoppingList);