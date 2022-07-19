import axios from 'axios';
import authHeader from './auth_header';

const API_URL= process.env.VUE_APP_SERVER_URL;

class UserSerice{
    getAdmin(){
        return axios.get(API_URL + 'admin', {headers:authHeader()})
    }
    getUser(){
        return axios.get(API_URL + 'user', {headers: authHeader()})
    }

}



export default new UserSerice();