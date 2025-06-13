import { createClient } from '@supabase/supabase-js'
import hashPassword from './hash/hashPassword.js';
const supabase = createClient('https://avvnwugygqpxuupdvsif.supabase.co', process.env.DATABASE_KEY);

function validate(username, email, password) {
    let usernameValid = (username.length > 4) && (username.length < 12);
    let emailValid = (email.includes("@")) && (email.charAt(email.indexOf("@") + 1) != "");
    let passwordValid = (password.length > 8) && (password.length < 12);
    if (!usernameValid) {
        throw new Error("Username is invalid");
    } else if (!emailValid) {
        console.log(email);
        throw new Error("Email is invalid");
    } else if (!passwordValid) {
        throw new Error("Password is invalid");
    } else {
        return true;
    }
}

async function createUser(username, email, password) {
    validate(username, email, password);
    password = await hashPassword(password);
    const { error } = await supabase
        .from('users')
        .insert({ username, email, password });
    if (error) {
        if(error.code === "23505") {
            throw new Error("Username is taken");
        }
        console.log(error);
        throw new Error("Error adding to database");
    } else {
        return
    }
}

export default createUser;