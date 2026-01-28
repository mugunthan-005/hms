SRM HOSPITAL MANAGEMENT SYSTEM (HMS)
==================================

This is a demo Hospital Management System project built using:
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: MongoDB Atlas

This project is meant for learning, demo, and academic use.


----------------------------------
FEATURES
----------------------------------

1) LOGIN (DEMO)
- One main login page (dashboard.html)
- Role selection:
  - Patient / Attender
  - Doctor / Admin
- Email and password are demo-only (any value works)

2) ATTENDER MODULE
- Enter patient details
- Enter attender details
- Upload ID proof image
- Generates a unique Patient ID
- Stores data in MongoDB

3) CONSENT MODULE
- Records consent using webcam and microphone
- Captures location (latitude and longitude)
- Stores video, time, and location in MongoDB

4) DOCTOR / ADMIN MODULE
- Search patient by Patient ID
- View:
  - Patient details
  - Attender details
  - ID proof image
  - Consent video
  - Date, time, and location


----------------------------------
PROJECT STRUCTURE
----------------------------------

hms/
|
|-- backend/
|   |-- server.js
|   |-- routes/
|   |-- models/
|   |-- uploads/        (stores uploaded images/videos)
|   |-- .env            (must be created manually)
|
|-- frontend/
|   |-- dashboard.html  (main login page)
|   |-- dashboard.css
|   |-- dashboard.js
|   |-- attender.html
|   |-- attender.css
|   |-- attender.js
|   |-- consent.html
|   |-- consent.css
|   |-- consent.js
|   |-- doctor.html
|   |-- doctor.js
|
|-- package.json
|-- README.txt


----------------------------------
REQUIREMENTS (INSTALL FIRST)
----------------------------------

1) Node.js (LTS version recommended)
2) MongoDB Atlas account (free tier is enough)
3) Internet connection


----------------------------------
HOW TO RUN ON ANY PC (LOCAL SETUP)
----------------------------------

STEP 1: EXTRACT PROJECT
- Extract the ZIP file to any folder
  Example:
  D:\hms


STEP 2: INSTALL DEPENDENCIES
- Open PowerShell or Terminal inside the project folder
- Run:

  npm install


STEP 3: CREATE .ENV FILE (VERY IMPORTANT)
- Go to the backend folder
- Create a file named:

  backend\.env

- Add this content:

  MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/hms?retryWrites=true&w=majority
  PORT=5000

- Replace USERNAME and PASSWORD with MongoDB Atlas credentials
- Do NOT use quotes
- Avoid special characters in password (or URL-encode them)


STEP 4: MONGODB ATLAS SETUP

A) DATABASE ACCESS
- Create a database user
- Give role: Read and write to any database

B) NETWORK ACCESS
- Add IP Address:
  0.0.0.0/0
- Save


STEP 5: START THE SERVER
- From the project root folder run:

  npm run dev

- Expected output:

  Server running on port 5000
  MongoDB connected


----------------------------------
HOW TO OPEN THE WEBSITE (IMPORTANT)
----------------------------------

DO NOT double-click HTML files.
DO NOT use file:/// URLs.

Open in browser ONLY using:

  http://localhost:5000/

OR

  http://localhost:5000/dashboard.html


----------------------------------
APPLICATION FLOW
----------------------------------

ATTENDER FLOW:
1) Open dashboard page
2) Select Patient / Attender
3) Enter any email/password
4) Fill patient and attender details
5) Upload ID proof
6) Patient ID is generated
7) Redirects to consent page

CONSENT FLOW:
1) Allow camera, microphone, and location
2) Record consent video
3) Upload consent

DOCTOR / ADMIN FLOW:
1) Open dashboard page
2) Select Doctor / Admin
3) Enter any email/password
4) Enter Patient ID
5) View all patient and consent details


----------------------------------
COMMON ERRORS AND FIXES
----------------------------------

ERROR: MongoDB Authentication Failed
FIX:
- Reset MongoDB Atlas password
- Update MONGO_URI in backend/.env

ERROR: MongoDB IP not allowed
FIX:
- Add 0.0.0.0/0 in Atlas Network Access

ERROR: Patient creation failed (age error)
FIX:
- Age must be numeric
- Use number input

ERROR: Cannot GET /login.html
FIX:
- This project uses dashboard.html as login page


----------------------------------
HOW TO DEPLOY (HOSTING)
----------------------------------

IMPORTANT:
Frontend and backend must be hosted separately.

RECOMMENDED HOSTING:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas


DEPLOY BACKEND (RENDER):

1) Create a GitHub repository
2) Push this project to GitHub
3) Go to https://render.com
4) New → Web Service
5) Connect GitHub repository
6) Build command:

   npm install

7) Start command:

   node backend/server.js

8) Add Environment Variable:
   - Key: MONGO_URI
   - Value: (your MongoDB Atlas URI)

9) Deploy and wait until status is LIVE
10) Copy backend URL (example):
    https://hms-backend.onrender.com


DEPLOY FRONTEND (VERCEL):

1) Go to https://vercel.com
2) New Project → Import GitHub repo
3) Set Root Directory to:

   frontend

4) Deploy
5) You will get a URL like:
   https://hms-project.vercel.app


CONNECT FRONTEND TO BACKEND:

- Replace all occurrences of:
  http://localhost:5000

- With your Render backend URL:
  https://hms-backend.onrender.com


----------------------------------
IMPORTANT NOTES
----------------------------------

- This is a demo/academic project
- Authentication is intentionally simple
- For production, uploads should be stored in cloud storage (Cloudinary/S3)
- Local uploads may not persist on hosting platforms


----------------------------------
END OF FILE
----------------------------------
