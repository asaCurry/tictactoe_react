import React, { Component } from 'react';
import './App.css';
import Box from './Box';

class App extends Component {

  constructor(props) {
    super(props)

    this.state= {
      playerTurn: 1,
      rowsAndColumns: 4,
      boxesArray: [],
      resetTrigger: false,
      playerVictory: "Let's Play!"
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.buildInitialArray = this.buildInitialArray.bind(this);
    this.refreshGame = this.refreshGame.bind(this);
    this.createBoxGrid = this.createBoxGrid.bind(this);
    this.declareVictory = this.declareVictory.bind(this);
    this.victoryCheck = this.victoryCheck.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.updateBoxesArray = this.updateBoxesArray.bind(this);
    this.completeTurn = this.completeTurn.bind(this);
  }
// lifecycle

componentDidMount(){
  this.buildInitialArray()
}

// functions
refreshGame(){
  this.buildInitialArray()
  this.setState({
    resetTrigger: !this.state.resetTrigger,
    playerTurn: 1,
    playerVictory: "Let's Play!"
  })
  console.log('reset')
}

completeTurn() {
  this.setState({
    boxesArray: this.updateBoxesArray()
  }, () => {
    this.setState({
      playerTurn: this.nextPlayer(),
      playerVictory: this.victoryCheck() || "Let's Play!"
    });
  });
}

buildInitialArray(){
  let totalBoxes = [];
  for( let i =0; i < Math.pow(this.state.rowsAndColumns,2) ; i++){
    totalBoxes.push(0)
  }
  this.setState({
    boxesArray: totalBoxes
  })
}

nextPlayer(){
  return this.state.playerTurn === 1 ? 2 : 1;
}

updateBoxesArray(){
    let newArray = [];
    for( let i =0; i < Math.pow(this.state.rowsAndColumns,2) ; i++){
     let currBox  = document.getElementById('boxNumber'+ (i+1))
     newArray.push(parseInt(currBox.dataset.player))
    }
    return newArray;
}

declareVictory(conditionCheck, declareX, declareY){
  if(conditionCheck === declareX){
    return "Player 1 wins!"
  } else if (conditionCheck === declareY) {
    return "Player 2 wins!"
  }
  return null;
}

victoryCheck(){
  let vicCount = this.state.rowsAndColumns

  let playerXVic = (0 - vicCount);
  let PlayerYVic = (2 * vicCount);

  let rowCheck = 0;
  let columnCheck = 0;
  let diagCheckLeft = 0;
  let diagCheckRight = 0;
  // row
  let victoryStatus = null;
  for(let j = 0 ; j < Math.pow(this.state.rowsAndColumns,2); j += vicCount) {
      for(let i = 0; i < vicCount; i++){
        rowCheck += this.state.boxesArray[i+j]
      }
    victoryStatus = this.declareVictory(rowCheck,playerXVic,PlayerYVic);
    if (victoryStatus !== null)
      return victoryStatus;

    rowCheck = 0;
  }
  // column
  for(let j = 0 ; j < this.state.rowsAndColumns; j++) {
      for(let i = 0; i < Math.pow(this.state.rowsAndColumns,2); i+= vicCount){
        columnCheck += this.state.boxesArray[i+j]
      }
      victoryStatus = this.declareVictory(columnCheck,playerXVic,PlayerYVic);
      if (victoryStatus !== null)
        return victoryStatus;
    columnCheck = 0;
  }
  // diagonal
 for(let j = 0 ; j < this.state.rowsAndColumns; j++ ) {
    diagCheckLeft += this.state.boxesArray[(vicCount + 1) * j]
    victoryStatus = this.declareVictory(diagCheckLeft,playerXVic,PlayerYVic);
    if (victoryStatus !== null)
      return victoryStatus;
  }
  // diagonal reverse
 for(let j = (this.state.rowsAndColumns) ; j >= 1; j-- ) {
    diagCheckRight += this.state.boxesArray[(vicCount - 1) * j]
    victoryStatus = this.declareVictory(diagCheckRight,playerXVic,PlayerYVic);
    if (victoryStatus !== null)
      return victoryStatus;
  }
  // box
  for(let i = 0 ; i < Math.pow(this.state.rowsAndColumns,2); i++ ) {
    let boxCheck = (
      this.state.boxesArray[i]+
      this.state.boxesArray[i + 1]+
      this.state.boxesArray[i + vicCount]+
      this.state.boxesArray[(i + 1) + vicCount]
    )
    victoryStatus = this.declareVictory(boxCheck, playerXVic,PlayerYVic);
    if (victoryStatus !== null)
      return victoryStatus;
   }

  // corner
    let cornerCheck = (
      this.state.boxesArray[0]+
      this.state.boxesArray[(vicCount -1)]+
      this.state.boxesArray[vicCount * (vicCount -1)]+
      this.state.boxesArray[Math.pow(vicCount,2) - 1]
    );
    victoryStatus = this.declareVictory(cornerCheck, playerXVic,PlayerYVic);
    return victoryStatus;

  }

// functions and setup



createBoxGrid = () => {
  let grid = []

  for (let i = 0; i < (Math.pow(this.state.rowsAndColumns,2)); i++) {
    grid.push(<Box key={i + 1}
      boxIndex={i+1}
      playerTurn={this.state.playerTurn}
      nextPlayer={this.nextPlayer}
      victoryCheck={this.victoryCheck}
      updateBoxesArray={this.updateBoxesArray}
      resetTrigger={this.state.resetTrigger}
      completeTurn={this.completeTurn}
      />)
  }
  return <div className={"box-grid "}
    style={
      {gridTemplateRows: 'repeat('+ this.state.rowsAndColumns +',100px)'},
      {gridTemplateColumns: 'repeat('+ this.state.rowsAndColumns +',100px)'}
    }>{grid}</div>
}

  render() {

    return (
      <div className="App">
        <h1>{this.state.playerVictory}</h1>
        <h2>Current Player: {this.state.playerTurn}</h2>
        {this.createBoxGrid()}
        <div className="buttonRow">
          <button className="resetButton" onClick={this.refreshGame}>Reset Game</button>
        </div>
      </div>
    );
  }
}

export default App;
