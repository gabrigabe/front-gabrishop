import * as React from 'react'
import { Alert, Button, Container, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp, GridValueGetterParams, GridRowSelectionModel } from '@mui/x-data-grid';
import NavBarApp from "../assets/navBar";
import ProductsService from '../services/ProductsService';
import { Margin } from '@mui/icons-material';
import FormDialogAddProducts from '../assets/addProductDialog';
import AuthService from '../services/AuthService';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Products() {

    const [generalError, setGeneralError] = React.useState<any>({status: false, msg: 'Erro Desconhecido'})
    const [rows, setRows] = React.useState<GridRowsProp>([])
    const [selection, setSelection] = React.useState<GridRowSelectionModel>([]);
    const authed = AuthService.getCurrentUser()
    const navigate = useNavigate();


      
      const columns: GridColDef[] = [
        { field: 'product_name', headerName: 'Nome do produto', width: 300 },
        { field: 'product_description', headerName: 'Descrição do produto', width: 500 },
        { field: 'product_category', headerName: 'Categoria', width: 150 },
        { field: 'product_price', headerName: 'Preço', width: 100 },
        { field: 'quantity', headerName: 'Estoque', width: 100 },
        { field: 'quantity2', headerName: 'Quantidade', width: 100, editable: true, type:'number', },
      ];
      
   React.useEffect( () => {
        async function getData() {
            try{
                const res = await ProductsService.getProducts()

                const mappedRows = res.data.map((row: any) => {
                    return {
                        id: row._id,
                        product_name: row.product_name,
                        product_description: row.product_description,
                        product_category: row.product_category,
                        product_price: `R$ ${row.product_price}`,
                        quantity: row.quantity,
                        quantity2: 1

                    }
                })
                setRows(mappedRows)
                

            }catch(err: any){
                setGeneralError({status: true, msg: 'Falha ao tentar recuperar os produtos, tente novamente mais tarde!'})

            }
            
        }

        getData()
    }, [])

    async function handleSale(){
        try{
        const selectedProducts = selection
        .map(select => rows.find(row => row.id === select))
        .map((products: any) => {
            return {
                id: products.id , 
                qtd:products.quantity2
            }
        })
        await ProductsService.addSales({
            products: selectedProducts
        }, authed.access_token)
        alert('Compra realizada com sucesso!')
        window.location.reload()
    }catch(err: AxiosError | any){
        if(err.response.status === 401){
            alert('Sessão expirada!')
            AuthService.logout()
            navigate('/')
        }
        if(err.response.status === 400 && err.response.data.message.includes('stock')){
            setGeneralError({status: true, msg: 'Falha ao realizar compra: Um ou mais items sem estoque!'})
        }
        else{
            setGeneralError({status: true, msg: 'Erro desconhecido ao realizar compra, tente novamente mais tarde!'})
        }
    }
    }
    return(
        <>
        <NavBarApp/>
        <Container maxWidth="xl" sx={{border: 1,paddingTop: 15, paddingBottom: 15, backgroundColor:'#101010', borderColor:'#404040', marginTop: 10}}>
        { generalError.status === true  && (
                <Alert variant="filled" severity="error">
                {generalError.msg}
                </Alert>
             )}
        <Typography component="h1" variant="h3" align='center'>
            Produtos
          </Typography>

          <DataGrid 
          rows={rows} 
          columns={columns} 
          checkboxSelection
          onRowSelectionModelChange={setSelection}
          sx={{marginTop: 5, marginBottom: 5}}
          />
          
        <Button variant="contained" size="large" fullWidth onClick={handleSale} sx={{marginBottom: 2}}>
          Realizar Compra
        </Button>
        <FormDialogAddProducts/>
        </Container>
        </>

    )
}