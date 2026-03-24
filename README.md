# AI-Powered Student Success Hub 🎓

Welcome to the **Student Success Hub**, a comprehensive capstone project built for the BYOP course. This platform combines a **Smart Study Planner** and an **AI Virtual Teaching Assistant** into a single, cohesive web application to help students manage their time and get immediate answers to academic queries.

## 🚀 Features
- **Smart Study Planner:** Input your subjects, difficulty levels, and days remaining. The app uses a heuristic algorithm `(Priority = Difficulty * (1 / Days Left))` to generate an optimized daily study plan.
- **Virtual Teaching Assistant:** Ask questions about definitions, deadlines, or university resources. The chatbot uses NLP techniques (text preprocessing and token overlap) to fetch the most relevant answers from a knowledge base.
- **Modern UI:** Built with HTML, CSS (Glassmorphism design language), and Vanilla JS, ensuring a premium, visually engaging, and responsive experience without heavy frontend frameworks.

## 🛠️ Technology Stack
- **Backend:** Python, Flask, Flask-CORS
- **Algorithms / NLP:** Custom heuristic logic for prioritisation, regular expressions for text cleaning, token-overlap matching (simulated NLP classification).
- **Frontend:** HTML5, CSS3 (variables, flexbox, grid, animations), JavaScript ES6 (Fetch API).

## ⚙️ Setup & Installation

1. **Clone the Repository** (If applicable):
   ```bash
   git clone https://github.com/your-username/student-success-hub.git
   cd student-success-hub
   ```

2. **Install Dependencies:**
   Make sure you have Python 3 installed. Then install the project requirements:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Server:**
   ```bash
   python app.py
   ```

4. **Access the App:**
   Open your browser and navigate to `http://localhost:5000`

## 📘 How to Use
1. **Planner:** Head to the Smart Study Planner section on the left. Type in a subject name (e.g., "Data Structures"), rate its difficulty from 1 to 10, and specify how many days you have left to study. Click "Add Subject", add a few more, and click "Generate AI Schedule". The app will algorithmically order what you should focus on first.
2. **Chatbot:** Head to the right side of the dashboard. Type a question like "When does the semester end?" or "Where is the library?" and hit enter. The Virtual TA will respond instantly!

---
*Created as part of the BYOP Capstone Activity.*
