import React, {useState, useEffect} from 'react';
import './App.css';
import Graphs from './containers/graphs';
import Navbar from './containers/navbar';
import Sidebar from './containers/sidebar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
      <Graphs/>
      
    </div>
  );
}

export default App;