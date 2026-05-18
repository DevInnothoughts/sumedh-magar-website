# Admin Setup Instructions

## Admin User Credentials

The admin user has been successfully created and is ready to use!

### Current Admin Login Details

**URL**: `https://yourwebsite.com/admin` (or `http://localhost:5173/admin` for development)

**Email**: `admin@isportmedicalcentre.com`
**Password**: `P@ssword`

**IMPORTANT**: Please change this password immediately after first login for security.

---

## Creating Additional Admin Users

### Option 1: Using the NPM Script (Recommended)

Run the following command to create an admin user:

```bash
npm run create-admin
```

This will create an admin account with:
- Email: `admin@isportmedicalcentre.com`
- Password: `P@ssword`

### Option 2: Using the Signup Page

1. Navigate to `/admin/signup` in your browser
2. Fill in the registration form with your desired credentials
3. Click "Create Admin Account"
4. You will be automatically redirected to the login page

### Option 3: Using Supabase Dashboard

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** (or **Invite User**)
4. Enter the email and password
5. Click **Create User** or **Send Invitation**

---

## Admin Panel Features (To Be Implemented)

The admin panel will include:

1. **Dashboard** - View statistics (posts, comments, testimonials, contacts)
2. **Posts Management** - Create, edit, delete posts/articles
3. **Comments Moderation** - Approve or delete user comments
4. **Testimonials Moderation** - Approve patient testimonials
5. **Contacts/Appointments** - View and manage contact form submissions
6. **Media Library** - Manage uploaded images and videos

---

## Quick Start After Admin Creation

1. Login at `/admin` with the credentials above
2. Change your password in account settings
3. Start creating content (posts, articles)
4. Moderate testimonials and comments as they come in
5. Review appointment requests from the contact form

---

## Security Notes

- The admin password should be strong and changed regularly
- Only share admin credentials with authorized personnel
- All user-generated content (comments, testimonials) requires approval before appearing publicly
- Row Level Security (RLS) is enabled on all database tables
- Authenticated users (admins) have full access to create/update/delete content

---

## Troubleshooting

### Login Issues

If you're having trouble logging in with the admin credentials:

**Problem**: "Invalid email or password" error

**Solutions**:

1. **Ensure the admin user exists**: Run `npm run create-admin` to create or verify the admin user

2. **Email confirmation required**: If Supabase has email confirmation enabled, you need to manually confirm the email:
   - **Option A**: Via Supabase Dashboard
     1. Go to https://supabase.com/dashboard
     2. Navigate to **Authentication** → **Users**
     3. Find `admin@isportmedicalcentre.com` and click to view details
     4. Manually confirm the email address

   - **Option B**: Via SQL Query
     1. Go to **SQL Editor** in Supabase Dashboard
     2. Run this query:
     ```sql
     UPDATE auth.users SET email_confirmed_at = NOW() WHERE email = 'admin@isportmedicalcentre.com';
     ```

3. **Check Supabase connection**: Verify that the `.env` file has correct Supabase credentials:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

4. **Clear browser cache**: Clear your browser cache and cookies, then try logging in again

5. **Check browser console**: Open browser developer tools (F12) and check the console for any error messages

**Problem**: "Email not confirmed" error

**Solution**: Follow step 2 above to manually confirm the email address in Supabase

---

## Support

For technical support or issues with the admin panel, please contact the development team.

---

*Generated for Dr. Sumedh Magar - I-Sport Medical Centre*
