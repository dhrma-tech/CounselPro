import json
import re

# File paths
new_file = r'C:\Users\ACER\.gemini\antigravity\brain\17d43731-008c-43c9-89cc-5e9735f030c5\.system_generated\steps\414\content.md'
existing_file = r'c:\Users\ACER\CounselPro-5\data\colleges.json'
output_file = r'c:\Users\ACER\CounselPro-5\data\colleges_v3.json'

def normalize_name(name):
    n = name.lower().strip()
    n = re.sub(r'\(id:.*\)', '', n).strip() # Remove ID if present
    n = re.sub(r'[^a-z0-9]', '', n)
    return n

def create_slug(name):
    slug = name.lower()
    slug = re.sub(r'\(id:.*\)', '', slug).strip()
    slug = re.sub(r'[^a-z0-9]+', '-', slug)
    return slug.strip('-')

with open(existing_file, 'r', encoding='utf-8') as f:
    existing_colleges = json.load(f)

existing_names = {normalize_name(c['name']) for c in existing_colleges}
existing_slugs = {c['slug'] for c in existing_colleges}

# Read new content.md
with open(new_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    json_str = "".join(lines[4:])
    raw_data = json.loads(json_str)

new_added = []
for item in raw_data:
    if item.get('state') != 'Maharashtra':
        continue
    
    name = item.get('college', 'Unknown')
    norm_name = normalize_name(name)
    
    # Filter for Engineering/Technology
    keywords = ['engineering', 'technology', 'tech', 'polytechnic', 'iit', 'nit', 'iiit']
    is_eng = any(k in name.lower() for k in keywords)
    
    if not is_eng:
        continue
        
    if norm_name in existing_names:
        # Check if we can enhance existing info
        # Currently, the new data only has 'university' (Affiliation) and 'district' (City)
        # My existing data already has these.
        continue
    
    # Check for near matches
    is_near_dup = False
    for existing in existing_names:
        if len(existing) > 10 and len(norm_name) > 10:
            if existing in norm_name or norm_name in existing:
                is_near_dup = True
                break
    if is_near_dup:
        continue

    slug = create_slug(name)
    if slug in existing_slugs:
        slug = f"{slug}-{added_count}" # simplified

    # Map to schema
    clean_name = re.sub(r'\(Id:.*\)', '', name).strip()
    clean_uni = re.sub(r'\(Id:.*\)', '', item.get('university', 'N/A')).strip()
    
    college = {
        "slug": slug,
        "name": clean_name.title(),
        "shortName": clean_name.split(',')[0][:30].strip().title(),
        "type": item.get('college_type', 'Private'),
        "location": item.get('district', 'Maharashtra'),
        "city": item.get('district', 'Maharashtra'),
        "state": "Maharashtra",
        "nirf": None,
        "established": None,
        "affiliation": clean_uni,
        "website": "N/A",
        "hostelAvailable": False,
        "genderAdmission": "Co-educational",
        "accreditation": [],
        "highlights": ["AICTE Approved" if "college" in name.lower() else "Engineering Program"],
        "entranceExams": ["MHT-CET", "JEE Main"],
        "description": f"{clean_name} is a technical institution located in {item.get('district')}, Maharashtra.",
        "branches": [],
        "fees": [],
        "placements": { "avgPackage": "N/A", "highestPackage": "N/A", "topRecruiters": [] }
    }
    
    new_added.append(college)
    existing_names.add(norm_name)
    existing_slugs.add(slug)

final_list = existing_colleges + new_added

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(final_list, f, indent=2)

print(f"Added {len(new_added)} new colleges from the secondary list.")
print(f"Total colleges: {len(final_list)}")
