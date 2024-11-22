function showFeature(featureId) {
    document.querySelectorAll('.feature').forEach(feature => {
      feature.classList.remove('active');
      feature.classList.add('hidden');
    });
    document.getElementById(featureId).classList.add('active');
  }
  
  async function sendMessage() {
    const userMessage = document.getElementById("userMessage").value;
    const messages = document.getElementById("messages");
    
    if (userMessage.trim()) {
      const userDiv = document.createElement("div");
      userDiv.textContent = `You: ${userMessage}`;
      messages.appendChild(userDiv);
      document.getElementById("userMessage").value = "";
  
      // Send message to the backend
      try {
        const response = await fetch('http://localhost:3000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });
  
        const data = await response.json();
        const botDiv = document.createElement("div");
        botDiv.textContent = `Tessa: ${data.reply}`;
        messages.appendChild(botDiv);
      } catch (error) {
        console.error('Error in communicating with the server:', error);
      }
    }
  }
  
  
  
  function trackMood() {
    const mood = document.getElementById("moodOptions").value;
    const moodLog = document.getElementById("moodLog");
    const moodDiv = document.createElement("div");
    moodDiv.textContent = `Mood tracked: ${mood}`;
    moodLog.appendChild(moodDiv);
  }
  
  let breathingInterval;
  function startBreathing() {
    const timer = document.getElementById("breathingTimer");
    let phase = "Breathe In";
    let timeLeft = 4; // Time for each phase in seconds
  
    timer.textContent = `${phase}: ${timeLeft} seconds`;
  
    clearInterval(breathingInterval);
  
    breathingInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        timer.textContent = `${phase}: ${timeLeft} seconds`;
      } else {
        if (phase === "Breathe In") {
          phase = "Hold";
          timeLeft = 4;
        } else if (phase === "Hold") {
          phase = "Breathe Out";
          timeLeft = 6;
        } else {
          phase = "Breathe In";
          timeLeft = 4;
        }
        timer.textContent = `${phase}: ${timeLeft} seconds`;
      }
    }, 1000);
  }
  
  let waterCount = 0;
  function addWater() {
    waterCount++;
    document.getElementById("waterCount").textContent = waterCount;
  }
  
  function getPositiveMessage() {
    const messages = [
      "You are amazing!",
      "Keep going, you're doing great!",
      "Every day is a new beginning.",
      "Believe in yourself!",
      "You are stronger than you think."
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById("positiveMessage").textContent = message;
  }
  
