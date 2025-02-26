import os
import re
from datetime import datetime

def extract_date_from_filename(filename):
    # Extract date from filename format YYYY-MM-DD-title.md
    match = re.match(r'(\d{4}-\d{2}-\d{2})-.*\.md', filename)
    if match:
        date_str = match.group(1)
        try:
            return datetime.strptime(date_str, '%Y-%m-%d').strftime('%Y-%m-%d')
        except ValueError:
            print(f"Warning: Invalid date {date_str} in filename {filename}")
            return None
    return None

def update_frontmatter(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        print(f"Warning: Unable to read {file_path} - encoding issues")
        return
    except Exception as e:
        print(f"Warning: Unable to read {file_path} - {str(e)}")
        return

    # Extract date from filename
    filename = os.path.basename(file_path)
    date = extract_date_from_filename(filename)
    
    if not date:
        print(f"Skipping {filename} - no valid date found in filename")
        return

    # Check if file has frontmatter
    frontmatter_match = re.match(r'^(---\s*\n)(.*?)\n(---\s*\n)(.*)', content, re.DOTALL)
    
    if frontmatter_match:
        # File has frontmatter
        start_delimiter = frontmatter_match.group(1)
        frontmatter_content = frontmatter_match.group(2)
        end_delimiter = frontmatter_match.group(3)
        rest_of_content = frontmatter_match.group(4)
        
        # Check if date field already exists
        if not re.search(r'^date:', frontmatter_content, re.MULTILINE):
            # Add date field at the end of frontmatter, preserving existing format
            new_frontmatter = frontmatter_content.rstrip() + f'\ndate: {date}\n'
            new_content = start_delimiter + new_frontmatter + end_delimiter + rest_of_content
            
            # Write the updated content back to the file
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename} with date: {date}")
            except Exception as e:
                print(f"Warning: Unable to write to {filename} - {str(e)}")
        else:
            print(f"Skipping {filename} - date field already exists")
    else:
        print(f"Skipping {filename} - no frontmatter found")

def main():
    blog_dir = 'data/blog'
    
    # Process all markdown files in the blog directory
    for filename in sorted(os.listdir(blog_dir)):
        if filename.endswith('.md'):
            file_path = os.path.join(blog_dir, filename)
            update_frontmatter(file_path)

if __name__ == '__main__':
    main() 