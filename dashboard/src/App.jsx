import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Add from '../src/Components/Add'
import Orders from './Components/Orders'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import ListItem from './Components/ListItem'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='flex' >
        <div className='w-1/5'>
          <Sidebar />
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Routes>
          <Route path='/' />
          <Route path='/additem' element={<Add />} />
          <Route path='/listitem' element={<ListItem />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter >
  )
}

export default App