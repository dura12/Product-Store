import { Box, useColorModeValue } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/homePage'
import CreatePage from './components/pages/createPage'
import NavBar from './components/navbar'

function App() {
  return (
    <>
    <Box minH={'100vh'} bg = {useColorModeValue("gray.200" , "gray.900")}  p={4}>
      <NavBar/>
      <Routes>
        <Route path ='/' element={<HomePage />} />
        <Route path ='/create' element={<CreatePage/>} />
      </Routes>
    </Box>
    </>
  )
}

export default App
