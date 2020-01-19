import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newItem: "",
      list: []
    };
  }

  updateInput = (key, value) => {
    console.log("update");
    //update react state
    this.setState({
      [key]: value
    });
  };

  addItem = () => {
    console.log("add");
    //Create item with unique id
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };
    //copy of current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new item and rest newItem input
    this.setState({
      list,
      newItem: ""
    });
  };

  deleteItem = id => {
    //copy current list
    const list = [...this.state.list];

    //filter out item being deleted
    const updateList = list.filter(item => item.id !== id);

    this.setState({
      list: updateList
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          Task to do
          <br />
          <input
            type="text"
            placeholder="Enter new item..."
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <button onClick={() => this.addItem()}>Add</button>
          <br />
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}{" "}
                  <button onClick={() => this.deleteItem(item.id)}>X</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
