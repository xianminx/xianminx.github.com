import os
import re
from datetime import datetime

def fix_html_tags(content):
    # Fix common HTML issues
    fixes = [
        # Fix unclosed img tags
        (r'<img ([^>]+[^/>])>', r'<img \1 />'),
        # Fix unquoted HTML attributes
        (r'(<img[^>]+)(width|height)=(\d+)([^">])', r'\1\2="\3"\4'),
        # Fix Jekyll highlight blocks
        (r'{% highlight ([a-zA-Z0-9]+) %}(.*?){% endhighlight %}', r'```\1\2```'),
        # Fix Jekyll raw blocks
        (r'{% raw %}(.*?){% endraw %}', r'`\1`'),
        # Remove HTML comments
        (r'<!--[\s\S]*?-->', ''),
        # Fix div tags (replace with markdown)
        (r'<div.*?>([\s\S]*?)</div>', r'\1'),
        # Fix object/embed tags (replace with markdown link)
        (r'<object.*?</object>', ''),
        # Fix param tags
        (r'<param.*?>', ''),
        # Fix embed tags
        (r'<embed.*?>', ''),
        # Fix font tags (replace with markdown)
        (r'<font.*?>(.*?)</font>', r'\1'),
        # Fix unclosed br tags
        (r'<br>', r'<br />'),
        # Fix code tags
        (r'<code>(.*?)</code>', r'`\1`'),
        # Fix pre tags
        (r'<pre>(.*?)</pre>', r'```\n\1\n```'),
    ]
    
    for pattern, replacement in fixes:
        content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)
    
    return content

def fix_markdown_content(content):
    # Fix markdown issues
    lines = content.split('\n')
    fixed_lines = []
    in_code_block = False
    
    for line in lines:
        # Don't modify content inside code blocks
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            fixed_lines.append(line)
            continue
            
        if not in_code_block:
            # Fix inline code spacing
            if '`' in line:
                line = re.sub(r'([^\s])`', r'\1 `', line)
                line = re.sub(r'`([^\s])', r'` \1', line)
            
            # Fix list spacing
            if line.lstrip().startswith('- '):
                if fixed_lines and fixed_lines[-1].strip():
                    fixed_lines.append('')
            
            # Fix header spacing
            if line.lstrip().startswith('#'):
                if fixed_lines and fixed_lines[-1].strip():
                    fixed_lines.append('')
        
        fixed_lines.append(line)
    
    return '\n'.join(fixed_lines)

def fix_frontmatter(content):
    # Fix frontmatter issues
    frontmatter_match = re.match(r'^(---\s*\n)(.*?)\n(---\s*\n)(.*)', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(2)
        rest_of_content = frontmatter_match.group(4)
        
        # Fix common frontmatter issues
        fixed_lines = []
        for line in frontmatter.split('\n'):
            if ':' in line and not any(q in line for q in ['"', "'"]):
                key, value = line.split(':', 1)
                value = value.strip()
                if value and not value.startswith('[') and not value.startswith('{'):
                    line = f'{key}: "{value}"'
            fixed_lines.append(line)
        
        # Reconstruct the content
        content = f'---\n{"\n".join(fixed_lines)}\n---\n{rest_of_content}'
    
    return content

def process_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            # Try with a different encoding if utf-8 fails
            with open(file_path, 'r', encoding='latin-1') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {file_path}: {str(e)}")
            return

    # Make a backup of the original file
    backup_path = file_path + '.bak'
    try:
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Error creating backup for {file_path}: {str(e)}")
        return

    # Fix the content
    try:
        # Fix in specific order
        content = fix_frontmatter(content)
        content = fix_html_tags(content)
        content = fix_markdown_content(content)
        
        # Write the fixed content back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        # Restore from backup if something went wrong
        try:
            with open(backup_path, 'r', encoding='utf-8') as f:
                original = f.read()
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(original)
            print(f"Restored {file_path} from backup")
        except Exception as e:
            print(f"Error restoring backup for {file_path}: {str(e)}")

def main():
    blog_dir = 'data/blog'
    
    # Process all markdown files
    for filename in sorted(os.listdir(blog_dir)):
        if filename.endswith('.md'):
            file_path = os.path.join(blog_dir, filename)
            process_file(file_path)

if __name__ == '__main__':
    main() 