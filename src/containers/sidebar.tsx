import React from 'react';
import '../App.css';


function Sidebar(){
    return(
        <div id='sidebar'>
         <button id='savedCharts'>Saved Charts</button>
         <input id='tickerSearch' type='text' placeholder='Ticker Symbol'/>
         <button id='displayTech'>Display Tech</button>
        </div>
    );
};

export default Sidebar;