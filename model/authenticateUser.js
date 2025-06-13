import { createClient } from "@supabase/supabase-js";
import comparePassword from "./hash/comparePassword.js";
const supabase = createClient("https://avvnwugygqpxuupdvsif.supabase.co",process.env.DATABASE_KEY);

async function authenticateUser(username,password){
    const {error,data} = await supabase.from('users').select().eq("username",username);
    if(error) {
        console.log(error);
        throw new Error("An error occured");
    } else if(!data[0]) {
        throw new Error("User not found");
    } else {
        let hash = data[0].password;
        let success = comparePassword(password,hash);
        return success;
    }
}

export default authenticateUser;