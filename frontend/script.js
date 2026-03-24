// Planner Logic
const subjects = [];
const subjectNameInput = document.getElementById('subject-name');
const subjectDiffInput = document.getElementById('subject-difficulty');
const subjectDaysInput = document.getElementById('subject-days');
const addSubjectBtn = document.getElementById('add-subject-btn');
const subjectsList = document.getElementById('subjects-list');
const generatePlanBtn = document.getElementById('generate-plan-btn');
const scheduleResult = document.getElementById('schedule-result');

function renderSubjects() {
    subjectsList.innerHTML = '';
    subjects.forEach((sub, index) => {
        const div = document.createElement('div');
        div.className = 'subject-item';
        div.innerHTML = `
            <span><strong>${sub.name}</strong> (Diff: ${sub.difficulty}, Days: ${sub.days_left})</span>
            <span style="cursor:pointer; color:#ef4444;" onclick="removeSubject(${index})">✕</span>
        `;
        subjectsList.appendChild(div);
    });
}

window.removeSubject = function(index) {
    subjects.splice(index, 1);
    renderSubjects();
}

addSubjectBtn.addEventListener('click', () => {
    const name = subjectNameInput.value.trim();
    const diff = parseInt(subjectDiffInput.value);
    const days = parseInt(subjectDaysInput.value);

    if (name && diff && days) {
        subjects.push({ name, difficulty: diff, days_left: days });
        subjectNameInput.value = '';
        subjectDiffInput.value = '';
        subjectDaysInput.value = '';
        renderSubjects();
    } else {
        alert("Please fill in all subject details properly.");
    }
});

generatePlanBtn.addEventListener('click', async () => {
    if (subjects.length === 0) {
        alert("Please add at least one subject.");
        return;
    }
    
    scheduleResult.innerHTML = '<p style="text-align:center; color:var(--accent);">Generating schedule...</p>';

    try {
        // Change from relative '/api/plan' to an absolute fallback for local testing if needed, but relative should work for Flask
        const response = await fetch('/api/plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ subjects })
        });
        
        const data = await response.json();
        
        if (data.schedule) {
            scheduleResult.innerHTML = '';
            data.schedule.forEach((item, idx) => {
                const div = document.createElement('div');
                div.className = 'subject-item';
                div.style.borderLeftColor = idx === 0 ? '#10b981' : (idx === 1 ? '#f59e0b' : '#3b82f6');
                div.innerHTML = `
                    <span><strong>#${idx + 1} ${item.name}</strong></span>
                    <span style="font-size: 0.85rem; color: var(--text-secondary);">Priority: ${item.priority}</span>
                `;
                scheduleResult.appendChild(div);
            });
        }
    } catch (err) {
        scheduleResult.innerHTML = '<p style="color:#ef4444;">Failed to generate schedule.</p>';
        console.error(err);
    }
});

// Chatbot Logic
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatWindow = document.getElementById('chat-window');

function appendMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, true);
    chatInput.value = '';

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.style.opacity = '0.7';
    typingDiv.textContent = '...';
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: text })
        });
        const data = await response.json();
        
        chatWindow.removeChild(typingDiv);
        
        if (data.response) {
            appendMessage(data.response, false);
        } else {
            appendMessage("Sorry, an error occurred.", false);
        }
    } catch (err) {
        chatWindow.removeChild(typingDiv);
        appendMessage("Network error. Could not reach the server.", false);
        console.error(err);
    }
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
