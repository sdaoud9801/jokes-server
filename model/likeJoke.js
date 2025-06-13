import { createClient } from "@supabase/supabase-js";
const supabase = createClient('https://avvnwugygqpxuupdvsif.supabase.co', process.env.DATABASE_KEY);


async function likeJoke(username,joke_id){
    let {error} = await supabase.from('likes').insert({username,joke_id})
    if (error) {
        if(error.code === '23505') {
            return
        } else {
            console.log(error);
            throw new Error("Error liking joke");
        }
        
    }
}

export default likeJoke;
