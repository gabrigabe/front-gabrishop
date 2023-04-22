import * as React from 'react'
import NavBarApp from '../assets/navBar'
import { Alert, Container, Grid, Typography } from '@mui/material'
import ProductsService from '../services/ProductsService'
import AuthService from '../services/AuthService'
import { useNavigate } from 'react-router-dom'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import ItemsGrid from '../assets/DataGrid'


export default function ordersPage(){

    const [sales, setSales] = React.useState<Array<any>>([])
    const [generalError, setGeneralError] = React.useState<any>({status: false, msg: 'Erro Desconhecido'})
    const authed = AuthService.getCurrentUser()
    const navigate = useNavigate();


    React.useEffect( () => {
        async function getData() {
            try{
                console.log(sales)
                const res = await ProductsService.getUserSales(authed.access_token)

                setSales(res.data)      

            }catch(err: any){
                if(err.response.status === 401){
                    alert('Sessão expirada!')
                    AuthService.logout()
                    navigate('/')
                }
                setGeneralError({status: true, msg:'Falha ao carregar o histórico de vendas!'})

            }
            
        }

        getData()
    }, [])



    return(
        <>
        <NavBarApp/>
            <Container maxWidth="xl" sx={{border: 1,paddingTop: 5, paddingBottom: 5, backgroundColor:'#101010', borderColor:'#404040', marginTop: 10}}>
            { generalError.status === true  && (
                <Alert variant="filled" severity="error">
                {generalError.msg}
                </Alert>
                 )}

                <Typography component="h1" variant="h3" align='center'>
                  Meus pedidos
                 </Typography>

                 { sales.length === 0 && generalError.status === false ? <h4>Parece que você ainda não tem nenhum pedido realizado, que tal fazer um? :D</h4> :
                    sales.map((item: any) => (
                        <Grid sx={{ flexGrow: 1, border: 1, borderColor:'#404040', margin: 3, padding: 1, borderRadius: 1 }}>
                            <h1> Pedido id: {item._id}</h1>
                            <h2>Data do pedido: {item.sale_date}</h2>
                            <h2>Valor total do pedido: R$ {item.total_value}</h2>
                            <h2>Lista de produtos:</h2>
                            <ItemsGrid props={item}/>
                            

                        </Grid>
                ))}
             </Container>

        </>
    )
}