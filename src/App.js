import React, { Component } from 'react'
import './App.css';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Register from './components/Register/Register'
import SignIn from './components/SignIn/SignIn';


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

const initialState = { 
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: { 
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
export default class App extends Component {
  constructor() { 
    super();
    this.state = initialState;
  }

  loadUser = (data) => { 
    this.setState({user: { 
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined

    }})
  }

  calculateFaceLocation = (data) => { 
    const clarafaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById('inputimage');

    const width = Number(image.width);
    const height = Number(image.height);

    return { 
      leftColumn: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightColumn: width - (clarafaiFace.right_col * width),
      bottomRow: height - (clarafaiFace.bottom_row * height)
    }
  }

  displayRecognitionBox = (box) => { 
    this.setState({box : box});

  }
  
  onInputChange = (e) => { 
    this.setState({
      input: e.target.value
    });
  }

  onButtonSubmit = (e) => { 
   
    this.setState({imageUrl: this.state.input});

    fetch('https://young-badlands-76253.herokuapp.com/imageurl', { 
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) { 
          fetch('https://young-badlands-76253.herokuapp.com/image', { 
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
        
        .then(response => response.json())
        .then(count => { 
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log)


      }
        this.displayRecognitionBox(this.calculateFaceLocation(response))
    })  
      .catch(err => console.log(err)); 

  }

  onRouteChange = (route) => { 
    if (route === 'signout') {
      this.setState(initialState);
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
              <Rank
              entries={this.state.user.entries}
              name={this.state.user.name} />
              <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition
              imageUrl={this.state.imageUrl}
              box={this.state.box} />
          </div>
        : (
          this.state.route === 'signin' 
          ? <SignIn onRouteChange={this.onRouteChange}
          loadUser={this.loadUser} />
          : <Register onRouteChange={this.onRouteChange}
          loadUser={this.loadUser} />
          )  
        }
      </div>
    )
  }
}

