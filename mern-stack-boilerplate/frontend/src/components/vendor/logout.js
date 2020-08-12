import React, {Component} from 'react';



    
export default class Logout extends Component {

        render() {
                  localStorage.setItem('user',"1");
                  localStorage.setItem('type',"1");
                  window.location.reload();
        return (
      <div></div>
          
        )
    }
}
