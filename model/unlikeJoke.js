import { createClient } from "@supabase/supabase-js";
const supabase = createClient('https://avvnwugygqpxuupdvsif.supabase.co', process.env.DATABASE_KEY);


async function unlikeJoke(name,id){
    let {error} = await supabase.from('likes').delete().eq('username',name).eq('joke_id',id);

    if (error) {
        if(error.code === '23505') {
            console.log(error);
            return
        } else {
            console.log(error);
            throw new Error("Error unliking joke");
        }
    }
}

export default unlikeJoke;