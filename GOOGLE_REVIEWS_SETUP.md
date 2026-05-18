# Google Reviews Integration Setup Guide

This guide explains how to set up and manage Google Reviews integration for your website.

## Overview

The website now features dynamic Google Reviews that can be:
- Automatically synced from Google Places API
- Managed through the admin panel
- Displayed on the homepage with clickable links to Google Maps
- Cached locally with fallback reviews for reliability

## Features

### Frontend Features
- **Dynamic Reviews Display**: Shows top-rated or featured reviews on homepage
- **Clickable Review Cards**: Each review card is clickable and redirects to Google Maps
- **Hover Effects**: Visual feedback when hovering over review cards
- **Loading States**: Smooth loading experience while fetching reviews
- **Fallback Reviews**: Shows hardcoded reviews if API or database is unavailable

### Admin Features
- **Review Management Dashboard**: View all synced reviews
- **Sync from Google**: Manually trigger sync from Google Places API
- **Feature Reviews**: Mark specific reviews to be shown on homepage
- **Activate/Deactivate**: Control which reviews are visible
- **Statistics**: View total reviews, average rating, featured count, and active count
- **Delete Reviews**: Remove unwanted reviews from database

## Setup Instructions

⚠️ **IMPORTANT**: Before the "Sync from Google" feature will work, you must configure your Google Places API key. See `GOOGLE_API_SETUP.md` for detailed instructions.

### Quick Setup Summary

1. **Get Google Places API Key** from Google Cloud Console
2. **Configure the secret in Supabase**:
   - Go to Supabase Dashboard > Settings > Edge Functions > Secrets
   - Add secret: `GOOGLE_PLACES_API_KEY` = your API key
3. **Test the sync** by clicking "Sync from Google" in the admin panel

For detailed step-by-step instructions, see **GOOGLE_API_SETUP.md**

### Find Your Google Place ID (Optional)

The Place ID for I-SPORT Hospital is already configured: `ChIJnRFz6t2_wjsRhGLNLFJfKBs`

If you need to change it:
1. Use the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Edit the Place ID in `/supabase/functions/fetch-google-reviews/index.ts`
3. Redeploy the Edge Function

## How It Works

### Data Flow

1. **Sync Process**:
   - Admin clicks "Sync from Google"
   - System calls Google Places API
   - Fetches up to 5 reviews (Google API limitation)
   - Saves reviews to Supabase database
   - Marks 5-star reviews as "featured" automatically

2. **Display Process**:
   - Homepage loads and fetches top-rated reviews from database
   - Shows 4 most recent featured/high-rated reviews
   - If database is empty, shows fallback reviews
   - Each review card is clickable and links to Google Maps

3. **Click Behavior**:
   - User clicks on a review card
   - Opens the review's Google Maps URL in a new tab
   - Proper attribution to Google is maintained

### Database Schema

Reviews are stored in the `google_reviews` table with:
- `google_review_id`: Unique identifier from Google
- `author_name`: Reviewer's name
- `author_photo_url`: Reviewer's profile photo (if available)
- `rating`: Star rating (1-5)
- `review_text`: Full review content
- `review_date`: When review was posted
- `relative_time_description`: Human-readable time (e.g., "2 months ago")
- `google_review_url`: Direct link to review on Google Maps
- `is_featured`: Whether to prioritize on homepage
- `is_active`: Whether review is visible to public

## Admin Panel Usage

### Accessing Google Reviews Management

1. Log in to admin panel
2. Click "Google Reviews" in the sidebar
3. You'll see the Google Reviews Management dashboard

### Dashboard Overview

The dashboard shows:
- **Total Reviews**: Count of all synced reviews
- **Average Rating**: Average star rating across all reviews
- **Featured**: Number of reviews marked as featured
- **Active**: Number of reviews currently visible to public

### Managing Reviews

#### Sync from Google
- Click "Sync from Google" button
- System fetches latest reviews from Google Places API
- New reviews are added, existing reviews are updated
- 5-star reviews are automatically marked as featured

#### Feature a Review
- Click the award icon (🏆) on any review
- Featured reviews are prioritized for homepage display
- Featured reviews get a "Featured" badge

#### Activate/Deactivate
- Click the eye icon (👁️) to toggle visibility
- Inactive reviews are hidden from public but remain in database
- Useful for temporarily hiding specific reviews

#### Delete a Review
- Click the trash icon (🗑️)
- Confirm deletion
- Review is permanently removed from database

### Best Practices

1. **Regular Syncing**: Sync reviews weekly or monthly to keep content fresh
2. **Feature Management**: Manually feature the most compelling reviews
3. **Quality Control**: Deactivate reviews that may not represent your service well
4. **Monitor Statistics**: Keep track of your average rating and review count

## Google API Limitations

### 5 Review Limit
- Google Places API only returns 5 reviews per location
- These are Google's "most relevant" reviews
- Not necessarily the most recent or highest-rated

### Solutions for More Reviews
1. **Google My Business API**:
   - Requires business ownership verification
   - Can access more reviews
   - More complex setup

2. **Third-Party Services**:
   - Services like Outscraper, Featurable
   - Can fetch all reviews
   - May have additional costs

3. **Manual Entry**:
   - Copy notable reviews manually
   - Add through database or create admin interface

## Fallback System

The system includes a multi-tier fallback:

1. **Primary**: Fetch from Supabase database
2. **Secondary**: If database empty, attempt Google API call
3. **Tertiary**: If API fails, use hardcoded fallback reviews
4. **Guaranteed**: Users always see reviews, even if systems fail

Fallback reviews are stored in `/src/services/googleReviewsService.ts` in the `getFallbackReviews()` function.

## Cost Considerations

### Google Places API Pricing (as of 2024)
- Place Details requests: $17 per 1,000 requests
- Monthly free tier: $200 credit (approximately 11,700 requests)
- For typical usage (syncing once daily): Well within free tier

### Recommendations
- Sync manually or on a schedule (daily/weekly)
- Don't sync on every page load
- Use database cache to minimize API calls
- Monitor usage in Google Cloud Console

## Troubleshooting

### Reviews Not Syncing
1. **Check API Secret**: Ensure `GOOGLE_PLACES_API_KEY` is configured in Supabase Edge Functions secrets (see GOOGLE_API_SETUP.md)
2. **Verify API Enabled**: Confirm Places API is enabled in Google Cloud Console
3. **Check Quota**: Ensure you haven't exceeded API quota in Google Cloud Console
4. **Inspect Console**: Look for error messages in browser console (F12)
5. **Check Place ID**: Verify the Place ID is correct in the Edge Function code

### Reviews Not Displaying on Homepage
1. **Check Database**: Ensure reviews exist in `google_reviews` table
2. **Verify Active Status**: Confirm reviews are marked as `is_active = true`
3. **Check Network**: Look for failed requests in Network tab
4. **Fallback Active**: If showing fallback reviews, check database connection

### Clickable Links Not Working
1. **Check URL Format**: Ensure `google_review_url` contains valid URL
2. **Browser Popup Blocker**: Disable if new tabs aren't opening
3. **Inspect Element**: Check if `href` attribute is correctly set

## Security & Compliance

### Google Attribution Requirements
- ✅ Google logo is displayed with reviews
- ✅ Author name and photo are shown
- ✅ Reviews link back to Google Maps
- ✅ Review text is not modified
- ✅ "Posted on Google" indication present

### Data Privacy
- Reviews are public data from Google
- No personal information is collected beyond what Google provides
- Author photos are linked, not stored
- Complies with Google's Terms of Service

## Technical Details

### File Structure
```
src/
├── services/
│   └── googleReviewsService.ts    # Google API integration & database operations
├── pages/
│   ├── Home.tsx                    # Public reviews display
│   └── AdminGoogleReviews.tsx      # Admin management interface
└── lib/
    └── supabase.ts                 # Database types & client

supabase/migrations/
└── [timestamp]_create_google_reviews_table.sql
```

### Key Functions

**googleReviewsService.ts**:
- `fetchGoogleReviews()`: Fetches from Google Places API
- `syncReviewsToDatabase()`: Syncs reviews to Supabase
- `getReviewsFromDatabase()`: Retrieves all active reviews
- `getTopRatedReviews()`: Gets featured/high-rated reviews for homepage
- `getFallbackReviews()`: Returns hardcoded fallback reviews

## Future Enhancements

Potential improvements:
1. Automated scheduled syncing (using Supabase Edge Functions)
2. Email notifications for new reviews
3. Review response management
4. Sentiment analysis and categorization
5. Integration with other review platforms
6. Review widgets for embedding on other pages

## Support

For issues or questions:
1. Check the browser console for errors
2. Review the Supabase logs
3. Verify Google Cloud Console for API status
4. Check the admin dashboard statistics
5. Test with fallback reviews to isolate issues

## Additional Resources

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Supabase Documentation](https://supabase.com/docs)
- [Place ID Finder Tool](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
