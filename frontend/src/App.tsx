import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Profile, SignIn, SignUp, TagPosts, UserProfile } from './pages'
import "./App.css"

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />}/>
          <Route path='/posts/:tagname' element={<TagPosts />} />
          <Route path='/user-posts/:id' element={<UserProfile />} />
          {/* {verify?<Route path='/*' element={<Navigate to="/dashboard"/>}/>:<Route path='/*' element={<Navigate to="/"/>}/>} */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
