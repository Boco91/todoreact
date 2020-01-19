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

  //incorporating local storage
  componentDidMount() {
    this.hydrateStateWithLocalStorage();

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
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
      <div>
        <h1 className="app-title">Task to do</h1>
        <div className="container">
          <div
            style={{
              padding: 30,
              textAlign: "center",
              maxWidth: 500,
              margin: "auto"
            }}
          >
            <br />
            <input
              className="input"
              type="text"
              placeholder="Enter new item..."
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
            />
            <button
              className="add-btn btn-floating"
              onClick={() => this.addItem()}
            >
              Add new item
            </button>
            <br />
            <ul>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    {item.value}{" "}
                    <button
                      className="delete-btn"
                      onClick={() => this.deleteItem(item.id)}
                    >
                      Delete item
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
