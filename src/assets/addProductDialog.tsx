import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuItem from '@mui/material/MenuItem';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useForm } from 'react-hook-form';
import { Margin } from '@mui/icons-material';
import ProductsService from '../services/ProductsService';

const currencies = [
    {
      value: 'USD',
      label: '$ - USD',
    },
    {
      value: 'EUR',
      label: '€ - EUR',
    },
    {
      value: 'BRL',
      label: 'R$ - BRL',
    },
  ];

export default function FormDialogAddProducts() {
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, formState: {errors}, setError } = useForm()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const addProduct = async ({name, category, description, price, quantity}: any) =>{
    try{
        const data = {
            product_name: name,
            product_description: description,
            product_category: category,
            product_price: Number(price),
            quantity: Number(quantity)
        }
        await ProductsService.addProducts(data)
        window.location.reload()
    
      handleClose()
    
      return alert('Produto cadastrado com sucesso!')

    }catch(err: any){
        
    }
    
}

  return (
    <div>
        <Button variant="contained" color="success" size="large" fullWidth onClick={handleClickOpen}>Cadastrar Produto</Button>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Cadastrar Produto</DialogTitle>
        <form onSubmit={handleSubmit(addProduct)}>
            <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', Margin: 10}}>
                <TextField
                 id="outlined-required"
                 label="Nome do produto"
                 defaultValue=""
                 margin="dense" 
                 fullWidth
                 type='text'
                 error={!!errors?.name}
                 helperText={!!errors?.name ? errors.name.message as unknown as string : null}
                 {...register("name", {
                     required: 'Campo obrigatorio!',
                     })}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', Margin: 10}}>
            <TextField
                 id="outlined-required"
                 label="Descrição do produto"
                 defaultValue=""
                 margin="dense" 
                 fullWidth
                 error={!!errors?.description}
                 helperText={!!errors?.description ? errors.description.message as unknown as string : null}
                 {...register("description", {
                     required: 'Campo obrigatorio!',
                     })}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', Margin: 10}}>
            <TextField
                 id="outlined-required"
                 label="Categoria"
                 defaultValue=""
                 margin="dense" 
                 fullWidth
                 error={!!errors?.category}
                 helperText={!!errors?.category ? errors.category.message as unknown as string : null}
                 {...register("category", {
                     required: 'Campo obrigatorio!',
                     })}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', Margin: 10}}>
            <TextField
                 id="outlined-required"
                 label="Preço"
                 defaultValue=""
                 margin="dense"
                 type='number'
                 fullWidth
                 error={!!errors?.price}
                 helperText={!!errors?.price ? errors.price.message as unknown as string : null}
                 {...register("price", {
                     required: 'Campo obrigatorio!',
                     })}/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', Margin: 10}}>
            <TextField
                 id="outlined-required"
                 label="Quantidade em estoque"
                 defaultValue=""
                 margin="dense"
                 type='number'
                 fullWidth
                 error={!!errors?.quantity}
                 helperText={!!errors?.quantity ? errors.quantity.message as unknown as string : null}
                 {...register("quantity", {
                     required: 'Campo obrigatorio!',
                     })}/>
            </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type='submit'>Adcionar</Button>
            </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}