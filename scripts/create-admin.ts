import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables');
  console.error('Required: VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdminUser() {
  const email = 'admin@isportmedicalcentre.com';
  const password = 'P@ssword';

  console.log('🔐 Creating admin user...');
  console.log(`📧 Email: ${email}`);

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('ℹ️  User already exists. Updating password...');

        const { data: users } = await supabase.auth.admin.listUsers();
        const existingUser = users?.users.find(u => u.email === email);

        if (existingUser) {
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password }
          );

          if (updateError) {
            throw updateError;
          }

          console.log('✅ Admin user password updated successfully!');
          console.log(`\n📝 Login credentials:`);
          console.log(`   Email: ${email}`);
          console.log(`   Password: ${password}`);
          console.log(`\n🚀 You can now login at: /admin`);
        }
      } else {
        throw error;
      }
    } else {
      console.log('✅ Admin user created successfully!');
      console.log(`\n📝 Login credentials:`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`\n🚀 You can now login at: /admin`);
      console.log(`\n⚠️  IMPORTANT: Change this password after first login!`);
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdminUser();
