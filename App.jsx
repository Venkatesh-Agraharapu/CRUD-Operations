import React from 'react'
import Get from './components/Get'
import Post from './components/Post'
import Put from './components/Put'
import Delete from './components/Delete'
import{Routes,Route} from 'react-router-dom'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Get/>} ></Route>
        <Route path="Post" element={<Post/>} ></Route>
        <Route path="/Put/:paramId" element={<Put/>} ></Route>
        <Route path="/Delete/:paramId" element={<Delete/>} ></Route>
      </Routes>
    </div>
  )
}

export default App