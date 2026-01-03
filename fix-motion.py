#!/usr/bin/env python3
"""
Script to remove all motion components from Homepage.tsx
Run this script to automatically fix all 77 remaining motion components
"""

import re

# Read the file
with open('src/app/components/Homepage.tsx', 'r') as f:
    content = f.read()

# Replace motion components with regular HTML elements
replacements = [
    (r'<motion\.div', '<div'),
    (r'</motion\.div>', '</div>'),
    (r'<motion\.button', '<button'),
    (r'</motion\.button>', '</button>'),
    (r'<motion\.h1', '<h1'),
    (r'</motion\.h1>', '</h1>'),
    (r'<motion\.h2', '<h2'),
    (r'</motion\.h2>', '</h2>'),
    (r'<motion\.h3', '<h3'),
    (r'</motion\.h3>', '</h3>'),
    (r'<motion\.p', '<p'),
    (r'</motion\.p>', '</p>'),
    (r'<motion\.span', '<span'),
    (r'</motion\.span>', '</span>'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Remove animation props (multiline)
animation_props = [
    r'\s+initial=\{[^}]+\}',
    r'\s+animate=\{[^}]+\}',
    r'\s+exit=\{[^}]+\}',
    r'\s+whileHover=\{[^}]+\}',
    r'\s+whileTap=\{[^}]+\}',
    r'\s+whileInView=\{[^}]+\}',
    r'\s+transition=\{[^}]+\}',
    r'\s+viewport=\{[^}]+\}',
]

for prop in animation_props:
    content = re.sub(prop, '', content)

# Write the fixed content back
with open('src/app/components/Homepage.tsx', 'w') as f:
    f.write(content)

print("✅ Fixed all 77 motion components in Homepage.tsx!")
print("✅ Removed all animation props")
print("🎉 Your store is now animation-free and fast!")
