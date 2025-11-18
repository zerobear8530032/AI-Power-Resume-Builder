# AI-Power-Resume-Builder
This Repo Contains the AI-Power Resume builder which take a resume information form the user and with some job description you are applying for and it modify the resume errors like spelling mistakes and  ats and give a report


# Features 

<ul>
    <li>Manage Multiple resume</li>
    <li>Report Generation</li>
    <li>Multiple Resume Templates Support</li>
    <li>Flexible Design works on Mobile and Windows</li>
    <li>JWT authentication</li>
</ul>

# Tech Stack 
<ul>
    <li>React/Tailwind for Front End</li>
    <li>Mongo for backend </li>
    <li>Gemini/ Junie AI for resume analysis</li>
</ul>


# DataBase Design :
## Collections
` User Collections : User Details `
<ul>
<li>Id</li>
<li>User Name</li>
<li>User Email</li>
<li>User password (Hashed)</li>
</ul>

` Resume Collections : User Resumes in JSON `

# 🧩 Resume Builder & Analyzer — Data Structure Guide

`This document defines the standardized structure for collecting and rendering resume data.
It ensures consistent formatting across templates, forms, and JSON generation.`

---

## 1️⃣ Personal Information

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `fullName` | string | ✅ | User’s complete name (e.g., “Abdul Saboor”) |
| `title` | string | 🟨 | Optional tagline (e.g., “AI & Full Stack Developer”) |
| `email` | string | ✅ | Must be a valid email format |
| `phone` | string | ✅ | Include country code if needed |
| `location` | string | 🟨 | City & state only (e.g., “Bhopal, MP”) |
| `socialLinks` | array | 🟨 | Each object: `{ platform: "LinkedIn", url: "..." }` |
| `portfolio` | string | 🟨 | Personal website or GitHub profile link |

> 💡 Keep it concise — avoid address, photo, DOB, or nationality.

---

## 2️⃣ Professional Summary

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `summary` | string | 🟨 | 3–5 lines describing career goals, interests, and strengths. Optional but recommended for freshers. |

**Example:**
> “Passionate AI and full-stack developer skilled in React, Python, and ML. Eager to build intelligent and scalable web solutions.”

---

## 3️⃣ Education

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `institution` | string | ✅ | College/University name |
| `degree` | string | ✅ | Course or qualification (e.g., B.Tech in AI & DS) |
| `year` | string | ✅ | e.g., “2021–2025” |
| `grade` | string | 🟨 | CGPA or percentage (optional) |
| `details` | string | 🟨 | Short description (e.g., “Completed with ML specialization”) |

> 📘 Education should be stored as an **array** for multiple entries.

---

## 4️⃣ Skills

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `technicalSkills` | array | ✅ | Example: `[ "Python", "React", "Node.js", "Machine Learning" ]` |
| `softSkills` | array | 🟨 | Example: `[ "Teamwork", "Communication" ]` |
| `toolsAndFrameworks` | array | 🟨 | Example: `[ "VS Code", "Git", "Figma" ]` |

> 💡 Use keyword lists (not paragraphs). Recruiters and ATS prefer short, scannable lists.

---

## 5️⃣ Projects

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | ✅ | Project name |
| `description` | string | ✅ | 2–3 line summary describing purpose, role, and tech stack |
| `techStack` | array | 🟨 | Example: `[ "React", "Flask", "TensorFlow" ]` |
| `link` | string | 🟨 | GitHub or live demo URL |

> 💡 Include 2–3 impactful projects; each stored as an object inside an array.

---

## 6️⃣ Experience

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `organization` | string | ✅ | Company or internship name |
| `role` | string | ✅ | Example: “Intern - Machine Learning” |
| `duration` | string | ✅ | Example: “Jan 2024 – May 2024” |
| `description` | string | ✅ | 3–5 bullet points of responsibilities or achievements |

> 💡 Experience should be an **array**; users may have multiple entries.

---

## 7️⃣ Certifications

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | ✅ | Certificate title |
| `organization` | string | 🟨 | Issuing platform (e.g., Coursera, Google) |
| `year` | string | 🟨 | Example: “2023” |
| `link` | string | 🟨 | Verification or credential URL |

> 💡 Add only relevant certifications (AI, Web, Cloud, etc.)

---

## ✅ Optional Extensions (Future Enhancements)

| Field | Type | Description |
| --- | --- | --- |
| `languages` | array | Spoken or programming languages (e.g., English, Hindi) |
| `achievements` | array | Awards, hackathons, or publications |
| `customSections` | array | Allow users to create and name custom resume sections dynamically |

---

### 📘 Summary

**Final Seven Sections:**
1. Personal Information  
2. Professional Summary  
3. Education  
4. Skills  
5. Projects  
6. Experience (optional)  
7. Certifications (optional)

Everything else is optional or redundant for most tech resumes.

---

> ✨ *Designed to make your Resume Builder & Analyzer structured, ATS-friendly, and developer-ready.*



| Role           | Color                   |
| -------------- | ----------------------- |
| Background     | `#0A0F22`               |
| Surface        | `#11182F`               |
| Primary        | `#3A7BFF` (Neon Blue)   |
| Secondary      | `#9B5CFF` (Violet Glow) |
| Accent         | `#16F2B3` (Neon Mint)   |
| Text Primary   | `#E6ECFF`               |
| Text Secondary | `#9AA4C4`               |


