# AI-Powered Resume Builder Web App

A dynamic web application that allows users to build resumes tailored to specific job descriptions. The app features JWT-based authentication, a modular backend with Node.js & Express, and a React frontend. Users can register, login, create resumes, and manage templates.

# Features
<ul>
<li>User registration and login with JWT authentication (two tokens for different purposes).</li>

<li>Create, save, and manage resumes tailored to job descriptions.</li>

<li>RESTful API backend built with Node.js and Express.js.</li>

<li>Frontend built with React.js for dynamic and responsive UI.</li>

<li>Modular architecture following MVC pattern.</li>

<li>Uses MongoDB (Mongoose) for data storage.</li>

<li>Easy local setup with separate frontend and backend servers.</li>
</ul>

# Tech Stack 

<ul>
<li>Frontend: React.js</li>
<li>Backend: Node.js, Express.js</li>
<li>Database: MongoDB</li>
<li>Authentication: JWT (two tokens)</li>
<li>Version Control: Git</li>
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


---

## 2️⃣ Professional Summary

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `summary` | string | 🟨 | 3–5 lines describing career goals, interests, and strengths. Optional but recommended for freshers. |

## 3️⃣ Education Optional

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `institution` | string | ✅ | College/University name |
| `degree` | string | ✅ | Course or qualification (e.g., B.Tech in AI & DS) |
| `year` | string | ✅ | e.g., “2021–2025” |
| `grade` | string | 🟨 | CGPA or percentage (optional) |

> 📘 Education should be stored as an **array** for multiple entries.

---

## 4️⃣ Skills

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `tag name` | array | ✅ | Example: `[ "softskill , frameworks , tools etc" ]` |
| `skillname` | array | 🟨 | Example: `[ "VS Code", "Git", "Figma","java","python" ]` |


## 5️⃣ Projects

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | ✅ | Project name |
| `description` | string | ✅ | 2–3 line summary describing purpose, role, and tech stack |
| `techStack` | array | 🟨 | Example: `[ "React", "Flask", "TensorFlow" ]` |
| `link` | string | 🟨 | GitHub or live demo URL |


## 6️⃣ Experience

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `organization` | string | ✅ | Company or internship name |
| `role` | string | ✅ | Example: “Intern - Machine Learning” |
| `duration` | string | ✅ | Example: “Jan 2024 – May 2024” |
| `description` | string | ✅ | 3–5 bullet points of responsibilities or achievements |


## 7️⃣ Certifications

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | string | ✅ | Certificate title |
| `organization` | string | 🟨 | Issuing platform (e.g., Coursera, Google) |
| `year` | string | 🟨 | Example: “2023” |
| `link` | string | 🟨 | Verification or credential URL |

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


## SETUP Project 
<ul>
<li>clone Repo</li>
<li>set up environment variable  </li>
<li>run dev server in from frontend directory</li>
<li>run server.js in from backend directory</li>
<li>you will get the web page on the port mention in env file</li>
</ul>
