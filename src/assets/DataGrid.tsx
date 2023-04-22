import * as React from "react"
import { DataGrid, GridColDef } from "@mui/x-data-grid";



export default function Data(props: any) {


    const columns: GridColDef[] = [
        { field: 'product_name', headerName: 'Nome do produto', width: 300 },
        { field: 'product_description', headerName: 'Descrição do produto', width: 500 },
        { field: 'product_category', headerName: 'Categoria', width: 150 },
        { field: 'product_price', headerName: 'Preço', width: 100 },
        { field: 'quantity', headerName: 'Quantidade', width: 100 },
      ];
      
    function mapItems(items: Array<any>){
        return items.map((row: any) => {
            return{
                id: row._id,
                product_name: row.product_name,
                product_description: row.product_description,
                product_category: row.product_category,
                product_price: `R$ ${row.product_price}`,
                quantity: row.quantity,
            }
        })

    }

    return(
        <>
        {!props.props.products? <p>Carregando</p>:
        <DataGrid 
            rows={mapItems(props.props.products)}
            columns={columns} 
            sx={{marginTop: 5, marginBottom: 5}}
            />
    }
        </>

    )
}