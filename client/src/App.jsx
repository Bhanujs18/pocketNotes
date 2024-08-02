import React from 'react'
import DashBoard from './pages/Dashboard/DashBoard'
import Share from './pages/Share/Share'
import{BrowserRouter , Routes , Route} from 'react-router-dom'
import ShareSubject from './pages/ShareedSubject/ShareSubject'

const App = () => {
  return (
    <BrowserRouter>
     <Routes>
       <Route path={"/"} element={<DashBoard />} />
       <Route path={"/sharedNotes/:id"} element={<Share />} />
       <Route path={"/sharedSubject/:subject"} element={<ShareSubject />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App