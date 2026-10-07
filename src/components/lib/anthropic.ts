/**
 * Direct browser calls to the Claude API.
 *
 * WARNING: calling Anthropic from the browser exposes your API key to anyone
 * who opens devtools. This is fine for an internal tool behind a VPN or for a
 * dev spike. Before this goes anywhere public, move `polishRoleDescription`
 * behind your own backend and have the frontend call that instead — the
 * function signature stays the same, only the URL changes.
 */

const API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = import.meta.env.VITE_ANTHROPIC_MODEL || "claude-sonnet-5";
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You polish job descriptions for a recruitment agency in India.

You are given a rough role description written by a recruiter. Rewrite it so it
reads as a clear, professional job description.

Rules:
- Keep every concrete fact the recruiter wrote: skills, tools, years, team size,
  reporting lines, locations, certifications. Never invent a fact they did not
  give you.
- If the recruiter's notes are thin, keep the output short. Do not pad it out
  with generic filler about "fast-paced environments" or "dynamic teams".
- Structure it as a short intro paragraph, then "Key responsibilities" and
  "What we're looking for" as bullet lists, only where there is enough material.
- Indian English conventions. Use LPA for salary if salary is mentioned.
- Return only the polished description. No preamble, no markdown code fences,
  no commentary about what you changed.`;

export type PolishContext = {
  positionName?: string;
  clientName?: string;
  function?: string;
  role?: string;
  experience?: string;
  city?: string;
};

export async function polishRoleDescription(
  draft: string,
  context: PolishContext = {}
): Promise<string> {
  if (!API_KEY) {
    throw new Error(
      "VITE_ANTHROPIC_API_KEY is not set. Add it to your .env file and restart the dev server."
    );
  }

  const contextLines = Object.entries(context)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const userContent = contextLines
    ? `Role context:\n${contextLines}\n\nRecruiter's draft:\n${draft}`
    : `Recruiter's draft:\n${draft}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
      // Required for browser-originated requests
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Claude API error (${response.status}): ${detail}`);
  }

  const data = await response.json();

  return (data.content || [])
    .filter((block: any) => block.type === "text")
    .map((block: any) => block.text)
    .join("\n")
    .trim();
}