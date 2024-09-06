const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;
//API configuration 
const API_KEY ='AIzaSyC5S19quXGIGspTTl0o4_yZm8NxC3iYwrg';
const API_URL =`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=$
{API_KEY}`;

//create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};
//fetch response form the API based on user message
const generateAPIresponse = async () => {
  //send a POST request to the API with user's message
  try {
    const response = await fetch(API_URL,{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents:[{
            role: "user",
            parts: [{ text: userMessage }]
        }]
      })
    });
  }catch(error) {
    console.log(error);
  }
}

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

  generateAPIresponse();
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
