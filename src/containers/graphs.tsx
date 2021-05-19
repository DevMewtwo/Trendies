import React from 'react'
import GraphLeft from '../components/graphLeft';
import GraphCenter from '../components/graphCenter';
import GraphRight from '../components/graphRight';
import GraphLarge from '../components/graphLarge';
import '../App.css';

function Graphs() {
    return (
      <div id='GraphsContainer'>
        <div id='GraphLeft'>
          <GraphLeft />
        </div>
        <div id='GraphCenter'>
          <GraphCenter />
        </div>
        <div id='GraphRight'>
          <GraphRight />
        </div>
        <div id='GraphLarge'>
          <GraphLarge />
        </div>
      </div>
    )
}

export default Graphs;