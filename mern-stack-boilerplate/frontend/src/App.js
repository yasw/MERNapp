import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Main from './components/main'
function App(){

  
  return(
    <Router>
      <div>
        <Main/>

    </div>
    </Router>
  )
}
export default App;
