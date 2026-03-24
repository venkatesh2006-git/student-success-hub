def generate_schedule(subjects):
    """
    subjects is a list of dicts: [ {"name": "Math", "difficulty": 4, "days_left": 5}, ... ]
    Returns a sorted list of subjects based on Priority = Difficulty * (1 / Days Left)
    """
    schedule = []
    for sub in subjects:
        try:
            diff = float(sub.get('difficulty', 1))
            days = float(sub.get('days_left', 1))
            if days <= 0:
                days = 0.1 # prevent division by zero
            
            priority = diff * (1.0 / days)
            schedule.append({
                "name": sub.get('name', 'Unknown'),
                "priority": round(priority, 2),
                "difficulty": diff,
                "days_left": days
            })
        except (ValueError, TypeError):
            continue
            
    # Sort descending by priority
    schedule.sort(key=lambda x: x['priority'], reverse=True)
    return schedule
