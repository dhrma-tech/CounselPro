import json

file_path = r'c:\Users\ACER\CounselPro-5\data\colleges.json'
output_path = r'c:\Users\ACER\CounselPro-5\data\colleges_bulk_update.json'

with open(file_path, 'r', encoding='utf-8') as f:
    colleges = json.load(f)

update_map = {
    "spce-mumbai": ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering"],
    "gh-raisoni-iem-jalgaon": ["Computer Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Telecommunication", "Mechanical Engineering"],
    "aissms-ioit-pune": ["Computer Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Telecommunication Engineering"],
    "indira-college-of-engineering-management": ["Computer Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Mechanical Engineering", "Electronics & Telecommunication"],
    "mit-aoe-pune": ["Computer Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Telecommunication", "Mechanical Engineering", "Civil Engineering"],
    "rit-sangli": ["Computer Engineering", "Information Technology", "Electronics & Telecommunication", "Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Automobile Engineering", "Mechatronics"],
    "kj-somaiya-it-mumbai": ["Computer Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Telecommunication", "Electronics Engineering"],
    "tsec-mumbai": ["Computer Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Telecommunication", "Electronics & Computer Science"],
    "g-m-vedak-institute-of-technology": ["Computer Engineering", "Mechanical Engineering", "Civil Engineering", "Electronics & Telecommunication"],
    "pict-pune": ["Computer Engineering", "Information Technology", "Electronics & Telecommunication"],
    "iiit-pune": ["Computer Science & Engineering", "Electronics & Communication Engineering"]
}

def get_counselling(slug):
    return 'MHT-CET' if slug != 'iiit-pune' else 'JoSAA'

for c in colleges:
    slug = c['slug']
    if slug in update_map:
        new_branches = []
        existing_map = {b['branch'].lower().strip(): b for b in c.get('branches', [])}
        
        for b_name in update_map[slug]:
            clean_b = b_name.lower().strip()
            if clean_b in existing_map:
                new_branches.append(existing_map[clean_b])
            else:
                new_branches.append({
                    "branch": b_name,
                    "counselling": get_counselling(slug),
                    "category": "General",
                    "openRank": 1000,
                    "closeRank": 10000
                })
        c['branches'] = new_branches

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(colleges, f, indent=2)

print(f"Propagated specific branch updates for {len(update_map)} colleges.")
