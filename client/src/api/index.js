import axios from  'axios';

// const API=axios.create({baseURL:'https://us-central1-ecommerce-mern-project-backend.cloudfunctions.net/app' ,withCredentials: true,});

export const host='http://localhost:5000/';

const API=axios.create({baseURL:host ,withCredentials: true,});
API.interceptors.request.use((req)=>{
    // console.log(req);
    
    return req;
});

const config = { headers: { "Content-Type": "application/json" } };




export const register=(formData)=>API.post('auth/register',formData,config);
export const login=(formData)=>API.post('auth/login',formData,config);
export const setAvatar=(userId,image)=>API.post(`auth/setAvatar/${userId}`,{image});
// =>(console.log(image))
export const allUsersRoute=(userId)=>API.get(`auth/allusers/${userId}`);


export const sendMessageRoute=(formData)=>API.post(`messages/addmsg`,formData);
export const getAllMessagesRoute=(formData)=>API.post(`messages/getmsg`,formData)