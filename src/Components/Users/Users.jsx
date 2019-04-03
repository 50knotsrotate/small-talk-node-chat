import React from 'react';
import './Users.css'
const Users = (props) => { 
    
    return (
        <div  className="users-container">
            <h1>Users in this chatroom</h1>
            {props.users.map(user => <h2 key={Math.random()} className = 'user'>{user.userName}</h2>)}
      </div>
    );
    
    }
    
export default Users