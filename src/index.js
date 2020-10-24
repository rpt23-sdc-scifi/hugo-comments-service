import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import styled from 'styled-components';

const TolyComment = styled.span`
  border: none;
  color: #202020;
  font-family: Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-size: 12px;
`;

const TolyUserComment = styled.span`
  border: none;
  color: #C0C0C0;
  font-family: Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;
  font-size: 12px;
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
    this.getComments = this.getComments.bind(this);
  }

  getComments(id) {
    // console.log('hi');
    // let commentsId = window.location.pathname.substring(1);
    // console.log(commentsId);
    axios.get(`/comments/${id}`)
      .then(response => {
        const comments = response.data.data;
        this.setState({
          comments
        });
      });
  }

  componentDidMount() {
    let commentsId = window.location.pathname.substring(1);
    console.log(commentsId);
    console.log('worked');
    this.getComments(commentsId);
  }

  render() {
    return (
      <div className="container">
          {
            this.state.comments.map(comment =>
              // theres a bug if the modulus is a single didit it doesnt look like a time ie 3:1 when it should be 3:10
              <React.Fragment key={comment.comment_id}>
                <TolyUserComment>Frankie Roberts 4 at {parseInt(comment.time_stamp / 60)}:{(comment.time_stamp % 60)}</TolyUserComment><br></br>
                <TolyComment>{comment.content} </TolyComment>
              </React.Fragment>

            )
          }
      </div>
    );
  }

};

ReactDOM.render(<App />, document.querySelector("#comments"));