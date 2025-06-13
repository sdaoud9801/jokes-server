import { createClient } from "@supabase/supabase-js";
import comparePassword from "./hash/comparePassword.js";
const supabase = createClient("https://avvnwugygqpxuupdvsif.supabase.co",process.env.DATABASE_KEY);

async function getJokes(username){
    let {data,error} = await supabase.rpc('get_jokes',{usernameparam: username});
    if(error) {
        throw new Error(error.message);
    } else {
        return data;
    }
};

export default getJokes;