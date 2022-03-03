import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import loadScript from "./components/loadScript";

class Comp1 extends React.Component {
 constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
 }

 componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }

 componentWillUnmount() { 
   window.removeEventListener('load', this.handleLoad)  
 }

 handleLoad() {
        loadScript("/resources/Auth/js//slider.js")
 
 }
 render() {
    return <App />
 }
}

ReactDOM.render(
    <Comp1/>,
  document.getElementById('root')
);

