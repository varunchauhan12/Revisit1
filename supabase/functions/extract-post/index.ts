// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// @ts-ignore
Deno.serve( async (req : any) => {
    if( ( req.method === "OPTIONS") ){
        return new Response("ok", { headers: corsHeaders });
    }


    try{
        const { url, platform, userId, preExtractedData } = await req.json()
        if (!url || !userId) {
            return new Response(JSON.stringify({ error: 'Missing url or userId' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
        }

        let extracted

        if(preExtractedData){
            extracted = preExtractedData
        }else if(url.includes('github.com')){
            extracted = await extractGithub(url)
        }else {
            extracted = { title: null, content: null, author: null }
        }


        const supabase = createClient(
            // @ts-ignore

            Deno.env.get('SUPABASE_URL')!,
            // @ts-ignore
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        )

        const { data, error} = await supabase.from('saves').insert({
            user_id: userId,
            url,
            platform,
            title: extracted.title ?? null,
            content: extracted.content ?? null,
            author: extracted.author ?? null,
        }).select().single();

        if (error) throw error


        return new Response(JSON.stringify({ save: data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });


    }catch(err) {
        console.error("extract-post error:", err)
        return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    }
})

// ---- GITHUB ----
async function extractGithub(url: string) {
    const parts = new URL(url).pathname.split('/').filter(Boolean)
    const [owner, repo, type, number] = parts

    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
    // @ts-ignore
    const token = Deno.env.get('GITHUB_TOKEN')
    if (token) headers['Authorization'] = `Bearer ${token}`

    if (type === 'issues' || type === 'pull') {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`, { headers })
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`)
        const issue = await res.json()
        return { title: issue.title, author: issue.user?.login, content: issue.body }
    } else {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers })
        if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`)
        const repoData = await res.json()
        return { title: repoData.full_name, author: repoData.owner?.login, content: repoData.description }
    }
}