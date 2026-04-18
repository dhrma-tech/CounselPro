/**
 * Script to generate a JSON block for a new college.
 * Run this to get a template you can copy into data/colleges.json
 */
const template = {
  "slug": "unique-url-slug",
  "name": "Full College Name",
  "shortName": "Short Name",
  "type": "State", // IIT | NIT | IIIT | GFTI | State | Private | Autonomous
  "location": "City",
  "state": "State Name",
  "nirf": 0,
  "established": 1900,
  "affiliation": "University Name",
  "website": "https://...",
  "description": "Short description...",
  "entranceExams": ["MHT-CET", "JEE Main"],
  "hostelAvailable": true,
  "branches": [
    { "branch": "Computer Science", "counselling": "MHT-CET", "category": "General", "openRank": 0, "closeRank": 0 }
  ],
  "fees": [
    { "branch": "All", "annualFees": 0, "totalFees": 0, "hostelFees": 0 }
  ],
  "placements": {
    "avgPackage": "0 LPA",
    "highestPackage": "0 LPA",
    "topRecruiters": []
  }
};

console.log("--- New College Template ---");
console.log(JSON.stringify(template, null, 2));
console.log("----------------------------");
console.log("Copy the above into data/colleges.json");
