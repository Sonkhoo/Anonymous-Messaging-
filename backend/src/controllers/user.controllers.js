import User from "../models/user.models.js";

// for creating new user and generating new link
const createUser = async (req, res) => {
    const {name} = req.body;
    if(!name){
        return res.status(400).send("Request body is missing");
    }
    const checkUser = await User.findOne({name: name});
    if(checkUser){
        return res.status(400).send("User already exists");
    }
    const newUser = User.create({
        name: name,
        Messages: []
});
    if(!newUser){
        return res.status(400).send("User could not be created");
    }
    return res.status(201).send("User created");
}

//for allowing other users to anonymously message.

const messageUser = async (req, res) => {
    const {link} = req.params;
    const {message} = req.body;
    const user = await User.findOne({link: link});
    console.log(link)
    console.log(user)
    if(!user){
        return res.status(404).send("User not found");
    }
    user.Messages.push(message);
    await user.save();
    return res.status(200).send("Message sent");
}

//for allowing the main user to fetch all the messages.

const fetchMessages = async (req, res) => {
    const {link} = req.params;
    const user = await User.findOne({link: link});
    if(!user){
        return res.status(404).send("User not found");
    }
    return res.status(200).send(user.Messages);
}
export {createUser, messageUser, fetchMessages}