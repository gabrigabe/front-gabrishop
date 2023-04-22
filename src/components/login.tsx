import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AuthService from '../services/AuthService';
import { Alert } from '@mui/material';

export default function Login() {


 //   const [email, setEmail] = useState<string>()
    const [generalError, setGeneralError] = useState<boolean>(false)
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}, setError} = useForm()


 
  const tryLogin = async ({email, senha}: any) => {
      try{
      const data = {email, password: senha}

      await AuthService.login(data)
      navigate('/products')
      }catch(err: any){
        if(err.message === 'Request failed with status code 401'){
        setError('email', {
            type:'server',
            message:'Usuario ou senha invalidos!'
        })

        setError('senha', {
            type:'server',
            message:'Usuario ou senha invalidos!'
        })}
        else{
            setGeneralError(true)


    }

  };
}

  return (
    <>
      <Container maxWidth="xs" sx={{border: 1, paddingBottom: 15, backgroundColor:'#101010', borderColor:'#404040', marginTop: 10}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            { generalError  && (
                <Alert variant="filled" severity="error">
                Falha ao fazer login, tente novamente mais tarde!
                </Alert>
             )}

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(tryLogin)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              {...register("email", {
                required: {value: true, message: 'Campo Obrigatorio!'},
                pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message:"Email invalido!"
                }

            })}
            error={!!errors?.email}
            helperText={!!errors?.email ? errors.email.message as unknown as string : ''}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("senha", {
                  required: {value: true, message: 'Campo Obrigatorio!'},

              })}
              error={!!errors?.senha}
              helperText={!!errors?.senha ? errors.senha.message as unknown as string : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container sx={{ml:10}}>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Não possui uma conta? Registre-se!"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container></>
  );
}