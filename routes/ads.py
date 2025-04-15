from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from flask_login import login_required, current_user
from models import Ad, Campaign
from app import db
from utils.openai_service import generate_ad_content
from utils.meta_service import publish_ad_to_meta

ads_bp = Blueprint('ads', __name__, url_prefix='/ads')

@ads_bp.route('/')
@login_required
def index():
    # Get filter parameter
    status_filter = request.args.get('status', 'all')
    
    # Filter ads based on status
    if status_filter != 'all':
        user_ads = Ad.query.filter_by(user_id=current_user.id, status=status_filter).order_by(Ad.created_at.desc()).all()
    else:
        user_ads = Ad.query.filter_by(user_id=current_user.id).order_by(Ad.created_at.desc()).all()
    
    return render_template('ads.html', ads=user_ads, status_filter=status_filter)

@ads_bp.route('/create', methods=['GET', 'POST'])
@login_required
def create():
    if request.method == 'POST':
        # Get form data
        name = request.form.get('name', 'Untitled Ad')
        platform = request.form.get('platform')
        objective = request.form.get('objective')
        target_audience = request.form.get('target_audience')
        
        # Create new ad
        new_ad = Ad(
            name=name,
            platform=platform,
            objective=objective,
            target_audience=target_audience,
            user_id=current_user.id
        )
        
        # If AI generation is requested
        if 'generate' in request.form:
            try:
                ad_content = generate_ad_content(objective, target_audience)
                new_ad.title = ad_content['title']
                new_ad.headline = ad_content['headline']
                new_ad.primary_text = ad_content['primary_text']
                new_ad.description = ad_content['description']
                new_ad.link_description = ad_content['link_description']
                
                db.session.add(new_ad)
                db.session.commit()
                
                flash('Ad content generated successfully!', 'success')
                return redirect(url_for('ads.edit', ad_id=new_ad.id))
            except Exception as e:
                flash(f'Error generating ad content: {str(e)}', 'error')
                return render_template('create_ad.html')
        
        # If manual creation
        else:
            db.session.add(new_ad)
            db.session.commit()
            
            flash('Ad created successfully!', 'success')
            return redirect(url_for('ads.edit', ad_id=new_ad.id))
    
    return render_template('create_ad.html')

@ads_bp.route('/edit/<int:ad_id>', methods=['GET', 'POST'])
@login_required
def edit(ad_id):
    ad = Ad.query.get_or_404(ad_id)
    
    # Ensure user owns this ad
    if ad.user_id != current_user.id:
        flash('You do not have permission to edit this ad', 'error')
        return redirect(url_for('ads.index'))
    
    if request.method == 'POST':
        # Update ad content
        ad.name = request.form.get('name')
        ad.title = request.form.get('title')
        ad.headline = request.form.get('headline')
        ad.primary_text = request.form.get('primary_text')
        ad.description = request.form.get('description')
        ad.link_description = request.form.get('link_description')
        ad.destination_url = request.form.get('destination_url')
        
        db.session.commit()
        
        # If publishing is requested
        if 'publish' in request.form:
            try:
                success = publish_ad_to_meta(ad)
                if success:
                    flash('Ad submitted for review!', 'success')
                else:
                    flash('Error publishing ad. Please try again.', 'error')
            except Exception as e:
                flash(f'Error publishing ad: {str(e)}', 'error')
        else:
            flash('Ad updated successfully!', 'success')
        
        return redirect(url_for('ads.index'))
    
    return render_template('edit_ad.html', ad=ad)

@ads_bp.route('/delete/<int:ad_id>', methods=['POST'])
@login_required
def delete(ad_id):
    ad = Ad.query.get_or_404(ad_id)
    
    # Ensure user owns this ad
    if ad.user_id != current_user.id:
        flash('You do not have permission to delete this ad', 'error')
        return redirect(url_for('ads.index'))
    
    db.session.delete(ad)
    db.session.commit()
    
    flash('Ad deleted successfully!', 'success')
    return redirect(url_for('ads.index'))

@ads_bp.route('/api/generate-content', methods=['POST'])
@login_required
def api_generate_content():
    data = request.json
    objective = data.get('objective')
    target_audience = data.get('target_audience')
    
    if not objective or not target_audience:
        return jsonify({'error': 'Missing required parameters'}), 400
    
    try:
        ad_content = generate_ad_content(objective, target_audience)
        return jsonify(ad_content)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
