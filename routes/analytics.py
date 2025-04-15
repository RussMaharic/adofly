from flask import Blueprint, render_template, jsonify
from flask_login import login_required, current_user
from models import Ad, AdPerformance
import json
from utils.analytics import generate_mock_analytics, generate_audience_data

analytics_bp = Blueprint('analytics', __name__, url_prefix='/analytics')

@analytics_bp.route('/')
@login_required
def index():
    # Generate mock analytics data
    performance_data = generate_mock_analytics(30)
    audience_data = generate_audience_data()
    
    # Get user's ads for campaign comparison
    user_ads = Ad.query.filter_by(user_id=current_user.id, status='active').all()
    
    return render_template(
        'analytics.html',
        performance_data=json.dumps(performance_data),
        audience_data=json.dumps(audience_data),
        ads=user_ads
    )

@analytics_bp.route('/api/performance/<int:days>')
@login_required
def api_performance(days):
    # In a real app, this would fetch actual performance data
    performance_data = generate_mock_analytics(days)
    return jsonify(performance_data)

@analytics_bp.route('/api/audience')
@login_required
def api_audience():
    # In a real app, this would fetch actual audience data
    audience_data = generate_audience_data()
    return jsonify(audience_data)

@analytics_bp.route('/api/campaign-comparison')
@login_required
def api_campaign_comparison():
    # In a real app, this would fetch actual campaign comparison data
    campaigns = []
    user_ads = Ad.query.filter_by(user_id=current_user.id).all()
    
    for i, ad in enumerate(user_ads[:5]):
        campaigns.append({
            'id': ad.id,
            'name': ad.name,
            'platform': ad.platform,
            'impressions': ad.impressions,
            'clicks': ad.clicks,
            'ctr': f"{(ad.clicks / ad.impressions * 100) if ad.impressions > 0 else 0:.1f}%",
            'conversions': ad.conversions,
            'convRate': f"{(ad.conversions / ad.clicks * 100) if ad.clicks > 0 else 0:.1f}%",
            'cpc': f"${ad.spend / ad.clicks if ad.clicks > 0 else 0:.2f}",
            'spend': f"${ad.spend:.2f}",
            'roi': f"{(((ad.conversions * 50) - ad.spend) / ad.spend * 100) if ad.spend > 0 else 0:.0f}%"
        })
    
    return jsonify(campaigns)
