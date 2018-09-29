import React, { Component } from 'react';
import Character from "./components/Character";
import Container from "./components/Container";
import Title from "./components/Title";
import characters from "./characters.json";


class App extends Component {

  state = {
    characters,
    clickedCharacters: [],
    correctGuessNumber: 0,
    topScore: 0
  };

  shuffleCharacters = (characters) => {
    let i = 0
        , j = 0
        , temp = null

    for (i = characters.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = characters[i]
        characters[i] = characters[j]
        characters[j] = temp
    }
   
    return characters;
}

shuffleArray = () => {
  this.setState({ characters: this.shuffleCharacters(this.state.characters) })
}

updateTopScore = (newState, cb) => {
  if (newState.clickedCharacters.length > newState.topScore) {
    newState.topScore++
    this.setState(this.state = newState)
  }
  cb(newState)
}

  handleClicked = (event) => {
    console.log('The character was clicked.')

    const name = event.target.attributes.getNamedItem("name").value;
    console.log(name)

    const newState = {...this.state}

    if (newState.clickedCharacters.includes(name)) {

        newState.correctGuessNumber = 0
        newState.clickedCharacters = []
        this.setState (
          this.state = newState
        )
      } else {
        newState.correctGuessNumber++
        newState.clickedCharacters.push(name)
        this.setState (
          this.state = newState
        )
      }
      this.shuffleArray();
    }

  render() {
    return (
      <div>
      <Title>
        <p >Score: {this.state.correctGuessNumber}</p>
        <p >Top Score: {this.state.topScore}</p>
        <p>Clicky Game</p>
        <p>Click on an image to earn points, but don't click on any more than once!</p>
      </Title>
      <Container>
      {this.state.characters.map ( characters => (
        <Character
        id={characters.id}
        key={characters.id}
        name={characters.name}
        image={characters.image}
        handleClicked={this.handleClicked}
        />
    ))}
      </Container>
      </div>
    );
  }
}

export default App;
