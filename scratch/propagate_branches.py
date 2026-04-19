import json
import re

# File paths
aicte_file = r'C:\Users\ACER\.gemini\antigravity\brain\17d43731-008c-43c9-89cc-5e9735f030c5\.system_generated\steps\324\content.md'
colleges_file = r'c:\Users\ACER\CounselPro-5\data\colleges.json'
output_file = r'c:\Users\ACER\CounselPro-5\data\colleges_fully_updated.json'

def normalize_name(name):
    n = name.lower().strip()
    n = re.sub(r'\(id:.*\)', '', n).strip()
    n = re.sub(r'[^a-z0-9]', '', n)
    return n

# Load AICTE data
with open(aicte_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()
    json_str = "".join(lines[4:])
    raw_aicte = json.loads(json_str)

aicte_map = {}
for item in raw_aicte:
    if item.get('state') == 'Maharashtra':
        name = normalize_name(item.get('institute_name', ''))
        eng_progs = [p for p in item.get('programmes', []) if p.get('programme') == 'ENGINEERING AND TECHNOLOGY' and p.get('level') == 'UNDER GRADUATE']
        if eng_progs:
            aicte_map[name] = eng_progs

# Load current colleges
with open(colleges_file, 'r', encoding='utf-8') as f:
    colleges = json.load(f)

updated_count = 0
for c in colleges:
    if len(c.get('branches', [])) > 0:
        continue # Already has branches
        
    norm_name = normalize_name(c['name'])
    if norm_name in aicte_map:
        eng_progs = aicte_map[norm_name]
        branches = []
        for p in eng_progs:
            branches.append({
                "branch": p.get('course', 'Engineering').title(),
                "counselling": "MHT-CET / JEE Main",
                "category": "General",
                "openRank": 1,
                "closeRank": int(p.get('intake', 0)) * 1000
            })
        c['branches'] = branches
        updated_count += 1

with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(colleges, f, indent=2)

print(f"Propagated branches to {updated_count} previously empty colleges using AICTE data.")
