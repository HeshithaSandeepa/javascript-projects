const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;


//create a new message element and return it
const createMessageElement = (content, className) => {
  const div = document.createElement("div");
  div.classList.add("message",className);
  div.innerHTML = content;
  return div;
}


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
};

// prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  handleOutgoingchat();
});








