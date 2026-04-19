import json

# File paths
file_path = r'c:\Users\ACER\CounselPro-5\data\colleges.json'
output_path = r'c:\Users\ACER\CounselPro-5\data\colleges_updated_branches.json'

with open(file_path, 'r', encoding='utf-8') as f:
    colleges = json.load(f)

update_data = {
    "iit-delhi": [
        "Computer Science & Engineering (CSE)", "Electrical Engineering (EE)", "Mechanical Engineering (ME)",
        "Civil Engineering", "Chemical Engineering", "Engineering Physics", "Mathematics & Computing",
        "Textile Technology", "Energy Engineering", "Production & Industrial Engineering",
        "Biochemical Engineering & Biotechnology"
    ],
    "nit-trichy": [
        "Computer Science & Engineering", "Electronics & Communication Engineering (ECE)",
        "Electrical & Electronics Engineering (EEE)", "Mechanical Engineering", "Civil Engineering",
        "Chemical Engineering", "Metallurgical & Materials Engineering", "Production Engineering",
        "Instrumentation & Control Engineering"
    ],
    "nit-surathkal": [
        "Computer Science & Engineering", "Information Technology", "Electronics & Communication Engineering",
        "Electrical & Electronics Engineering", "Mechanical Engineering", "Civil Engineering",
        "Chemical Engineering", "Metallurgical & Materials Engineering", "Mining Engineering"
    ],
    "bits-pilani": [
        "Computer Science", "Electrical & Electronics Engineering", "Electronics & Instrumentation Engineering",
        "Electronics & Communication Engineering", "Mechanical Engineering", "Civil Engineering",
        "Chemical Engineering", "Manufacturing Engineering", "Mathematics", "Physics", "Chemistry", "Economics"
    ],
    "nit-warangal": [
        "Computer Science & Engineering", "Electronics & Communication Engineering",
        "Electrical & Electronics Engineering", "Mechanical Engineering", "Civil Engineering",
        "Chemical Engineering", "Metallurgical & Materials Engineering", "Biotechnology"
    ],
    "iiit-hyderabad": [
        "Computer Science & Engineering", "Electronics & Communication Engineering",
        "Computer Science + MS (by Research)", "Computational Linguistics", "Computational Natural Sciences",
        "Artificial Intelligence", "Data Science"
    ]
}

def get_counselling(slug):
    if slug == 'bits-pilani': return 'BITSAT'
    if slug == 'iiit-hyderabad': return 'JoSAA/DASA/UGEE'
    return 'JoSAA'

for c in colleges:
    slug = c['slug']
    if slug in update_data:
        new_branches = []
        existing_branches = {b['branch']: b for b in c.get('branches', [])}
        
        for branch_name in update_data[slug]:
            # Try to match with existing to preserve ranks
            match = None
            for ex_name, ex_data in existing_branches.items():
                if branch_name.lower().startswith(ex_name.lower()) or ex_name.lower().startswith(branch_name.split('(')[0].strip().lower()):
                    match = ex_data
                    break
            
            if match:
                new_branches.append(match)
            else:
                new_branches.append({
                    "branch": branch_name,
                    "counselling": get_counselling(slug),
                    "category": "General",
                    "openRank": 100, # Placeholder
                    "closeRank": 5000 # Placeholder
                })
        
        c['branches'] = new_branches

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(colleges, f, indent=2)

print(f"Updated branches for {len(update_data)} colleges.")
