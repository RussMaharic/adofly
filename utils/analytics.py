from datetime import datetime, timedelta
import random

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

def generate_audience_data():
    """Generate mock audience data"""
    return [
        {'age': '18-24', 'male': 15, 'female': 18, 'other': 2},
        {'age': '25-34', 'male': 25, 'female': 28, 'other': 3},
        {'age': '35-44', 'male': 20, 'female': 22, 'other': 2},
        {'age': '45-54', 'male': 15, 'female': 16, 'other': 1},
        {'age': '55-64', 'male': 10, 'female': 12, 'other': 1},
        {'age': '65+', 'male': 5, 'female': 6, 'other': 0}
    ]
