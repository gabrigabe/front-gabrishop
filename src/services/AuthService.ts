import axios from "axios";
import jwt_decode from 'jwt-decode';

const API_URL = "http://localhost:3000/api/v1/";


class AuthService {
  async login(data: object) {
    const response = await axios
          .post(API_URL + "auth", data);

      if (response.status === 201) {
        const info = jwt_decode(JSON.stringify(response))

        //@ts-ignore 
          Object.assign(info, response.data)
          localStorage.setItem("user", JSON.stringify(info));
      }

      if(response.status === 401){
        throw new Error('Unauthorized')
      }
      return response
  }
  logout() {
    localStorage.removeItem("user");
  }
  async register(data: object) {
    const register = await axios.post(API_URL + "users", data);
    return register
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user')|| '{}');;
  }


  checkLogin() {

    const currentUser = this.getCurrentUser()
    if(!currentUser.access_token) return false
    if(Date.now() < currentUser.exp) return false
    return true


}

}
export default new AuthService();