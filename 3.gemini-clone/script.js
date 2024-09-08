import API_KEY from './configure.js';
const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const toggleThemeButton = document.querySelector("#toggle-theme-button");

let userMessage = null;
//API configuration 
const API_URL =`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

//create a new message element and return it
const createMessageElement = (content, ...classes) => {
  const div = document.createElement("div");
  div.classList.add("message", ...classes);
  div.innerHTML = content;
  return div;
};

//show typing Interval effect by words one by one
const showTypingEffect = (text,textElement) => {
  const words = text.split(' ');
  let currentWordIndex = 0;

  const typingInterval = setInterval( () => {
    //append each word to the text element with a space
    textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++]
  
    //If all words are displayed
    if(currentWordIndex === words.length) {
      clearInterval(typingInterval);
    }

  },75);
}
//fetch response form the API based on user message
const generateAPIresponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector(".text"); // get tex element

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

    const  data  = await response.json();
    
    //get api response text only
    const apiResponse = data?.candidates[0].content.parts[0].text;
    // textElement.innerHTML = apiResponse;
    // console.log(apiResponse);
    showTypingEffect(apiResponse, textElement);
  }catch(error) {
    console.log(error);
  }finally {
    incomingMessageDiv.classList.remove("loading");
  }
}

// copy message 
const copyMessage = (copyIcon) => {
  const messageText = copyIcon.parentElement.querySelector(".text").innerText;
  navigator.clipboard.writeText(messageText);
  copyIcon.innerHTML = "done" //show tick icon
  setTimeout(() => copyIcon.innerHTML = "content_copy",1000) //revet icon after 1 sec
};

//light_mode dark mode 
toggleThemeButton.addEventListener("click", () => {
  const isLightMode = document.body.classList.toggle("light_mode");
  toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode"; // change icon dark mode light mode 
})

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
                <span onclick="copyMessage(this)" class="icon material-symbols-outlined">content_copy</span>
                <span class="icon material-symbols-outlined">content_copy</span>
            </div>
            `;

  const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
  chatList.appendChild(incomingMessageDiv);

  generateAPIresponse(incomingMessageDiv);
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
