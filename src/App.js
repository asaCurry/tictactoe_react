import React, { Component } from 'react';
import './App.css';
import Box from './Box';

class App extends Component {

  constructor(props) {
    super(props)

    this.state= {
      playerTurn: 1,
      rowsAndColumns: 3,
      playerVictory: null
    }

    this.createBoxGrid = this.createBoxGrid.bind(this);
    this.victoryCheck = this.victoryCheck.bind(this);
    this.boxPress = this.boxPress.bind(this);
    this.victoryCheck = this.victoryCheck.bind(this);
  }
// lifecycle

boxPress(){
  if(this.state.playerTurn === 1) {
    this.setState({
      playerTurn: 2
    })
  } else {
    this.setState({
      playerTurn: 1
    })
  }
  this.victoryCheck()
  console.log('victorycheck');
}
victoryCheck(){
  let rows = [];
  let columns =[];

  for( let i =0; i <= Math.pow(this.state.rowsAndColumns,2) ; i++){
   let currBox  = document.getElementById('boxNumber'+ i)
   console.log(currBox)
 }
 console.log(rows)
}
// functions and setup

createBoxGrid = () => {
  let grid = []

  for (let i = 0; i < (Math.pow(this.state.rowsAndColumns,2)); i++) {
    grid.push(<Box key={i + 1} boxIndex={i+1} playerTurn={this.state.playerTurn} boxPress={this.boxPress}/>)
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
