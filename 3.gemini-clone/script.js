const typingForm =document.querySelectorAll(".typing-form");

// prevent default form submisson and handle outgoing chat
typingForm.addEventListener("submit",(e) => {
  e.preventDefault();

  handleOutgoingChat();
  
})