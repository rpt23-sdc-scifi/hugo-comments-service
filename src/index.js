import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
    this.getComments = this.getComments.bind(this);
  }

  getComments() {
    // console.log('hi');
    axios.get('http://localhost:4000/comments/1')
      .then(response => {
        const comments = response.data.data;
        this.setState({
          comments
        });
      });
  }

  componentDidMount() {
    this.getComments();
  }

  render() {
    return (
      <div className="container">
          {
            this.state.comments.map(comment =>
              // theres a bug if the modulus is a single didit it doesnt look like a time ie 3:1 when it should be 3:10
              <p>{comment.content} at {parseInt(comment.time_stamp / 60)}:{(comment.time_stamp % 60)}</p>
            )
          }
      </div>
    );
  }

};

ReactDOM.render(<App />, document.querySelector("#comments"));