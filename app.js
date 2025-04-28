const chatBox = document.getElementById('chat');
const userInput = document.getElementById('user-input');

const chatbotMessages = [
  "Hey! 👋 I'm Lucy. Thanks for popping by.",
  "I'm based in Melbourne, but I work with companies worldwide. 🌎",
  "I help brands nail their marketing and performance without the usual agency crap. 🚀",
  "Right now, I'm open to project briefs for specific types of work.",
  "If you think we'd vibe, send me your brief 👇"
];

let currentMessage = 0;

// Function to animate the chat messages
function showNextMessage() {
  if (currentMessage < chatbotMessages.length) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('animate__animated', 'animate__fadeInUp', 'p-2', 'bg-gray-100', 'rounded-lg', 'max-w-xs');
    messageDiv.textContent = chatbotMessages[currentMessage];
    chatBox.appendChild(messageDiv);
    currentMessage++;
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the latest message

    // Call the function again after 2 seconds to show the next message
    setTimeout(showNextMessage, 2000);
  } else {
    // After the last message, show the form
    showForm();
  }
}

// Function to show the form at the end of the chat
function showForm() {
  const formDiv = document.createElement('div');
  formDiv.classList.add('animate__animated', 'animate__fadeInUp', 'p-2', 'bg-gray-100', 'rounded-lg', 'max-w-xs');
  formDiv.innerHTML = `
    <label for="brief" class="block">Tell me about your project:</label>
    <textarea id="brief" class="w-full p-2 mt-2 border rounded" rows="4" placeholder="Your project details..."></textarea>
    <button id="submit-btn" class="mt-2 p-2 bg-blue-500 text-white rounded">Submit</button>
  `;
  chatBox.appendChild(formDiv);

  // Handle form submission
  document.getElementById('submit-btn').addEventListener('click', function() {
    const brief = document.getElementById('brief').value;
    console.log('Project brief submitted:', brief);
    // You can handle form submission here (e.g., send data to email via FormSubmit or Netlify)
    alert('Your brief has been submitted!');
  });
}

// Start the chat
showNextMessage();
