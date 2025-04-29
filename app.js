const chatBox = document.getElementById('chat');
const userInput = document.getElementById('user-input');

const chatbotMessages = [
  "Helloooooo!",
  "I'm based in Adelaide, but I work with companies nationwide.",
  "I bring a unique blend of marketing, sales, project management and technical skill to large-scale organisations.",
  "Here’s a bit of what I’ve done:",
  "I grew my first skin care brand from 0 to 10,000 customers in 18 months",
  "I helped Australia Post launch their premium 3PL offering, Fulfilio",
  "I grew a marketing services company called 10k Customers from 0 to $100k p/m",
  "I helped Brunetti Oro double and triple their seasonal category revenue",
  "Honestly, the list goes on.",
  "Right now, I'm open to project briefs for specific types of work.",
  "If you think you've got something my skill will help solve, send me your brief 👇"
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
  typingDiv.classList.add('animate__animated', 'animate__fadeInUp', 'p-4', 'bg-gray-700', 'text-white', 'rounded-lg', 'max-w-xs', 'mb-4', 'w-full', 'text-left');
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
