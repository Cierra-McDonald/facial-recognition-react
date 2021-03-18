import React, { Component } from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '6adb3b5cbeb54cd3b14d5605dc3ed5d3',
 });


const particleOptions = {
  particles: {
    number: { 
      value: 80,
      density: { 
        enable: true,
        value_area: 800,
      }
    }
   
  }
}



export default class App extends Component {
  constructor() { 
    super();
    this.state = {

        input: '',
        imageUrl: '',
    }
  }
  

  onInputChange = (e) => { 

    this.setState({
      input: e.target.value
    });

  }

  onButtonSubmit = (e) => { 
    console.log('click')

    this.setState({
      imageUrl: this.state.input
    })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
  .then((response) => {
  console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
})
.catch((err) => {
 console.log(err);
});

  }

  render() {
    return (
      <div className="App">
         <Particles className="particles" 
              params={particleOptions}
            />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit} />
       
        <FaceRecognition
        imageUrl={this.state.imageUrl} />
         
      </div>
    )
  }
}

