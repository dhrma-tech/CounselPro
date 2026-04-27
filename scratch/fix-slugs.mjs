import fs from 'fs';
import path from 'path';

const filePath = 'data/colleges.json';
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const updatedData = data.map(college => {
  if (college.slug.length > 150) {
    // Truncate slug and keep it unique
    college.slug = college.slug.substring(0, 140) + '-' + Math.random().toString(36).substring(2, 7);
  }
  return college;
});

fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
console.log('Successfully truncated long slugs in colleges.json');
