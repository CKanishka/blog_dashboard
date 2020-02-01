import axios from 'axios';

const PORT = process.env.PORT || 5000
const baseUrl = process.env.baseURL || "http://localhost:5000"
export const getItems = () => dispatch => {
    dispatch(itemsLoading());
    axios
        .get(`${baseUrl}/api`)
        .then(res=>{
            dispatch({
                type:'get-items',
                payload:res.data
            });
        })

};

export const deleteItem = id => dispatch => {
    axios.delete(`${baseUrl}/api/${id}`).then(res =>
      dispatch({
        type: 'delete-item',
        payload: id
      })
    );
  };



export const addItem = (item) =>dispatch=> {
    axios
        .post(`${baseUrl}/api`,item)
        .then(res=>{
            dispatch({
                type:'add-item',
                payload:res.data
            });
        })
    
};

export const updateItem = (item,id) =>dispatch=> {
    axios
        .put(`${baseUrl}/api/${id}`,item)
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