import openai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure API key
openai.api_key = os.environ.get('OPENAI_API_KEY')

def generate_ad_content(objective, target_audience):
    """Generate ad content using OpenAI API"""
    try:
        # If OpenAI API key is configured, use it
        if openai.api_key:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert ad copywriter."},
                    {"role": "user", "content": f"""
                    Create ad content for a {objective} campaign targeting {target_audience}. 
                    Format your response as JSON with the following fields:
                    - title: A short, attention-grabbing title (max 40 chars)
                    - headline: A compelling headline (max 50 chars)
                    - primary_text: The main ad copy (max 200 chars)
                    - description: A brief description (max 100 chars)
                    - link_description: A call to action (max 30 chars)
                    """}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            content = response.choices[0].message.content
            
            # Try to parse as JSON
            try:
                import json
                import re
                
                # Extract JSON if it's wrapped in markdown code blocks
                json_match = re.search(r'```json\s*(.*?)\s*```', content, re.DOTALL)
                if json_match:
                    content = json_match.group(1)
                
                ad_content = json.loads(content)
                
                # Ensure all required fields are present
                required_fields = ['title', 'headline', 'primary_text', 'description', 'link_description']
                for field in required_fields:
                    if field not in ad_content:
                        ad_content[field] = ""
                
                return ad_content
                
            except json.JSONDecodeError:
                # If JSON parsing fails, try to extract content manually
                lines = content.split('\n')
                ad_content = {
                    'title': '',
                    'headline': '',
                    'primary_text': '',
                    'description': '',
                    'link_description': ''
                }
                
                current_field = None
                for line in lines:
                    line = line.strip()
                    if line.lower().startswith('title:'):
                        ad_content['title'] = line[6:].strip()
                    elif line.lower().startswith('headline:'):
                        ad_content['headline'] = line[9:].strip()
                    elif line.lower().startswith('primary text:') or line.lower().startswith('primary_text:'):
                        ad_content['primary_text'] = line[13:].strip()
                    elif line.lower().startswith('description:'):
                        ad_content['description'] = line[12:].strip()
                    elif line.lower().startswith('link description:') or line.lower().startswith('link_description:'):
                        ad_content['link_description'] = line[17:].strip()
                
                return ad_content
        
        # Fallback to simulated content
        return {
            'title': f"{'Discover' if objective == 'awareness' else 'Try'} Our Product Today",
            'headline': f"The #1 Solution for {target_audience}",
            'primary_text': f"Are you looking for a better way to {'understand' if objective == 'awareness' else 'solve'} your problems? Our product is designed specifically for {target_audience}.",
            'description': f"Perfect for {target_audience}. Our solution helps you achieve more with less effort.",
            'link_description': f"Learn more about how we can help you {'discover' if objective == 'awareness' else 'achieve'} your goals."
        }
    except Exception as e:
        print(f"Error generating ad content: {e}")
        return {
            'title': "Our Amazing Product",
            'headline': "Try It Today",
            'primary_text': "This is a placeholder for the primary text of your ad.",
            'description': "This is a placeholder for the description of your ad.",
            'link_description': "Learn More"
        }
