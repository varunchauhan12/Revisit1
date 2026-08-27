// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { extractWithSocialCrawl } from "./socialcrawl";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

// @ts-ignore
Deno.serve(async (req: any) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: corsHeaders,
        });
    }

    try {
        const { url, platform, userId, preExtractedData } =
            await req.json();

        if (!url || !userId) {
            return new Response(
                JSON.stringify({
                    error: "Missing url or userId",
                }),
                {
                    status: 400,
                    headers: {
                        ...corsHeaders,
                        "Content-Type": "application/json",
                    },
                }
            );
        }

        let extracted;

        if (preExtractedData) {
            extracted = preExtractedData;
        } else {
            try {
                extracted = await extractWithSocialCrawl(url, platform);
            } catch (extractionErr) {
                console.error("extract-post: extraction failed, saving URL anyway:", extractionErr);
                extracted = { title: null, content: null, author: null };
            }
        }


        const supabase = createClient(
            // @ts-ignore

            Deno.env.get("SUPABASE_URL")!,
            // @ts-ignore
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );

        const { data, error } = await supabase
            .from("saves")
            .insert({
                user_id: userId,
                url,
                platform,

                title: extracted?.title ?? null,
                content: extracted?.content ?? null,
                author: extracted?.author ?? null,
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        return new Response(
            JSON.stringify({
                save: data,
            }),
            {
                headers: {
                    ...corsHeaders,
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (err) {
        console.error("extract-post error:", err)
        return new Response(JSON.stringify({
            error: err instanceof Error ? err.message : JSON.stringify(err)
        }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
});