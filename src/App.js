import React, { Component } from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register'

import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';

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
        box: {},
        route: 'signin',
        isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => { 
    const clarafaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputimage');

    const width = Number(image.width);
    const height = Number(image.height);

    console.log(width, height);

    return { 
      leftColumn: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightColumn: width - (clarafaiFace.right_col * width),
      bottomRow: height - (clarafaiFace.bottom_row * height)
    }
  }

  displayRecognitionBox = (box) => { 
    this.setState({box : box});

    console.log(box)
  }
  
  onInputChange = (e) => { 
    this.setState({
      input: e.target.value
    });
  }

  onButtonSubmit = (e) => { 
   
    this.setState({
      imageUrl: this.state.input
    });

    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayRecognitionBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err)); 

  }

  onRouteChange = (route) => { 
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if ( route === 'home') { 
      this.setState({isSignedIn: true})
    }
    this.setState({ route: route});
  }

  render() {
    return (
      <div className="App">
         <Particles className="particles" 
              params={particleOptions}
            />
        <Navigation
        onRouteChange={this.onRouteChange} 
        isSignedIn={this.state.isSignedIn}/>
        { this.state.route === 'home' 
        ?  <div>
              <Logo />
              <Rank />
              <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box} />
          </div>
        : (
          this.state.route === 'signin' 
          ? <SignIn onRouteChange={this.onRouteChange} />
          : <Register onRouteChange={this.onRouteChange} />
          )  
        }
      </div>
    )
  }
}

