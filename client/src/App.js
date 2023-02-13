import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import {Register,Chat,Login} from './screens';
import { SetAvatar } from './components';
const App = () => {
  return (
   <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path='/' element={<Chat />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App