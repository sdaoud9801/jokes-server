import bcrypt from 'bcrypt';
const saltRounds = 5;

async function hashPassword(password) {
    let salt = await bcrypt.genSalt(saltRounds);
    let hashedPassword = await bcrypt.hash(password,salt);
    return hashedPassword;
};

export default hashPassword;