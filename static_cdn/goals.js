// import React, { Component } from 'react';

// import ReactDOM from 'react-dom';

import _ from 'lodash';

function component() {
  const element = document.createElement('div');
  element.innerHTML =  _.join(['Hello', 'lodash'], ' ');
  return element;
}
document.body.appendChild(component());

// // class Goal extends React.Component {
// // render() {
// //     return (
// //     <div style=>
// //         <h1>Helle Django + React = Awesomeness </h1>
// //     </div>);
// // }
// // }


// // ReactDOM.render(<Goal />, document.getElementById('root'));

// ReactDOM.render(
//     <h1>Hello, react!</h1>,
//     document.getElementById('root')
//   );

//   function component() {
//     const element = document.createElement('div');
//     element.innerHTML = 'Hello webpack';
//     return element;
//   }
//   document.body.appendChild(component());