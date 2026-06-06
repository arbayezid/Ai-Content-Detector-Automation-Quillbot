import json
import re
import pandas as pd

def strip_html_tags(text):
    """Remove HTML tags from text."""
    if not text:
        return ''
    # Remove HTML tags
    clean = re.sub(r'<[^>]+>', '', text)
    # Replace multiple spaces/newlines with single space
    clean = re.sub(r'\s+', ' ', clean)
    return clean.strip()

def json_to_normal_text(json_str):
    """Parse JSON string and convert to single normal text. Supports both old and new formats."""
    try:
        data = json.loads(json_str)
    except (json.JSONDecodeError, TypeError):
        return ''

    parts = []

    # ============ NEW FORMAT SUPPORT ============
    
    # Taglines (array of strings)
    if 'taglines' in data and isinstance(data['taglines'], list):
        parts.append(' | '.join(data['taglines']))

    # Meta title (string)
    if 'meta_title' in data and data['meta_title']:
        parts.append(strip_html_tags(data['meta_title']))

    # Meta description (string)
    if 'meta_description' in data and data['meta_description']:
        parts.append(strip_html_tags(data['meta_description']))

    # Benefits section (array of objects with title, subtitle, content)
    if 'benefits' in data and isinstance(data['benefits'], list):
        for benefit in data['benefits']:
            if benefit.get('title'):
                parts.append(strip_html_tags(benefit['title']))
            if benefit.get('subtitle'):
                parts.append(strip_html_tags(benefit['subtitle']))
            if benefit.get('content') and isinstance(benefit['content'], list):
                for item in benefit['content']:
                    parts.append(strip_html_tags(item))

    # When to recite section (array of objects with title, subtitle, content)
    if 'when_to_recite' in data and isinstance(data['when_to_recite'], list):
        for section in data['when_to_recite']:
            if section.get('title'):
                parts.append(strip_html_tags(section['title']))
            if section.get('subtitle'):
                parts.append(strip_html_tags(section['subtitle']))
            if section.get('content') and isinstance(section['content'], list):
                for item in section['content']:
                    parts.append(strip_html_tags(item))

    # How to perform section (array of objects with title, subtitle, content)
    if 'how_to_perform' in data and isinstance(data['how_to_perform'], list):
        for section in data['how_to_perform']:
            if section.get('title'):
                parts.append(strip_html_tags(section['title']))
            if section.get('subtitle'):
                parts.append(strip_html_tags(section['subtitle']))
            if section.get('content') and isinstance(section['content'], list):
                for item in section['content']:
                    parts.append(strip_html_tags(item))

    # Summary (array of strings)
    if 'summary' in data and isinstance(data['summary'], list):
        for item in data['summary']:
            parts.append(strip_html_tags(item))

    # FAQs - New format (array with question/answer)
    if 'faqs' in data and isinstance(data['faqs'], list):
        parts.append("Frequently Asked Questions")
        for faq in data['faqs']:
            question = faq.get('question', '')
            answer = faq.get('answer', '')
            if question:
                parts.append(strip_html_tags(question))
            if answer:
                parts.append(strip_html_tags(answer))

    # ============ OLD FORMAT SUPPORT (Backward Compatibility) ============

    # Meta data (title and description) - OLD FORMAT
    if 'meta_data' in data:
        meta_title = data['meta_data'].get('title', '')
        meta_desc = data['meta_data'].get('desc', '')
        if meta_title:
            parts.append(strip_html_tags(meta_title))
        if meta_desc:
            parts.append(strip_html_tags(meta_desc))

    # Today's content - OLD FORMAT
    if 'todays_content' in data:
        todays_title = data['todays_content'].get('title', '')
        todays_content = data['todays_content'].get('content', '')
        if todays_title:
            parts.append(strip_html_tags(todays_title))
        if todays_content:
            parts.append(strip_html_tags(todays_content))

    # City article - OLD FORMAT
    if 'city_article' in data:
        city_title = data['city_article'].get('title', '')
        city_content = data['city_article'].get('content', '')
        if city_title:
            parts.append(strip_html_tags(city_title))
        if city_content:
            parts.append(strip_html_tags(city_content))

    # FAQ section - OLD FORMAT
    if 'faq_section' in data and isinstance(data['faq_section'], list):
        parts.append("Frequently Asked Questions")
        for faq in data['faq_section']:
            question = faq.get('question', '')
            answer = faq.get('answer', '')
            if question:
                parts.append(strip_html_tags(question))
            if answer:
                parts.append(strip_html_tags(answer))

    # Join all parts with newlines
    return '\n\n'.join(parts)

def main():
    input_file = 'input (1).xlsx'
    output_file = 'data.xlsx'

    # Read Excel file
    df = pd.read_excel(input_file)

    # Convert JSON_Data column to Normal_Data
    df['Normal_Data'] = df['JSON_Data'].apply(json_to_normal_text)

    # Drop JSON_Data column
    df = df.drop(columns=['JSON_Data'])

    # Rename columns: Row_Number -> id, Normal_Data -> responce
    df = df.rename(columns={'Row_Number': 'id', 'Normal_Data': 'response'})

    # Write output Excel file
    df.to_excel(output_file, index=False)

    print(f"Conversion complete! Output saved to '{output_file}'")
    print(f"Processed {len(df)} rows")
    print(f"Output columns: 'id' and 'response'")

if __name__ == '__main__':
    main()
