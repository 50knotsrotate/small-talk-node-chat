var chatRooms = [];
var allUsers = []
let i = 0;
module.exports = {
    getAllChatRooms: (req, res) => {
        res.status(200).send(chatRooms);
    },
    createChatRoom: (req, res) => {

        if (allUsers.indexOf(req.body.userName) >= 0 && allUsers.length) {
            res.status(404).send("That username is taken");
            return;
        }
        let newUser = {
            is_typing: false,
            userName: req.body.userName
        };
        allUsers.push(req.body.userName);
        if (
            !chatRooms.filter(
                chatroom => chatroom.chatRoomName == req.body.chatRoomName
            ).length
        ) {
            let newChatRoom = {
                chatRoomName: req.body.chatRoomName,
                comments: [],
                users: [],
                usersTyping: []
            };
            newChatRoom.users.push(newUser);
            chatRooms.push(newChatRoom);
            res.status(200).send(newChatRoom);
            return;
        }
        var chatRoom = chatRooms.filter(
            chatroom => chatroom.chatRoomName == req.body.chatRoomName
        )[0];
        chatRoom.users.push(newUser);
        res.status(200).send(chatRoom);
    },
    getAllUsers: (_, res) => {
        res.send(allUsers);
    },
    addComment: (req, res) => {
        let chatroom = chatRooms.filter(
            chatRoom => chatRoom.chatRoomName == req.params.chatroomname
        )[0];
        chatroom.comments.push({
            text: req.query.comment,
            user: req.params.user,
            id: i,
            editing: false,
            originalText: req.query.comment
        });
        i++;
         let commentIndex = chatroom.usersTyping.findIndex(user => user == req.params.user)
         chatroom.usersTyping.splice(commentIndex,1)
        res.send(chatroom);
    },
    deleteComment: (req, res) => {
        let chatroom = chatRooms.filter(
            chatRoom => chatRoom.chatRoomName == req.params.chatRoomName
        )[0];
        chatroom.comments.splice(parseInt(req.params.id), 1);
        res.status(200).send(chatroom);
    },
    editComment: (req, res) => {
        var chatroom = chatRooms.filter(
            chatRoom => chatRoom.chatRoomName == req.params.chatRoomName
        )[0];
        chatroom.comments[Number(req.params.id)].editing = true;
        res.status(200).send(chatroom);
    },
    editingComment: (req, res) => {
        let chatroom = chatRooms.filter(
            chatRoom => chatRoom.chatRoomName == req.params.chatRoomName
        )[0];
         chatroom.comments[Number(req.params.id)].text = req.query.text;
        chatroom.comments[Number(req.params.id)].editing = true;
        res.status(200).send(chatroom);
    },
    submitEdit: (req, res) => {
        let chatroom = chatRooms.filter(
            chatRoom => chatRoom.chatRoomName == req.params.chatRoomName
        )[0];
        chatroom.comments[Number(req.params.id)].editing = false;
        chatroom.comments[Number(req.params.id)].originalText = chatroom.comments[Number(req.params.id)].text;
        res.status(200).send(chatroom);
    },
    getChatRoomByName: (req, res) => {
        let chatroom = chatRooms.filter(
            chatRoom => chatRoom.chatRoomName == req.params.chatRoomName
        )[0];
        res.status(200).send(chatroom);
    },
    removeUserFromChat: (req, res) => {
        let chatroom = chatRooms.filter(
            chatRoom => chatRoom.chatRoomName == req.params.chatRoomName
        )[0];
        let userIndex = chatroom.users.findIndex(
            user => user.userName == req.query.username //here
        );
        var name = chatroom.users[userIndex];
        chatroom.users.splice(userIndex, 1);
         userIndex = allUsers.filter(user => user == req.query.username);
         allUsers.splice(userIndex, 1);

        res.status(200).send({
            chatroom,
            name
        });
   },
    updateWritingComment: (req, res) => { 
        let index = chatRooms.findIndex(chatroom => chatroom.chatRoomName == req.params.chatRoomName)
        if (chatRooms[index].usersTyping.indexOf(req.query.user) < 0 && req.query.textLength !== '0') {
           chatRooms[index].usersTyping.push(req.query.user)
            res.send(chatRooms[index].usersTyping)
            return
        }  else if (chatRooms[index].usersTyping.indexOf(req.query.user) >= 0 && req.query.textLength == 0) {
            let commentIndex = chatRooms[index].usersTyping.findIndex(user => user == req.query.user)
            chatRooms[index].usersTyping.splice(commentIndex, 1)
            
            return
        }  
        res.status(200).send(chatRooms[index].usersTyping)
        return
    }
};
