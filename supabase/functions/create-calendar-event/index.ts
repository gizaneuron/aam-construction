import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { title, description, start, end, access_token } = await req.json();

    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/aamallsrq@gmail.com/events",     
    {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: title,
          description: description,
          start: {
            dateTime: start,
          },
          end: {
            dateTime: end,
          },
        }),
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});