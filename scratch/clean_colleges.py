import json
import re

# File paths
file_path = r'c:\Users\ACER\CounselPro-5\data\colleges_deduped.json'
output_path = r'c:\Users\ACER\CounselPro-5\data\colleges_cleaned.json'

with open(file_path, 'r', encoding='utf-8') as f:
    colleges = json.load(f)

def clean_text(text):
    if not text: return text
    # Title Case if all caps
    if text.isupper():
        return text.title()
    return text

for c in colleges:
    c['name'] = clean_text(c['name'])
    c['city'] = clean_text(c['city'])
    c['type'] = clean_text(c['type'])
    if 'location' in c:
        c['location'] = clean_text(c['location'])
    
    # Standardize types
    if 'Private-Self Financing' in c['type']:
        c['type'] = 'Private'
    elif 'State Government' in c['type'] or 'University Managed-Govt' in c['type']:
        c['type'] = 'Government'
        
    # Clean branches
    for b in c.get('branches', []):
        if b['branch'].isupper():
            b['branch'] = b['branch'].title()

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(colleges, f, indent=2)

print(f"Cleaned {len(colleges)} colleges.")
