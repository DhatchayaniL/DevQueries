import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Auth from './Pages/Auth/Auth'
import Home from './Pages/Home/Home'
import Questions from './Pages/Questions/Questions';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import Tags from './Pages/Tags/Tags'
import Users from './Pages/Users/Users'
import UserProfile from './Pages/UserProfile/UserProfile'
import DisplayQuestion from './Pages/Questions/DisplayQuestions'
import Landing from './Pages/CodeEditor/comp/Landing'

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
      <Routes>
          <Route path='/' element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
          <Route path="/codeeditor" element={<Landing slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
          <Route path='/Auth' element={<Auth />}/>
          <Route path='/AskQuestion' element={<AskQuestion />}/>
          <Route path='/Questions' element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
          <Route path='/Questions/:id' element={<DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn}/>}/>
          <Route path='/Tags' element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
          <Route path='/Users' element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
          <Route path='/Users/:id' element={<UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn}/>} />
      </Routes>
  )
}

export default AllRoutes