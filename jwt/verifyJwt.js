import jwt from 'jsonwebtoken';

function verifyJwt(token){
    let {username} = jwt.verify(token,process.env.JWT_KEY);
    return username;
}

export default verifyJwt;