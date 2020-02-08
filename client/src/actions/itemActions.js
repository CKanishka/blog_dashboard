import axios from 'axios';

const PORT = process.env.PORT || 5000
const baseURL = "/api"
export const getItems = () => dispatch => {
    dispatch(itemsLoading());
    axios
        .get(`${baseURL}`)
        .then(res=>{
            dispatch({
                type:'get-items',
                payload:res.data
            });
        })

};

export const deleteItem = id => dispatch => {
    axios.delete(`${baseURL}/${id}`).then(res =>
      dispatch({
        type: 'delete-item',
        payload: id
      })
    );
  };



export const addItem = (item) =>dispatch=> {
    axios
        .post(`${baseURL}`,item)
        .then(res=>{
            dispatch({
                type:'add-item',
                payload:res.data
            });
        })
    
};

export const updateItem = (item,id) =>dispatch=> {
    axios
        .put(`${baseURL}/${id}`,item)
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