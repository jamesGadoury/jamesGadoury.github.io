from faker import Faker
import argparse
from datetime import datetime
import os

def generate_blog_post(title, paragraph_count, output_folder):
    """Generate and save a formatted blog post using Faker"""
    fake = Faker()
    
    # Generate content components
    current_date = datetime.now().strftime('%Y-%m-%d')
    slug = title.lower().replace(' ', '-')
    content = '\n\n'.join(fake.paragraph() for _ in range(paragraph_count))

    # Create post template
    blog_template = f"""Title: {title}
Date: {current_date}
Category: blog
Tags: thoughts
Slug: {slug}
Authors: random-gen-agent

{content}"""

    # Ensure output directory exists
    os.makedirs(output_folder, exist_ok=True)
    
    # Write to markdown file
    output_path = os.path.join(output_folder, f"{slug}.md")
    with open(output_path, 'w') as f:
        f.write(blog_template)
    
    return output_path

def main():
    """Handle command-line interface"""
    parser = argparse.ArgumentParser(
        description='Generate fake blog posts for testing',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    parser.add_argument('--title', required=True, 
                       help='Title of the blog post')
    parser.add_argument('--paragraph-count', type=int, required=True,
                       help='Number of paragraphs to generate')
    parser.add_argument('--output-folder', default='./content',
                       help='Directory to save generated posts')

    args = parser.parse_args()
    
    output_path = generate_blog_post(
        args.title,
        args.paragraph_count,
        args.output_folder
    )
    
    print(f"Successfully generated blog post at: {output_path}")

if __name__ == '__main__':
    main()

