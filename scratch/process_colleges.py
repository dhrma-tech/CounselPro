import json
import re

# File paths
input_file = r'C:\Users\ACER\.gemini\antigravity\brain\17d43731-008c-43c9-89cc-5e9735f030c5\.system_generated\steps\324\content.md'
existing_file = r'c:\Users\ACER\CounselPro-5\data\colleges.json'
output_file = r'c:\Users\ACER\CounselPro-5\data\colleges_expanded.json'

def create_slug(name):
    slug = name.lower()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')

# Load existing colleges to avoid duplicates and preserve high-quality data
with open(existing_file, 'r', encoding='utf-8') as f:
    existing_colleges = json.load(f)

existing_names = {c['name'].lower() for c in existing_colleges}
existing_slugs = {c['slug'] for c in existing_colleges}

# Read content.md (skip the first 4 lines of Source and separator)
with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    json_str = "".join(lines[4:])
    raw_data = json.loads(json_str)

new_colleges = []

for item in raw_data:
    # Filter for Maharashtra and Engineering Undergraduate
    if item.get('state') != 'Maharashtra':
        continue
    
    eng_progs = []
    for p in item.get('programmes', []):
        if p.get('programme') == 'ENGINEERING AND TECHNOLOGY' and p.get('level') == 'UNDER GRADUATE':
            eng_progs.append(p)
    
    if not eng_progs:
        continue
        
    name = item.get('institute_name', 'Unknown College')
    if name.lower() in existing_names:
        continue
        
    slug = create_slug(name)
    if slug in existing_slugs:
        slug = f"{slug}-{item.get('aicte_id', 'new')}"
        
    # Map to schema
    branches = []
    for p in eng_progs:
        branches.append({
            "branch": p.get('course', 'Engineering'),
            "counselling": "MHT-CET / JEE Main",
            "category": "General",
            "openRank": 1,
            "closeRank": int(p.get('intake', 0)) * 1000 # Placeholder for rank
        })
        
    college = {
        "slug": slug,
        "name": name,
        "shortName": name.split(',')[0][:30].strip(),
        "type": item.get('institution_type', 'Private'),
        "location": item.get('address', 'Maharashtra'),
        "city": item.get('district', 'Maharashtra'),
        "state": "Maharashtra",
        "nirf": None,
        "established": None,
        "affiliation": item.get('university', 'N/A'),
        "website": "N/A",
        "hostelAvailable": False,
        "genderAdmission": "Co-educational",
        "accreditation": [],
        "highlights": ["AICTE Approved", "Engineering Programs"],
        "entranceExams": ["MHT-CET", "JEE Main"],
        "description": f"{name} is an engineering institution located in {item.get('district')}, Maharashtra, offering various undergraduate programs in technology and engineering.",
        "branches": branches,
        "fees": [{ "branch": "All B.Tech Programs", "annualFees": 0, "totalFees": 0 }],
        "placements": { "avgPackage": "N/A", "highestPackage": "N/A", "topRecruiters": [] },
        "contact": { "email": "N/A", "phone": "N/A" }
    }
    
    new_colleges.append(college)
    existing_slugs.add(slug)

# Merge
final_list = existing_colleges + new_colleges

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(final_list, f, indent=2)

print(f"Added {len(new_colleges)} new colleges. Total: {len(final_list)}")
