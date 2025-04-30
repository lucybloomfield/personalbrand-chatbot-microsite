const chatBox = document.getElementById('chat');
const userInput = document.getElementById('user-input');

const chatbotMessages = [
    "Hey, I’m Lucy 👋",
    "I help growth-stage and established brands solve marketing, sales, and performance problems.",
    "Sometimes that means building campaigns. Sometimes it's 1:1 advisory or team training. Occasionally, I make content. Depends on what is most likely to move the needle (for you).",
    "A bit about me:",
    "📦 Helped AusPost launch Fulfilio, their premium 3PL offer",
    "🧴 Took my first skincare brand from 0 to 10,000 customers in 18 months",
    "💼 Built a marketing services company from 0 to $100k/month",
    "🍰 Helped Brunetti Oro double and triple seasonal revenue",
    "Right now, I'm open to the right briefs—consulting, content, strategy, or something else.",
    "If you’ve got something specific in mind—or want to chat through how I could help—drop it below 👇"
  ];  

let currentMessage = 0;
let typingDiv = null; // Variable to hold the typing indicator

// Function to animate the chat messages
function showNextMessage() {
  if (currentMessage < chatbotMessages.length) {
    showTypingIndicator();

    // Delay before showing the next message
    setTimeout(() => {
      removeTypingIndicator();

      const messageDiv = document.createElement('div');
      messageDiv.classList.add('animate__animated', 'animate__fadeInUp', 'p-4', 'bg-gray-100', 'rounded-lg', 'max-w-xs', 'mb-4', 'bot', 'w-full', 'text-left');
      messageDiv.textContent = chatbotMessages[currentMessage];
      chatBox.appendChild(messageDiv);
      currentMessage++;
      chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the latest message
    }, 1000); // 1 second delay for "Lucy is typing..."
  } else {
    // After the last message, show the form
    showForm();
  }
}

// Function to handle user message submission
function handleUserMessage(input) {
  const messageWrapperDiv = document.createElement('div');
  messageWrapperDiv.classList.add('flex', 'w-full', 'mb-4'); // Align to the right

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('animate__animated', 'animate__fadeInUp', 'p-4', 'bg-blue-500', 'text-white', 'rounded-lg', 'max-w-xs', 'user');
  messageDiv.textContent = input;

  messageWrapperDiv.appendChild(messageDiv); // Wrap the bubble inside the full-width div
  chatBox.appendChild(messageWrapperDiv);
  userInput.value = ''; // Clear input field
  chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the latest message
  // Proceed to show bot message after user message
  showNextMessage();
}

// Function to show the form at the end of the chat
function showForm() {
  const formDiv = document.createElement('div');
  formDiv.classList.add('animate__animated', 'animate__fadeInUp', 'p-4', 'bg-gray-100', 'rounded-lg', 'max-w-xs', 'bot', 'w-full', 'text-left', 'mb-4');
  formDiv.innerHTML = `
    <label for="brief" class="block mb-2">Tell me about your project:</label>
    <textarea id="brief" class="w-full p-2 mt-2 border rounded" rows="4" placeholder="Your project details..."></textarea>
    <button id="submit-btn" class="mt-2 p-2 bg-blue-500 text-white rounded w-full">Submit</button>
  `;
  chatBox.appendChild(formDiv);

  // Handle form submission
  document.getElementById('submit-btn').addEventListener('click', function() {
    const brief = document.getElementById('brief').value;
    console.log('Project brief submitted:', brief);
    alert('Your brief has been submitted!');
  });
}

// Function to show Typing... indicator
function showTypingIndicator() {
  typingDiv = document.createElement('div');
  typingDiv.classList.add('animate__animated', 'animate__fadeInUp', 'p-4', 'bg-gray-700', 'text-white', 'rounded-lg', 'max-w-xs', 'mb-4', 'w-full', 'text-left', 'typing-indicator');
  typingDiv.textContent = '...';
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to latest
}

// Function to remove the Typing... indicator
function removeTypingIndicator() {
  if (typingDiv) {
    chatBox.removeChild(typingDiv);
    typingDiv = null;
  }
}

// Start the chat when the page loads
showNextMessage();

// Listen for user input submission
userInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter' && userInput.value.trim()) {
    handleUserMessage(userInput.value.trim());
  }
});


// Time Update Functionality
function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateTime, 1000); // Update every second

  // Back Button Logic (Go to Home Screen)
  document.getElementById("messages-back-button").addEventListener("click", function() {
    // Hide the chat screen and show the home screen
    document.getElementById("chat-container").style.display = "none";
    document.getElementById("home-screen").style.display = "flex";
  });

  // Back to Chat Button Logic (Return to the chat screen)
  document.getElementById("back-to-chat").addEventListener("click", function() {
    // Hide the home screen and show the chat screen
    document.getElementById("home-screen").style.display = "none";
    document.getElementById("chat-container").style.display = "flex";
  });

  // Video Call Button Logic (Open Video Modal)
  document.getElementById("video-call-button").addEventListener("click", function() {
    document.getElementById("videoModal").classList.remove("hidden");
  });

  // Close Modal Logic
  document.getElementById("video-back-button").addEventListener("click", function() {
    document.getElementById("videoModal").classList.add("hidden");
    document.getElementById("chat-container").style.display = "flex";
  });