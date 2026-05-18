import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing required environment variables');
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createAdminUser() {
  const email = 'admin@isportmedicalcentre.com';
  const password = 'P@ssword';

  console.log('🔐 Creating admin user...');
  console.log(`📧 Email: ${email}`);

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: 'admin',
        },
        emailRedirectTo: undefined,
      },
    });

    if (error) {
      if (error.message.includes('already registered') || error.message.includes('User already registered')) {
        console.log('ℹ️  Admin user already exists with this email.');
        console.log('\n📝 Login credentials:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        console.log('\n🚀 You can now login at: /admin');
      } else {
        throw error;
      }
    } else if (data.user) {
      console.log('✅ Admin user created successfully!');
      console.log(`\n📝 Login credentials:`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`\n🚀 You can now login at: /admin`);
      console.log(`\n⚠️  IMPORTANT: Change this password after first login!`);

      if (!data.user.email_confirmed_at) {
        console.log(`\n⚠️  NOTE: If email confirmation is enabled in Supabase, you need to:`);
        console.log(`   1. Go to Supabase Dashboard → Authentication → Users`);
        console.log(`   2. Find the admin user and click to view details`);
        console.log(`   3. Manually confirm the email address`);
        console.log(`   OR run this SQL query in Supabase SQL Editor:`);
        console.log(`   UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = '${email}';`);
      }
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdminUser();
