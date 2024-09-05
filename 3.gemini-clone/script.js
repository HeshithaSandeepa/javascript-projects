const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;

//create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

// show loading Animation while api response
const showLoadingAnimation = () => {
  const html = ` <div class="message-content">
              <img src="./images/gemini.svg" alt="gemini image" class="avater">
              <p class="text"></p>
                <div class="loading-indicator">
                  <div class="loading-bar"></div>
                  <div class="loading-bar"></div>
                  <div class="loading-bar"></div>
                </div>
            </div>
            <span class="icon material-symbols-outlined">content_copy</span>`;

  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatList.appendChild(incomingMessageDiv);
};

// handle sending outgoing messages
const handleOutgoingchat = () => {
  userMessage = typingForm.querySelector(".typing-input").value.trim();
  if (!userMessage) return; //exit if there is no message

  // console.log(userMessage);
  const html = ` <div class="message-content">
                <img src="./images/user.jpg" alt="user image" class="avater">
                <p class="text"></p>
              </div>`;

  const outgoingMessageDiv = createMessageElement(html, "outgoing");
  outgoingMessageDiv.querySelector(".text").innerHTML = userMessage;
  chatList.appendChild(outgoingMessageDiv);

  typingForm.reset(); // clear input field
  setTimeout(showLoadingAnimation, 500); // show loading animation after a dely
};

// prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  handleOutgoingchat();
});
