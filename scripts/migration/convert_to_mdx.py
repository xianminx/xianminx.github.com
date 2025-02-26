import os
import time
from openai import OpenAI
from pathlib import Path

# Initialize OpenAI client
client = OpenAI()  # Make sure OPENAI_API_KEY is set in your environment variables

def convert_to_mdx(content, filepath):
    """Convert markdown content to valid MDX using GPT-4"""
    try:
        # Construct the prompt
        prompt = f"""Please convert the following markdown content to valid MDX format. 
        Fix any HTML issues, ensure proper frontmatter formatting, and maintain the original content structure.
        Make sure all HTML tags are properly closed, attributes are quoted, and the content follows MDX best practices.
        Keep all Chinese characters and special formatting intact.
        
        Here's the content to convert:

        {content}
        
        Please provide only the converted MDX content without any explanations."""

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that converts markdown to valid MDX format."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,  # Low temperature for consistent output
        )

        # Extract the converted content
        converted_content = response.choices[0].message.content.strip()
        # Remove code block markers if present
        if converted_content.startswith('```') and converted_content.endswith('```'):
            converted_content = converted_content[converted_content.find('\n')+1:converted_content.rfind('```')].strip()
        return converted_content

    except Exception as e:
        print(f"Error converting {filepath}: {str(e)}")
        return None

def process_file(file_path):
    """Process a single markdown file"""
    try:
        # Read the original content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {file_path}: {str(e)}")
            return False

    # Create backup
    backup_path = file_path.with_suffix(file_path.suffix + '.bak')
    try:
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except Exception as e:
        print(f"Error creating backup for {file_path}: {str(e)}")
        return False

    # Convert content
    converted_content = convert_to_mdx(content, file_path)
    if converted_content is None:
        return False

    # Write converted content
    try:
        # Write the converted content back to the same file
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(converted_content)
        print(f"Updated content in {file_path}")
        
        return True
    except Exception as e:
        print(f"Error writing converted content for {file_path}: {str(e)}")
        return False

def main():
    blog_dir = Path('data/blog')
    success_count = 0
    failure_count = 0
    
    # Get list of all markdown files
    md_files = sorted(blog_dir.glob('*.md'))
    total_files = len(md_files)
    
    print(f"Found {total_files} markdown files to process")
    
    for i, file_path in enumerate(md_files, 1):
        print(f"\nProcessing file {i}/{total_files}: {file_path}")
        
        if process_file(file_path):
            success_count += 1
        else:
            failure_count += 1
        
        # Add a delay to respect API rate limits
        time.sleep(1)
        
    print(f"\nConversion complete!")
    print(f"Successfully converted: {success_count}")
    print(f"Failed to convert: {failure_count}")

if __name__ == '__main__':
    main() 