# AdFlow - Ad Agency Workflow Platform

AdFlow is a comprehensive platform for creating, publishing, and analyzing ads with AI assistance.

## Features

- User authentication and account management
- AI-powered ad content generation using OpenAI
- Ad campaign management and publishing to Meta platforms
- Analytics dashboard with performance metrics
- Settings management for API keys and preferences

## Setup Instructions

### Prerequisites

- Python 3.8+
- PostgreSQL (recommended) or SQLite
- OpenAI API key
- Meta Marketing API key (optional for publishing)

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/yourusername/adflow.git
   cd adflow
   \`\`\`

2. Create a virtual environment:
   \`\`\`
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\`

4. Create a `.env` file based on `.env.example`:
   \`\`\`
   cp .env.example .env
   \`\`\`

5. Edit the `.env` file with your configuration:
   - Set a secure `SECRET_KEY`
   - Configure your database connection string
   - Add your OpenAI API key
   - Add your Meta API key (if available)

### Database Setup

#### Using PostgreSQL (Recommended)

1. Install PostgreSQL if not already installed
2. Create a new database:
   \`\`\`
   createdb adflow
   \`\`\`
3. Update your `.env` file with the PostgreSQL connection string:
   \`\`\`
   DATABASE_URI=postgresql://username:password@localhost:5432/adflow
   \`\`\`

#### Using SQLite (Simple option)

If you prefer to use SQLite, set the DATABASE_URI in your `.env` file:
\`\`\`
DATABASE_URI=sqlite:///adflow.db
\`\`\`

### Running the Application

1. Initialize the database:
   \`\`\`
   flask init-db
   \`\`\`

2. Start the development server:
   \`\`\`
   flask run
   \`\`\`

3. Access the application at http://localhost:5000

## Deployment

For production deployment:

1. Set `FLASK_ENV=production` in your `.env` file
2. Use a production WSGI server like Gunicorn:
   \`\`\`
   gunicorn app:app
   \`\`\`

## API Keys Setup

### OpenAI API Key

1. Create an account at [OpenAI](https://platform.openai.com/)
2. Generate an API key in your account dashboard
3. Add the key to your `.env` file:
   \`\`\`
   OPENAI_API_KEY=your-openai-api-key
   \`\`\`

### Meta Marketing API Key

1. Create a Meta for Developers account
2. Create an app in the Meta for Developers dashboard
3. Set up the Marketing API for your app
4. Generate an access token with ads_management permission
5. Add the token to your `.env` file:
   \`\`\`
   META_API_KEY=your-meta-api-key
