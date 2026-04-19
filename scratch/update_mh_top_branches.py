import json

file_path = r'c:\Users\ACER\CounselPro-5\data\colleges.json'
output_path = r'c:\Users\ACER\CounselPro-5\data\colleges_top_mh_updated.json'

with open(file_path, 'r', encoding='utf-8') as f:
    colleges = json.load(f)

# High-fidelity branch data for top MH colleges
mh_updates = {
    "dwarkadas-j-sanghvi-college-of-engineering": [
        "Computer Engineering", "Information Technology", "Electronics & Telecommunication Engineering",
        "Mechanical Engineering", "Chemical Engineering", "Computer Science and Engineering (Data Science)",
        "Computer Science and Engineering (AI & ML)", "Artificial Intelligence and Data Science", "IOT and Cyber Security"
    ],
    "sardar-patel-institute-of-technology": [
        "Computer Engineering", "Information Technology", "Electronics & Telecommunication Engineering",
        "Computer Science and Engineering (AI & ML)", "Computer Science and Engineering (Data Science)"
    ],
    "pune-institute-of-computer-technology": [
        "Computer Engineering", "Information Technology", "Electronics & Telecommunication Engineering",
        "Artificial Intelligence and Data Science"
    ],
    "institute-of-chemical-technology": [
        "Chemical Engineering", "Pharma Technology", "Food Engineering and Technology",
        "Polymer Engineering and Technology", "Surface Coating Technology", "Textile Processing Technology",
        "Oil, Oleochemicals and Surfactants Technology", "Dyestuff and Intermediates Technology"
    ],
    "vishwakarma-institute-of-technology": [
        "Computer Engineering", "Information Technology", "Electronics & Telecommunication Engineering",
        "Mechanical Engineering", "Chemical Engineering", "Instrumentation and Control Engineering",
        "Production Engineering", "Artificial Intelligence and Data Science", "Artificial Intelligence and Machine Learning"
    ],
    "thadomal-shahani-engineering-college": [
        "Computer Engineering", "Information Technology", "Electronics & Telecommunication Engineering",
        "Chemical Engineering", "Biotechnology", "Artificial Intelligence and Data Science"
    ],
    "cummins-college-of-engineering-for-women": [
        "Computer Engineering", "Information Technology", "Electronics & Telecommunication Engineering",
        "Mechanical Engineering", "Instrumentation and Control Engineering"
    ],
    "walchand-college-of-engineering": [
        "Computer Science and Engineering", "Information Technology", "Electronics Engineering",
        "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"
    ],
    "pimpri-chinchwad-college-of-engineering": [
        "Computer Engineering", "Information Technology", "Electronics & Telecommunication Engineering",
        "Mechanical Engineering", "Civil Engineering", "Artificial Intelligence and Data Science"
    ],
    "fr-conceicao-rodrigues-institute-of-technology": [
        "Computer Engineering", "Information Technology", "Mechanical Engineering",
        "Electrical Engineering", "Electronics & Telecommunication Engineering"
    ]
}

def get_counselling(slug):
    return 'MHT-CET'

for c in colleges:
    slug = c['slug']
    if slug in mh_updates:
        new_branches = []
        # Keep existing if it matches
        existing_map = {b['branch']: b for b in c.get('branches', [])}
        
        for b_name in mh_updates[slug]:
            if b_name in existing_map:
                new_branches.append(existing_map[b_name])
            else:
                new_branches.append({
                    "branch": b_name,
                    "counselling": get_counselling(slug),
                    "category": "General",
                    "openRank": 500, # Placeholder for top colleges
                    "closeRank": 5000 # Placeholder for top colleges
                })
        c['branches'] = new_branches

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(colleges, f, indent=2)

print(f"Updated branches for {len(mh_updates)} top Maharashtra colleges.")
