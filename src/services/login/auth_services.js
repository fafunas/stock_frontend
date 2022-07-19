//Haremos las llamadas a la API mediante Axios 

import axios from "axios";

const API_URL= process.env.VUE_APP_SERVER_URL;

class AuthService {
    login(user) {
      return axios
        .post(API_URL + 'auth/login', {
          email: user.email,
          password: user.password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
          return response.data;
        });
    }
    logout() {
      localStorage.removeItem('user');
    }
   
  }

export default new AuthService();