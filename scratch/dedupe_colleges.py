import json
import re

# File paths
file_path = r'c:\Users\ACER\CounselPro-5\data\colleges.json'
output_path = r'c:\Users\ACER\CounselPro-5\data\colleges_deduped.json'

with open(file_path, 'r', encoding='utf-8') as f:
    colleges = json.load(f)

# The first 36 are the "Gold Standard" high-fidelity entries.
# They are added in Turn 14-17.
# I will keep them and use them to deduplicate others.
gold_standard = colleges[:36]
remaining_colleges = colleges[36:]

def normalize_name(name):
    n = name.lower().strip()
    n = re.sub(r'[^a-z0-9]', '', n) # Extreme normalization
    return n

gold_names = {normalize_name(c['name']) for c in gold_standard}
gold_slugs = {c['slug'] for c in gold_standard}

final_list = list(gold_standard)
seen_names = set(gold_names)
seen_slugs = set(gold_slugs)

added_count = 0
duplicate_count = 0

for c in remaining_colleges:
    norm_name = normalize_name(c['name'])
    
    # Check for near matches or substrings that might indicate it's the same college
    # e.g. "COEP Pune" vs "College of Engineering Pune"
    is_duplicate = False
    
    if norm_name in seen_names:
        is_duplicate = True
    else:
        # Check if this new name is a significant substring of an existing name or vice-versa
        for seen in seen_names:
            if len(seen) > 10 and len(norm_name) > 10:
                if seen in norm_name or norm_name in seen:
                    is_duplicate = True
                    break
    
    if is_duplicate:
        duplicate_count += 1
        continue
    
    # If slug is taken, modify it (though we should avoid duplicate slugs anyway)
    if c['slug'] in seen_slugs:
        c['slug'] = f"{c['slug']}-alt-{added_count}"

    final_list.append(c)
    seen_names.add(norm_name)
    seen_slugs.add(c['slug'])
    added_count += 1

# Special filter for "false info" or "incomplete info"
# If a college has "N/A" for description and no branches, it's pretty useless.
# But most have branches from AICTE.

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(final_list, f, indent=2)

print(f"Original total: {len(colleges)}")
print(f"Duplicates found/skipped: {duplicate_count}")
print(f"Final count: {len(final_list)}")
