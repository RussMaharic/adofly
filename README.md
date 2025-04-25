# AI Ad Generator - Setup Instructions

This application uses OpenAI's API to generate ad content and images. Follow these steps to set up the environment:

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

\`\`\`
OPENAI_API_KEY=sk-your-actual-api-key-here
\`\`\`

Replace `sk-your-actual-api-key-here` with your actual OpenAI API key. The key should start with "sk-".

## Getting an OpenAI API Key

1. Go to [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)
2. Sign in or create an account
3. Create a new API key
4. Copy the key (it starts with "sk-")
5. Paste it in your `.env.local` file

## Setting Up in Vercel

If you're deploying to Vercel:

1. Go to your project settings in the Vercel dashboard
2. Navigate to the "Environment Variables" section
3. Add a new variable with the name `OPENAI_API_KEY` and paste your API key as the value
4. Deploy your application

## API Usage

The application uses the following OpenAI models:
- GPT-4o for generating ad text content (headline, description, call to action)
- DALL-E 3 for generating ad images

## Rate Limits and Costs

Be aware of OpenAI's rate limits and pricing:
- GPT-4o has a rate limit of approximately 10,000 tokens per minute
- DALL-E 3 has a rate limit of approximately 50 images per minute
- Check OpenAI's pricing page for current costs: https://openai.com/pricing

## Troubleshooting

If you see an error about an invalid API key:

1. Make sure your API key is correctly copied from OpenAI (it should start with "sk-")
2. Ensure there are no extra spaces or quotes around the API key in your .env.local file
3. After updating the .env.local file, restart your development server
4. If using Vercel, redeploy your application after updating the environment variable
