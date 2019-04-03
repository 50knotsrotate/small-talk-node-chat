import React, { Component } from "react";
import "./ChatWindow.css";
import axios from 'axios'
import Comment from '../Comment/Comment'

import "./ChatWindow.css";

class ChatWindow extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            usersTyping: []
        }

    }
       

    pageClose = (e) => { 
        clearInterval(this.interval)
        axios.delete(`/chatrooms/${this.props.chatroom}?username=${this.props.user}`) 
    }

    componentWillMount = () => { 
        this.interval = setInterval(this.props.getData, 300)
        window.addEventListener("beforeunload", (e) => this.pageClose(e))   
    }

    componentWillReceiveProps = () => { 
        this.setState({
            usersTyping: this.props.usersTyping
        })
    }

    componentWillUnmount = ()  =>{ 
        clearInterval(this.interval)
        axios.delete(`/chatrooms/${this.props.chatroom}?username=${this.props.user}`)
        window.removeEventListener('beforeunload', () => { 
            return
        })
    }

    handleKey = (e) => { 
      return e.keyCode == 13 ? this.props.submitComment() : null
    }

    render() {
        return (
            <div className="chat-window">
                <h1>{`Welcome to the ${this.props.chatroom} chatroom, ${this.props.user}!`}</h1>
                <div className="comments-container">
                    {this.props.comments.map((comment, i) => {
                        return (
                            <Comment
                                key={i}
                                username={comment.user}
                                user={this.props.user}
                                editing={comment.editing}
                                index={i}
                                text={comment.text}
                                originalText={comment.originalText}
                                delete={this.props.deleteComment}
                                toggleEdit={this.props.toggleEdit}
                                editingComment={this.props.editingComment}
                                submit={this.props.submit}
                            />
                        );
                    })}
                </div>
                <div className="comment-form">
                        <input
                        onKeyDown={(e) => this.handleKey(e)}
                        placeholder='Say something nice...'
                        className="comment-input"
                        onChange={e => this.props.addingComment(e.target.value)}
                        value={this.props.inputValue}
                    />
                    {this.state.usersTyping.length ? <h4 className='typing-user'>{`${this.state.usersTyping[0]} is typing...`} </h4> : <div style={{marginBottom: '20px'}}></div>}
                </div>       
            </div>
        );
    }
};

export default ChatWindow;