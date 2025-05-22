$(document).ready(function () {
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
  
    // Add message to chat box
    function addMessage(text, className) {
      const msg = document.createElement('div');
      msg.classList.add('message', className);
      msg.textContent = text;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  
    // Send message to backend and handle response
    function getBotResponse(userText) {
        const userMessages = $(".message.user").map(function () {
          return $(this).text();
        }).get();
        userMessages.pop();
      
        const botMessages = $(".message.bot").map(function () {
          return $(this).text();
        }).get();
      
        const context = [];
        for (let i = 0; i < botMessages.length; i++) {
          const u = userMessages[i] || "";
          const b = botMessages[i] || "";
      
          context.push({ role: "user", message: u });
          context.push({ role: "model", message: b }); // "Model" must match backend enum if strict
        }
      
        const payload = {
          role: "user",
          message: userText,
          ...(context.length > 0 && { context: context })
        };
      
        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:8000/send_msg",
          data: JSON.stringify(payload),
          contentType: "application/json",
          success: function (response) {
            addMessage(response.response.text, 'bot');
          },
          error: function (xhr, status, error) {
            console.error("Error from API:", error);
            addMessage("Something went wrong!", 'bot');
          }
        });
      }
      
  
    // Handle form submission
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const userText = userInput.value.trim();
      if (!userText) return;
  
      addMessage(userText, 'user');
      getBotResponse(userText);
      userInput.value = '';
    });
  });
  