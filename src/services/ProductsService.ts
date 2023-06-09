import axios from "axios";


const API_URL = "http://localhost:3000/api/v1/";


class ProductsService {

    async getProducts(){
        const response = await axios.get(API_URL + "products");

        return response
    }
    async addProducts(data: object){
        const response = await axios.post(API_URL + "products", data);

        return response
    }
    async addSales(data: object, token: string){
        const response = (await axios.post(API_URL + "sales", data,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }))

        return response
    }

    async getUserSales(token: string){
        const response = (await axios.get(API_URL + "sales",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }))

        return response
    }
}

export default new ProductsService()