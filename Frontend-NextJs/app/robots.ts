import type { MetadataRoute } from 'next';

const SITE_URL = 'https://tourvistatours.com';

const DISALLOWED_PATHS = ['/dashboard', '/api/', '/bookings', '/reservations'];

const AI_SEARCH_AND_ASSISTANT_BOTS = [
  'OAI-SearchBot', // Powers ChatGPT's search results
  'ChatGPT-User', // Live fetch when a ChatGPT user asks about a page
  'Claude-SearchBot', // Powers Claude's web answers
  'Claude-User', // Live fetch triggered by a Claude user's request
  'PerplexityBot', // Perplexity's answer index
  'Perplexity-User', // Live fetch triggered by a Perplexity user's request
  'Google-Extended', // Grounding for Gemini / AI Overviews (separate from Googlebot)
  'Applebot-Extended', // Apple Intelligence / Siri
  'DuckAssistBot', // DuckDuckGo AI answers
  'Amazonbot', // Alexa+ answers
];

const AI_TRAINING_BOTS = [
  'GPTBot',
  'ClaudeBot',
  'anthropic-ai',
  'CCBot', // Common Crawl - feeds most open-source and third-party LLMs
  'Meta-ExternalAgent',
  'Bytespider', // ByteDance/TikTok - has a mixed robots.txt compliance record,
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: AI_SEARCH_AND_ASSISTANT_BOTS,
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
      {
        userAgent: AI_TRAINING_BOTS,
        allow: '/',
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
