from flask import Blueprint, render_template, jsonify
from flask_login import login_required, current_user
from models import Ad
import json
from utils.analytics import generate_mock_analytics

dashboard_bp = Blueprint('dashboard', __name__, url_prefix='/dashboard')

@dashboard_bp.route('/')
@login_required
def index():
    # Get user's ads
    user_ads = Ad.query.filter_by(user_id=current_user.id).order_by(Ad.created_at.desc()).limit(5).all()
    
    # Generate mock analytics data
    analytics_data = generate_mock_analytics()
    
    # Calculate summary metrics
    total_campaigns = Ad.query.filter_by(user_id=current_user.id).count()
    active_ads = Ad.query.filter_by(user_id=current_user.id, status='active').count()
    total_impressions = sum(ad.impressions for ad in user_ads)
    total_spend = sum(ad.spend for ad in user_ads)
    
    return render_template(
        'dashboard.html',
        user=current_user,
        ads=user_ads,
        analytics_data=json.dumps(analytics_data),
        total_campaigns=total_campaigns,
        active_ads=active_ads,
        total_impressions=total_impressions,
        total_spend=total_spend
    )

@dashboard_bp.route('/api/performance-data')
@login_required
def performance_data():
    # In a real app, this would fetch actual performance data
    analytics_data = generate_mock_analytics()
    return jsonify(analytics_data)
