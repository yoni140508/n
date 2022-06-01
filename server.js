const 
express= require('express'),
app = express(),
jwt= require('jsonwebtoken'),
secret= "1234"

const users = [
    {
        _id: "1223344",
        name:"yoni",
        email:"yoni@gmail.com",
        pass:"1234"
    },
    {
        _id: "7894",
        name:"nati",
        email:"nati@gmail.com",
        pass:"4321"
    }
]

function authToken(token){
const decode = jwt.verify(token , secret)
const id= decode._id
const foundUser = users.find(n => n._id == id)
return foundUser
}

function login( email, pass){
    const foundUser= users.find( n => n.email == email)
    if(!foundUser || foundUser.pass !== pass) throw "not auth"
    return createToken(foundUser._id)
}

function createToken(id){
    const token = jwt.sign({_id: id}, secret, {expiresIn:"15m"})
    return token
}

function log (){
    try {
      const token =  login( "yoni@gmail.com", "1234")
      const res = authToken(token)
      console.log(res);
    } catch (error) {
        console.log(error);
    }
}
log()

app.listen(3210, () => console.log("server is up"))