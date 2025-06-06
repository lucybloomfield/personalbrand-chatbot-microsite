const chatBox = document.getElementById('chat');
const userInput = document.getElementById('user-input');

const chatbotMessages = [
    "Hey, I’m Lucy 👋",
    "I build eCommerce marketing products designed to replace me — tools that help founders scale without agencies or freelancers.",
    "A bit about me:",
    "📦 Helped AusPost launch Fulfilio, their premium 3PL offer",
    "🧴 Took my first skincare brand from 0 to 10,000 customers in 18 months",
    "💼 Built a marketing services company from 0 to $100k/month",
    "Right now, I’m open to the right briefs — consulting, content, strategy, or software — drop yours below 👇",
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
      messageDiv.classList.add('p-4', 'bg-gray-100', 'rounded-lg', 'max-w-xs', 'mb-4', 'bot', 'w-full', 'text-left');
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
  messageDiv.classList.add('p-4', 'bg-blue-500', 'text-white', 'rounded-lg', 'max-w-xs', 'user');
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
    formDiv.classList.add(
      'animate__animated', 'animate__fadeInUp', 'p-4',
      'bg-gray-100', 'rounded-lg', 'max-w-xs', 'bot',
      'w-full', 'text-left', 'mb-4'
    );
    
    formDiv.innerHTML = `
      <a href="https://forms.gle/QwjRBpT1SiB6RDFu9" 
         target="_blank" 
         class="inline-block w-full text-center text-white p-2 rounded transition">
        Submit Your Project Brief
      </a>
    `;
  
    chatBox.appendChild(formDiv);
  }
  

// Function to show Typing... indicator
function showTypingIndicator() {
  typingDiv = document.createElement('div');
  typingDiv.classList.add('text-left', 'typingIndicatorBubble');
  const dotSpan1 = document.createElement('span');
  dotSpan1.classList.add('typingIndicatorBubbleDot');
  const dotSpan2 = document.createElement('span');
  dotSpan2.classList.add('typingIndicatorBubbleDot');
  const dotSpan3 = document.createElement('span');
  dotSpan3.classList.add('typingIndicatorBubbleDot');

  typingDiv.appendChild(dotSpan1);
  typingDiv.appendChild(dotSpan2);
  typingDiv.appendChild(dotSpan3);
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


function updateTime() {
    const timeElement = document.getElementById("time");
    const now = new Date().toLocaleTimeString('en-AU', {
      timeZone: 'Australia/Adelaide',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false  // use true if you want AM/PM
    });
  
    timeElement.textContent = now;
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

  /*
  // Video Call Button Logic (Open Video Modal)
  document.getElementById("video-call-button").addEventListener("click", function() {
    // Hide the previous screen and show the video screen
    document.getElementById("videoModal").classList.remove("hidden");
    document.getElementById("videoModal").style.display = "flex";
  });

  // Close Modal Logic
  document.getElementById("video-back-button").addEventListener("click", function() {
    document.getElementById("videoModal").classList.add("hidden");
    document.getElementById("chat-container").style.display = "flex";
  });*/

  // Video Call Button Logic (Open Video Modal)
  document.getElementById("contact-card").addEventListener("click", function() {
    document.getElementById("contact-modal").classList.remove("hidden");
  });

  // Close Modal Logic
  document.getElementById("close-contact-modal").addEventListener("click", function() {
    document.getElementById("contact-modal").classList.add("hidden");
    document.getElementById("chat-container").style.display = "flex";
  });