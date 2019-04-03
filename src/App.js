import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Users from "./Components/Users/Users";
import ChatWindow from "./Components/ChatWindow/ChatWindow";

class App extends Component {
  constructor() {
    super();

    this.state = {
      editChatRoomName: "", //changes as the user inputs a chatname.
      chatRoomName: "", //is set once the user hits submit, and is what will be passed as props thoughout the app
      editUsername: "", //will change as the user inputs username
      userName: "", //is set once the user hits submit, and is what will be passed as props thoughout the app
      submitted: false, //will be in charge of changing from home to chatroom once the user hits submit
      chatRoomData: null,
      addingComment: "",
      comment: '',
      newComment: "",
      usersTyping: []
    };
  }


  getData = () => {
    
     axios.get(`chatrooms/${this.state.chatRoomName}`)
       .then(res => {
         this.setState({
           chatRoomData: res.data,
           usersTyping: res.data.usersTyping
         })
       })
   }

  editingUserName = val => {
    this.setState({
      userName: val
    });
  };

  editingChatRoomName = val => {
    this.setState({
      chatRoomName: val
    });
  };

  createChatRoom = () => {
    const { chatRoomName, userName } = this.state;
    axios
      .post(`/chatrooms`, { chatRoomName, userName })
      .then(response => {
        this.setState({
          chatRoomData: response.data,
          submitted: true
        });
      })
      .catch(err => {
        this.errorHandler(err);
      });
    
  };

  goBack = () => {
    this.setState({
      submitted: false
    });
  };

  addingComment = val => { 
    this.setState({
      addingComment: val
    });
    axios.put(`/chatrooms/${this.state.chatRoomName}?user=${this.state.userName}&textLength=${val.length}`)
  };

  deleteComment = id => {
    axios
      .delete(`/chatrooms/${this.state.chatRoomName}/comments/${id}`)
  };

  submitComment = () => {
    axios
      .put(
        `/chatrooms/${this.state.chatRoomName}/${this.state.userName}?comment=${
          this.state.addingComment
        }`
      )
      .then(res => {
        this.setState({
          chatRoomData: res.data,
          addingComment: ""
        });
      });
  };

  toggleEdit = id => {
    axios.put(`/chatrooms/${this.state.chatRoomName}/comments/${id}`)
  };

  editingComment = (val, index) => { 
    axios.put(`/chatrooms/${this.state.chatRoomName}/comments/${index}/edit?text=${val}`)

  }

  submitEdit = (id) => { 
    axios.get(`/chatrooms/${this.state.chatRoomName}/comments/${id}/submit`)
  
  }

  errorHandler = error => {
    return alert(error.response.data);
  };

  render() {
    const home = (
      <div className="Home">
        <div className="content">
          <h1>Welcome to SmallTalk!</h1>
          <h4>Fill out the fields below to start</h4>
          <div className="home-inputs">
            <input
              className="home-input"
              type="text"
              placeholder="Chatroom"
              onChange={e => this.editingChatRoomName(e.target.value)}
            />
            <input
              className="home-input"
              type="text"
              placeholder="Username"
              onChange={e => this.editingUserName(e.target.value)}
            />
          </div>
          <button className="home-submit-button" onClick={this.createChatRoom}>
            Enter chat!
          </button>
        </div>
      </div>
    );
    return this.state.submitted ? (
      <div className="chatroom-container">
         <button className = 'go-back-button' onClick={this.goBack}><h1>Take me back</h1></button>
        <div className="chatroom-main">
          <ChatWindow
            user={this.state.userName}
            chatroom={this.state.chatRoomData.chatRoomName}
            comments={this.state.chatRoomData.comments}
            addingComment={this.addingComment}
            inputValue={this.state.addingComment}
            submitComment={this.submitComment}
            deleteComment={this.deleteComment}
            toggleEdit={this.toggleEdit}
            editing={this.state.editing}
            editingComment={this.editingComment}
            submit={this.submitEdit}
            getData={this.getData}
            usersTyping={this.state.usersTyping}
          />
          <Users users={this.state.chatRoomData.users} />
        </div>
      </div>
    ) : (
      home
    );
  }
}

export default App;