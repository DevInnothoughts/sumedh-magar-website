import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface GooglePlacesReview {
  author_name: string;
  author_url?: string;
  language: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GooglePlacesResponse {
  result?: {
    reviews?: GooglePlacesReview[];
  };
  status: string;
  error_message?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const GOOGLE_PLACE_ID = "ChIJnRFz6t2_wjsRhGLNLFJfKBs";
    const GOOGLE_API_KEY = Deno.env.get("GOOGLE_PLACES_API_KEY");

    if (!GOOGLE_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: "Google Places API key not configured in Supabase",
          details: "Please configure GOOGLE_PLACES_API_KEY secret in Supabase Dashboard > Settings > Edge Functions > Secrets"
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`;

    const response = await fetch(url);
    const data: GooglePlacesResponse = await response.json();

    if (data.status === "OK" && data.result?.reviews) {
      return new Response(
        JSON.stringify({ 
          reviews: data.result.reviews,
          count: data.result.reviews.length 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } else {
      let errorMessage = data.error_message || "Unknown error from Google Places API";
      let userFriendlyMessage = errorMessage;

      if (data.status === "REQUEST_DENIED") {
        if (errorMessage.includes("billing")) {
          userFriendlyMessage = "Google Cloud billing is not enabled. Please enable billing in your Google Cloud Console at https://console.cloud.google.com/billing";
        } else if (errorMessage.includes("API key")) {
          userFriendlyMessage = "Invalid API key or Places API not enabled. Please check your Google Cloud Console.";
        }
      } else if (data.status === "INVALID_REQUEST") {
        userFriendlyMessage = "Invalid Place ID or request format.";
      } else if (data.status === "ZERO_RESULTS") {
        userFriendlyMessage = "No reviews found for this location.";
      }

      return new Response(
        JSON.stringify({
          error: userFriendlyMessage,
          status: data.status,
          rawError: errorMessage,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch reviews",
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
