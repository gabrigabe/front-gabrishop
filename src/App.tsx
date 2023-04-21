import { useState } from 'react'
import Login from './components/login'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/register';
import AuthService from './services/AuthService';
import Products from './components/productsPage'



function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  function RequireAuth({children, redirectTo}:any){
    let isAuth = AuthService.checkLogin()
    return isAuth ? children : <Navigate to={redirectTo}/>
  }


  return (
    <div className='App'>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/products' element={
          <RequireAuth redirectTo="/">
              <Products/>
          </RequireAuth>}>
        </Route>
      </Routes>
    </BrowserRouter>
  
  </ThemeProvider>

</div>
);

  
}

export default App
