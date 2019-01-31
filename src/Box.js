import React, { Component } from 'react';


class Box extends Component {

constructor(props){
  super(props)

  this.state= {
    xOrO: 0
  }

  this.toggleSymbol = this.toggleSymbol.bind(this);
  this.handleBoxPress = this.handleBoxPress.bind(this);
}

componentWillReceiveProps(props){
  const resetTrigger = this.props.resetTrigger;
  if (props.resetTrigger !== resetTrigger) {
    this.setState({
      xOrO: 0
    })
  }
}

toggleSymbol() {
  if(this.props.playerTurn === 1 && this.state.xOrO === 0){
    this.setState({
      xOrO: -1
    })
  } else if (this.state.xOrO === 0) {
    this.setState({
      xOrO: 2
    })
  }

}

handleBoxPress(){
  this.toggleSymbol();
  setTimeout(this.props.nextPlayer,100);
  setTimeout(this.props.updateBoxesArray,200);
  setTimeout(this.props.victoryCheck,300);
}

  render() {
    let symbol;

    if (this.state.xOrO === -1){
      symbol = <span>X</span>
    } else if (this.state.xOrO === 2) {
      symbol = <span>O</span>
    } else {
      symbol = <span></span>
    }

    return (
      <div className={"box"} id={"boxNumber"+this.props.boxIndex}
        onClick={this.handleBoxPress}
        data-player={this.state.xOrO}
         >
        {symbol}
      </div>
    );
  }
}

export default Box;
