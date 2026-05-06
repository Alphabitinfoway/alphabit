import os

directory = r"c:\xampp\htdocs\alphabit"
old_text = '<li><a href="#">Cloud Deployment</a></li>'
new_text = '<li><a href="cloud-deployment-technologies.html">Cloud Deployment</a></li>'

files_updated = 0

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_text in content:
            new_content = content.replace(old_text, new_text)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filename}")
            files_updated += 1

print(f"Total files updated: {files_updated}")
