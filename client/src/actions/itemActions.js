import axios from 'axios';

export const getItems = () => dispatch => {
    dispatch(itemsLoading());
    axios
        .get('http://localhost:5000/api')
        .then(res=>{
            dispatch({
                type:'get-items',
                payload:res.data
            });
        })

};

export const deleteItem = id => dispatch => {
    axios.delete(`http://localhost:5000/api/${id}`).then(res =>
      dispatch({
        type: 'delete-item',
        payload: id
      })
    );
  };



export const addItem = (item) =>dispatch=> {
    axios
        .post('http://localhost:5000/api',item)
        .then(res=>{
            dispatch({
                type:'add-item',
                payload:res.data
            });
        })
    
};

export const updateItem = (item,id) =>dispatch=> {
    axios
        .put(`http://localhost:5000/api/${id}`,item)
        .then(res=>{
            dispatch({
                type:'update-item',
                payload:res.data
            });
        })
    
};

export const itemsLoading = (item) => {
    return{
        type:'items-loading'
    };
};