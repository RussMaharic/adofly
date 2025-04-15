from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
import json
import random
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-for-testing')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', 'sqlite:///adflow.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Configure API keys
openai.api_key = os.environ.get('OPENAI_API_KEY')

# Import routes after app initialization to avoid circular imports
from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.ads import ads_bp
from routes.analytics import analytics_bp
from routes.settings import settings_bp

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(ads_bp)
app.register_blueprint(analytics_bp)
app.register_blueprint(settings_bp)

# Models
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    company = db.Column(db.String(100))
    role = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    ads = db.relationship('Ad', backref='creator', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='draft')  # draft, pending, active, completed
    platform = db.Column(db.String(50))
    objective = db.Column(db.String(50))
    target_audience = db.Column(db.String(200))
    title = db.Column(db.String(100))
    headline = db.Column(db.String(100))
    primary_text = db.Column(db.Text)
    description = db.Column(db.Text)
    link_description = db.Column(db.String(100))
    impressions = db.Column(db.Integer, default=0)
    clicks = db.Column(db.Integer, default=0)
    conversions = db.Column(db.Integer, default=0)
    spend = db.Column(db.Float, default=0.0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class ApiKey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service = db.Column(db.String(50), nullable=False)
    api_key = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Helper functions
def generate_ad_content(objective, target_audience):
    """Generate ad content using OpenAI API"""
    try:
        # In a real app, this would call the OpenAI API
        # For demo purposes, we'll simulate the API call
        
        # If OpenAI API key is configured, use it
        if openai.api_key:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert ad copywriter."},
                    {"role": "user", "content": f"Create ad content for a {objective} campaign targeting {target_audience}. Include a title, headline, primary text, description, and link description."}
                ]
            )
            content = response.choices[0].message.content
            
            # Parse the response - in a real app, you'd want more robust parsing
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
                elif line.lower().startswith('primary text:'):
                    ad_content['primary_text'] = line[13:].strip()
                elif line.lower().startswith('description:'):
                    ad_content['description'] = line[12:].strip()
                elif line.lower().startswith('link description:'):
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

def publish_ad_to_meta(ad):
    """Publish ad to Meta platforms"""
    try:
        # In a real app, this would call the Meta Marketing API
        # For demo purposes, we'll simulate the API call
        
        # Simulate API call delay
        import time
        time.sleep(1)
        
        # Update ad status
        ad.status = 'pending'
        db.session.commit()
        
        return True
    except Exception as e:
        print(f"Error publishing ad: {e}")
        return False

def generate_mock_analytics(days=30):
    """Generate mock analytics data for charts"""
    data = []
    now = datetime.now()
    
    for i in range(days):
        date = now - timedelta(days=days-i-1)
        data.append({
            'date': date.strftime('%b %d'),
            'impressions': random.randint(3000, 8000),
            'clicks': random.randint(100, 400),
            'conversions': random.randint(10, 60),
            'cpc': round(random.uniform(0.5, 1.0), 2)
        })
    
    return data

# Routes
@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard.index'))
    return render_template('index.html')

# Initialize database
@app.cli.command("init-db")
def init_db():
    db.create_all()
    print("Database initialized!")

if __name__ == '__main__':
    app.run(debug=True)
