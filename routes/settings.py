from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_login import login_required, current_user
from models import User, ApiKey
from app import db

settings_bp = Blueprint('settings', __name__, url_prefix='/settings')

@settings_bp.route('/', methods=['GET', 'POST'])
@login_required
def index():
    if request.method == 'POST':
        section = request.form.get('section')
        
        if section == 'profile':
            current_user.name = request.form.get('name')
            current_user.company = request.form.get('company')
            current_user.role = request.form.get('role')
            
            db.session.commit()
            flash('Profile updated successfully!', 'success')
        
        elif section == 'password':
            current_password = request.form.get('current_password')
            new_password = request.form.get('new_password')
            confirm_password = request.form.get('confirm_password')
            
            if not current_user.check_password(current_password):
                flash('Current password is incorrect', 'error')
            elif new_password != confirm_password:
                flash('New passwords do not match', 'error')
            else:
                current_user.set_password(new_password)
                db.session.commit()
                flash('Password updated successfully!', 'success')
        
        elif section == 'api_keys':
            meta_api_key = request.form.get('meta_api_key')
            openai_api_key = request.form.get('openai_api_key')
            
            # Update Meta API key
            meta_key = ApiKey.query.filter_by(user_id=current_user.id, service='meta').first()
            if meta_key:
                meta_key.api_key = meta_api_key
            else:
                meta_key = ApiKey(user_id=current_user.id, service='meta', api_key=meta_api_key)
                db.session.add(meta_key)
            
            # Update OpenAI API key
            openai_key = ApiKey.query.filter_by(user_id=current_user.id, service='openai').first()
            if openai_key:
                openai_key.api_key = openai_api_key
            else:
                openai_key = ApiKey(user_id=current_user.id, service='openai', api_key=openai_api_key)
                db.session.add(openai_key)
            
            db.session.commit()
            flash('API keys updated successfully!', 'success')
    
    # Get user's API keys
    meta_key = ApiKey.query.filter_by(user_id=current_user.id, service='meta').first()
    openai_key = ApiKey.query.filter_by(user_id=current_user.id, service='openai').first()
    
    return render_template(
        'settings.html',
        meta_api_key=meta_key.api_key if meta_key else '',
        openai_api_key=openai_key.api_key if openai_key else ''
    )
