import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://avvnwugygqpxuupdvsif.supabase.co", process.env.DATABASE_KEY);

async function createJoke(username,content) {
    const {error} = await supabase
                            .from("jokes")
                            .insert({
                                username,
                                content,
                                time: new Date()
                            });
    if(error) {
        console.log(error);
        return false;
    } else {
        return true;
    }
}

export default createJoke;