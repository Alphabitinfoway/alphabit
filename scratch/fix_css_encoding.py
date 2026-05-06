import os

filepath = r"c:\xampp\htdocs\alphabit\assets\css\technologies.css"

# Try reading with different encodings to handle potential UTF-16
try:
    with open(filepath, 'rb') as f:
        raw_data = f.read()
    
    # Check for UTF-16 BOM or try to decode
    if raw_data.startswith(b'\xff\xfe') or raw_data.startswith(b'\xfe\xff'):
        content = raw_data.decode('utf-16')
    else:
        # Try UTF-8, then fallback to latin-1
        try:
            content = raw_data.decode('utf-8')
        except UnicodeDecodeError:
            content = raw_data.decode('latin-1')

    # Remove the spaced characters if they exist (e.g. "w i d t h" -> "width")
    # This happens if a UTF-16 file is treated as ASCII/UTF-8 with null bytes
    if '\x00' in content:
        content = content.replace('\x00', '')

    # Write back as clean UTF-8
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Cleaned up technologies.css encoding.")

except Exception as e:
    print(f"Error: {e}")
