import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  pageSize=6;
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <BrowserRouter>
      
      <div>
       <Navbar />
       <LoadingBar
       height={4}
        color='#f11946'
        progress={this.state.progress}
      />
       <Routes>
       <Route exact path="/" element={<News setProgress={this.setProgress} key="home" pageSize={this.pageSize} country="in" category="general" />} />
       <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" />} />
       <Route exact path="/entertainment" element={<News setProgress={this.setProgress} pageSize={this.pageSize} key="entertainment" country="in" category="entertainment" />} />
       <Route exact path="/business" element={<News setProgress={this.setProgress} key="business"  pageSize={this.pageSize} country="in" category="business" />} />
       <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
       <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
       <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
       <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />

      
       </Routes>
      </div>
    </BrowserRouter>
      
    )
  }
}
