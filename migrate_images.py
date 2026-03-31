import json
import os
import re

json_path = 'g:/Ai Ai Ai/Antigravity/igaak_new/data/artists.json'
public_dir = 'g:/Ai Ai Ai/Antigravity/igaak_new/public'

with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

blob_pattern = r'https://hn5lsrd5hvli3ttm\.public\.blob\.vercel-storage\.com(/artists/.*)'

updated_count = 0

def resolve_local_path(url):
    match = re.search(blob_pattern, url)
    if not match:
        return url
    
    relative_path = match.group(1)
    # Decode URL-encoded characters (like %20) to check filesystem
    import urllib.parse
    decoded_path = urllib.parse.unquote(relative_path)
    
    full_local_path = os.path.join(public_dir, decoded_path.lstrip('/'))
    
    if os.path.exists(full_local_path):
        return decoded_path # Keep it decoded for JSON, safeEncodeURI will handle it
    else:
        # Try some common variations if exact match fails (e.g. case sensitivity)
        # But for now, let's be strict.
        return url

for artist in data:
    # Update main image
    if 'image' in artist and artist['image']:
        new_path = resolve_local_path(artist['image'])
        if new_path != artist['image']:
            artist['image'] = new_path
            updated_count += 1
            
    # Update photos array
    if 'photos' in artist and artist['photos']:
        new_photos = []
        for photo in artist['photos']:
            new_path = resolve_local_path(photo)
            if new_path != photo:
                new_photos.append(new_path)
                updated_count += 1
            else:
                new_photos.append(photo)
        artist['photos'] = new_photos

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Updated {updated_count} image paths to local relative paths.")
