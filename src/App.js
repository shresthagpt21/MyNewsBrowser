import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


const App =()=> {
  const pageSize=6;
  const [progress,setProgress]=useState(0);

    return (
      <BrowserRouter>
      
      <div>
       <Navbar />
       <LoadingBar
       height={4}
        color='#f11946'
        progress={progress}
      />
       <Routes>
       <Route exact path="/" element={<News setProgress={setProgress} key="home" pageSize={pageSize} country="in" category="general" />} />
       <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" />} />
       <Route exact path="/entertainment" element={<News setProgress={setProgress} pageSize={pageSize} key="entertainment" country="in" category="entertainment" />} />
       <Route exact path="/business" element={<News setProgress={setProgress} key="business"  pageSize={pageSize} country="in" category="business" />} />
       <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health" />} />
       <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science" />} />
       <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology" />} />
       <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports" />} />

      
       </Routes>
      </div>
    </BrowserRouter>
      
    )
}
export default App;