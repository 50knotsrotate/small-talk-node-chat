const express = require('express');
const chatroomController = require('./chatroom_controller')
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json())

app.listen(PORT, () => { 
    console.log(`Server started on port ${PORT}`)
})

app.get('/chatrooms', chatroomController.getAllChatRooms)
app.post('/chatrooms', chatroomController.createChatRoom)
app.get('/chatrooms/:chatRoomName', chatroomController.getChatRoomByName)
app.delete('/chatrooms/:chatRoomName', chatroomController.removeUserFromChat)
app.put('/chatrooms/:chatRoomName', chatroomController.updateWritingComment)
app.get('/users', chatroomController.getAllUsers)
app.put('/chatrooms/:chatroomname/:user', chatroomController.addComment)
app.delete('/chatrooms/:chatRoomName/comments/:id', chatroomController.deleteComment)
app.put('/chatrooms/:chatRoomName/comments/:id', chatroomController.editComment)
app.put('/chatrooms/:chatRoomName/comments/:id/edit', chatroomController.editingComment)
app.get('/chatrooms/:chatRoomName/comments/:id/submit', chatroomController.submitEdit)

