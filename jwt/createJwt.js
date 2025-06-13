import jwt from 'jsonwebtoken';

function createJwt(username) {
    let jwtObject = {
        username,
    };
    let signedJwt = jwt.sign(jwtObject, process.env.JWT_KEY, {
        expiresIn: 60*60*72
    });
    return signedJwt;
}

export default createJwt;