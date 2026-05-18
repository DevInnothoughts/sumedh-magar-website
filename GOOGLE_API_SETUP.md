# Google Reviews API Setup - REQUIRED

## Current Issue

The "Sync from Google" button is not working because the Google Places API key needs to be configured in Supabase.

**Error**: `Google Places API key not configured`

## What You Need To Do

Follow these steps to configure the Google Places API key:

### Step 1: Get Your Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. **CRITICAL: Enable Billing First**:
   - Click "Billing" in the left sidebar (or top navigation)
   - Link a billing account (credit card required)
   - **Don't worry**: Google provides $200 free credit per month
   - You won't be charged unless you exceed the free tier
   - **⚠️ THE API WILL NOT WORK WITHOUT BILLING ENABLED**
4. Enable the **Places API**:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Places API"
   - Click "Enable"
5. Create API credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key (you'll need this in Step 2)
6. (Recommended) Restrict your API key:
   - Click on your API key to edit it
   - Under "API restrictions", select "Restrict key"
   - Choose "Places API" from the dropdown

### Step 2: Configure the Secret in Supabase

**IMPORTANT**: The API key must be configured as a secret in your Supabase project for the Edge Function to access it.

1. Go to your Supabase Dashboard: https://ahgiycinebsxuuhavqrs.supabase.co
2. Navigate to **Settings** (in the left sidebar at the bottom)
3. Click on **Edge Functions** under the "Configuration" section
4. Scroll down to "**Secrets**" section
5. Click "**Add new secret**"
6. Enter the following:
   - **Name**: `GOOGLE_PLACES_API_KEY`
   - **Value**: Paste your Google Places API key from Step 1
7. Click "**Save**"

### Step 3: Test the Sync

1. Go to your admin panel: `/admin/google-reviews`
2. Click the "**Sync from Google**" button
3. You should see a success message and reviews will be synced to your database

## How It Works

The application uses a Supabase Edge Function called `fetch-google-reviews` to securely fetch reviews from Google Places API. This Edge Function:

- Runs on the server side (avoiding CORS issues)
- Keeps your API key secure (not exposed in frontend code)
- Fetches up to 5 reviews from Google (API limitation)
- Returns the reviews to the frontend for syncing to the database

## Troubleshooting

### "Google Places API key not configured" Error
- **Cause**: The secret is not set in Supabase
- **Solution**: Complete Step 2 above

### "Google Cloud billing is not enabled" Error
- **Cause**: Billing is not enabled on your Google Cloud Project
- **Solution**:
  1. Go to https://console.cloud.google.com/billing
  2. Link a billing account to your project
  3. Agree to terms and add payment method
  4. Wait a few minutes for the change to propagate
  5. Try syncing again

### "Invalid API key or Places API not enabled" Error
- **Possible causes**:
  - Invalid API key
  - Places API not enabled in Google Cloud
  - API key restrictions blocking Supabase servers
- **Solution**:
  - Verify your API key is correct in Supabase secrets
  - Check that Places API is enabled in Google Cloud Console
  - If using API restrictions, ensure Supabase IPs aren't blocked

### "No reviews found for this location" Error
- **Cause**: The location has no reviews or Google isn't returning them
- **Solution**: This is normal if the location genuinely has no Google reviews yet

### Reviews Not Syncing
1. Open browser DevTools (F12)
2. Go to Console tab
3. Click "Sync from Google"
4. Look for error messages
5. Share the error message if you need help

## Google Places API Costs

- **Free Tier**: $200 credit per month (≈11,700 requests)
- **Place Details**: $17 per 1,000 requests after free tier
- **Typical Usage**: Syncing once per day = ~30 requests/month (well within free tier)

## Need Help?

If you encounter issues:
1. Verify the secret name is exactly `GOOGLE_PLACES_API_KEY` (case-sensitive)
2. Check that Places API is enabled in Google Cloud Console
3. Ensure your API key is not restricted to specific IPs that exclude Supabase's servers
4. Check the browser console for detailed error messages
