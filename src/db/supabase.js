import { createClient } from '@supabase/supabase-js'
//* Burası sadece kullanıcı oluşturmak için var isterseniz veritabanı ile ilgi kısımları buraya yazabilirsiniz
const client = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_API_KEY,
    {}
)
export default client
