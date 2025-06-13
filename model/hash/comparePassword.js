import bcrypt from 'bcrypt';
async function comparePassword(password,hash) {
    let response = await bcrypt.compare(password,hash);
    return response;
}

export default comparePassword;