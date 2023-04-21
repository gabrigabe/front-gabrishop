
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    CssBaseline,
    Avatar,
    Grid,
    Link,
    Alert,
    AlertTitle,
  } from "@mui/material";
import { useState } from "react";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import AuthServices from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";


export default function Register(){
    const navigate = useNavigate()

    const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm()
    const [generalError, setGeneralError] = useState<boolean>(false)
    

    const registerWallet = async ({ first_name, last_name, email, password }: any) => {
        try{
            const data = {
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: password
            }
             await AuthServices.register(data)
             navigate('/login')


        }catch(err: any){
            console.log(err.response)
            if(err?.response?.data.message && err.response.data.message === "User already exists"){
                setError('email', {
                    type:'server',
                    message:'Email ja cadastrado!'
                })
            } else{
                setGeneralError(true)

            }
        }

         
      };

    return (
      <>
          <Container maxWidth="xs" sx={{border: 1, paddingBottom: 5, backgroundColor:'#101010', borderColor:'#404040', marginTop: 10}}>
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
            Falha ao se cadastrar, tente novamente mais tarde!
            </Alert>
         )}

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Registro
          </Typography>

          <form onSubmit={handleSubmit(registerWallet)}>
            <TextField
              id="outlined-required"
              label="Nome"
              defaultValue=""
              margin="dense" 
              fullWidth
              {...register("first_name", {
                  required: "Campo Obrigatorio!"

              })}
              error={!!errors?.first_name}
              helperText={!!errors?.first_name ? errors.first_name.message as unknown as string : null}
            />

            <TextField
              id="outlined-required"
              label="Sobrenome"
              defaultValue=""
              margin="dense" 
              fullWidth
              {...register("last_name", {
                  required: "Campo Obrigatorio!"

              })}
              error={!!errors?.last_name}
              helperText={!!errors?.last_name ? errors.last_name.message as unknown as string : null}
            />

            

            <TextField
              id="outlined-required"
              label="Email"
              defaultValue=""
              margin="dense" 
              fullWidth
              {...register("email", {
                required: "Campo Obrigatorio!",
                pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message:"Email invalido!"
                }

            })}
            error={!!errors?.email}
            helperText={!!errors?.email ? errors.email.message as unknown as string : null}
            />
            <TextField
              id="outlined-password-input"
              label="Senha"
              type="password"
              margin="dense"
              fullWidth
              {...register("password", {
                required: "Campo Obrigatorio!",
                minLength: {
                    value: 6,
                    message: "Senha precisa ter pelomenos 6 caracteres"
                }

            })}
            error={!!errors?.password}
            helperText={
                !!errors?.password ? errors.password.message as unknown as string : null}
            />

            <TextField
              id="outlined-password-input"
              label="Confirmar senha"
              type="password"
              margin="dense"
              fullWidth
              {...register("confirmaSenha", {
                required: "Campo Obrigatorio!",
                validate:(val: string ) => {
                    const { password } = getValues()
                    return password === val || "Senhas devem ser iguais!";
                }

            })}
            error={!!errors?.confirmaSenha}
            helperText={
                !!errors?.confirmaSenha ? errors.confirmaSenha.message as unknown as string : null}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
            >
              Registrar
            </Button>
            <Grid item>
                  <Link href="/" variant="body2">
                    {"Já possui uma conta? Entre!"}
                  </Link>
            </Grid>
            
          </form>
        </Box>
      </Container></>
      );
}