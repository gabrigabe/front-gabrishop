import axios from "axios";


const API_URL = "http://localhost:3000/api/v1/";


class ProductsService {

    async getProducts(){
        const response = await axios.get(API_URL + "products");

        return response
    }
}

export default new ProductsService()