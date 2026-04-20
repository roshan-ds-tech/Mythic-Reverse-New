import { createClient } from "@supabase/supabase-js";
import fs from 'fs';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function main() {
  const { data, error } = await supabase.from('coupons').select('*');
  fs.writeFileSync('coupons_dump2.json', JSON.stringify({data, error}, null, 2), 'utf8');
}

main();
