import axios from 'axios';


const baseURL = "/"
export const getItems = () => dispatch => {
    dispatch(itemsLoading());
    axios
        .get(`${baseURL}/user`)
        .then(res=>{
            dispatch({
                type:'get-items',
                payload:res.data
            });
        })

};

export const getArticleCount = () => dispatch => {
    dispatch(itemsLoading());
    axios
        .get(`${baseURL}/articlecount`)
        .then(res=>{
            dispatch({
                type:'get-articlecount',
                payload:res.data
            });
        })

};

export const getGenreCount = () => dispatch => {
    dispatch(itemsLoading());
    axios
        .get(`${baseURL}/genrecount`)
        .then(res=>{
            dispatch({
                type:'get-genrecount',
                payload:res.data
            });
        })

};

export const deleteItem = id => dispatch => {
    axios.delete(`${baseURL}/user/${id}`).then(res =>
      dispatch({
        type: 'delete-item',
        payload: id
      })
    );
  };



export const addItem = (item) =>dispatch=> {
    axios
        .post(`${baseURL}/user`,item)
        .then(res=>{
            dispatch({
                type:'add-item',
                payload:res.data
            });
        })
    
};

export const updateItem = (item,id) =>dispatch=> {
    axios
        .put(`${baseURL}/user/${id}`,item)
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