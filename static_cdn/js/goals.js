function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
  }
  
  class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
        <div>
          <h1>Hello, world!</h1>
          <FormattedDate date={this.state.date} />
        </div>
      );
    }
  }
  
  function App() {
    return (
      <div>
        <Clock />
        <Clock />
        <Clock />
      </div>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
  
// const e = React.createElement;

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

// const domContainer = document.querySelector('#like_button_container');
// const root = ReactDOM.createRoot(domContainer);
// root.render(e(LikeButton));

// function WarningBanner(props) {
//     if (!props.warn) {
//       return null;
//     }
  
//     return (
//       <div className="warning">
//         Warning!
//       </div>
//     );
//   }
  
//   class Page extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {showWarning: true}
//       this.handleToggleClick = this.handleToggleClick.bind(this);
//     }
  
//     handleToggleClick() {
//       this.setState(prevState => ({
//         showWarning: !prevState.showWarning
//       }));
//     }
    
//     render() {
//       return (
//         <div>
//           <WarningBanner warn={this.state.showWarning} />
//           <button onClick={this.handleToggleClick}>
//             {this.state.showWarning ? 'Hide' : 'Show'}
//           </button>
//         </div>
//       );
//     }
//   }
  
//   const root = ReactDOM.createRoot(document.getElementById('root')); 
//   root.render(<Page />);


// const React   = require('react');
// const Profile = require('./Profile.jsx');

// React.renderComponent(
//   <Profile
//     username="Simon"
//     bio="My name is Simon. I make websites"
//     avatar="http://simonsmith.io/assets/images/me.jpg"
//   />,
//   document.body
// );



// import _ from 'lodash';
// import React from 'react';
// import ReactDOM from "react-dom";

// const React = require('react')

// ReactDOM.render(
//   <h1>Hello, react!</h1>,
//   document.getElementById('root')
// );

// const _ = require('lodash')

// function component() {
//   const element = document.createElement('div');
//   element.innerHTML =  _.join(['Hello', 'lodash'], ' ');
//   return element;
// }
// document.body.appendChild(component());

// import React, { Component } from 'react';

// import ReactDOM from 'react-dom';



// class Goal extends React.Component {
//     render() {
//         return (
//         <div style=>
//             <h1>Helle Django + React = Awesomeness </h1>
//         </div>);
//     }
// }


// ReactDOM.render(<Goal />, document.getElementById('root'));

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