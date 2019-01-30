import React, { Component } from 'react';
import './App.css';
import Box from './Box';

class App extends Component {

  constructor(props) {
    super(props)

    this.state= {
      playerTurn: 1,
      rowsAndColumns: 3,
      boxesArray: [],
      playerVictory: null
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.createBoxGrid = this.createBoxGrid.bind(this);
    this.victoryCheck = this.victoryCheck.bind(this);
    this.nextPlayer = this.nextPlayer.bind(this);
    this.updateBoxesArray = this.updateBoxesArray.bind(this);
  }
// lifecycle

componentDidMount(){
  let totalBoxes = [];

  for( let i =0; i < Math.pow(this.state.rowsAndColumns,2) ; i++){
    totalBoxes.push(0)
  }
  this.setState({
    boxesArray: totalBoxes
  })
  console.log(this.state.boxesArray)
}
// functions
nextPlayer(){
  if(this.state.playerTurn === 1) {
    this.setState({
      playerTurn: 2
    })
  } else {
    this.setState({
      playerTurn: 1
    })
  }
  console.log(this.state.boxesArray)
}

updateBoxesArray(){
  let rows = [];

  for( let i =0; i < Math.pow(this.state.rowsAndColumns,2) ; i++){
   let currBox  = document.getElementById('boxNumber'+ (i+1))
   rows.push(parseInt(currBox.dataset.player))
 }
 this.setState({
   boxesArray: rows
 })

}
victoryCheck(){
  let vicCount = this.state.rowsAndColumns

  let rowCheck = 0;
  let columnCheck = 0;
  let diagCheckLeft = 0;
  let diagCheckRight = 0;
  // row
  for(let j = 0 ; j < Math.pow(this.state.rowsAndColumns,2); j += vicCount) {
      for(let i = 0; i < vicCount; i++){
        rowCheck += this.state.boxesArray[i+j]
      }
    if(rowCheck === -3 || rowCheck === 6){
      console.log('row victory!')
    }
    rowCheck = 0;
  }
  // column
  for(let j = 0 ; j < this.state.rowsAndColumns; j++) {

      for(let i = 0; i < Math.pow(this.state.rowsAndColumns,2); i+= vicCount){
        columnCheck += this.state.boxesArray[i+j]
      }
    if(columnCheck === -3 || columnCheck === 6){
      console.log('column victory!')
    }
    columnCheck = 0;
  }
  // diagonal
 for(let j = 0 ; j < this.state.rowsAndColumns; j++ ) {
    diagCheckLeft += this.state.boxesArray[(vicCount + 1) * j]
    if(diagCheckLeft === -3 || diagCheckLeft === 6){
      console.log('diagonal left victory!')
    }
  }
  // diagonal reverse
 for(let j = (this.state.rowsAndColumns) ; j >= 1; j-- ) {
    diagCheckRight += this.state.boxesArray[(vicCount - 1) * j]
    console.log((vicCount - 1) * j)
    if(diagCheckRight === -3 || diagCheckRight === 6){
      console.log('diagonal right victory!')
    }
  }
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
        {this.createBoxGrid()}
      </div>
    );
  }
}

export default App;
