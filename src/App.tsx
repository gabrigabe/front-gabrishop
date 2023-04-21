import { useState } from 'react'
import Login from './components/login'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register';




function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });


  return (
    <div className='App'>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>

    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
    </Routes>
    </BrowserRouter>
  
  </ThemeProvider>

</div>
);

  
}

export default App
