// $(document).ready(function () {
//     const chatForm = document.getElementById('chat-form');
//     const chatBox = document.getElementById('chat-box');
//     const userInput = document.getElementById('user-input');
  
//     // Add message to chat box
//     function addMessage(text, className) {
//       const msg = document.createElement('div');
//       msg.classList.add('message', className);
//       msg.textContent = text;
//       chatBox.appendChild(msg);
//       chatBox.scrollTop = chatBox.scrollHeight;
//     }
  
//     // Send message to backend and handle response
//     function getBotResponse(userText) {
//         const userMessages = $(".message.user").map(function () {
//           return $(this).text();
//         }).get();
//         userMessages.pop();
      
//         const botMessages = $(".message.bot").map(function () {
//           return $(this).text();
//         }).get();
      
//         const context = [];
//         for (let i = 0; i < botMessages.length; i++) {
//           const u = userMessages[i] || "";
//           const b = botMessages[i] || "";
      
//           context.push({ role: "user", message: u });
//           context.push({ role: "model", message: b }); // "Model" must match backend enum if strict
//         }
      
//         const payload = {
//           role: "user",
//           message: userText,
//           ...(context.length > 0 && { context: context })
//         };
      
//         $.ajax({
//           type: "POST",
//           url: "http://127.0.0.1:8000/send_msg",
//           data: JSON.stringify(payload),
//           contentType: "application/json",
//           success: function (response) {
//             addMessage(response.response.text, 'bot');
//           },
//           error: function (xhr, status, error) {
//             console.error("Error from API:", error);
//             addMessage("Something went wrong!", 'bot');
//           }
//         });
//       }
      
  
//     // Handle form submission
//     chatForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       const userText = userInput.value.trim();
//       if (!userText) return;
  
//       addMessage(userText, 'user');
//       getBotResponse(userText);
//       userInput.value = '';
//     });
//   });
  

// $(document).ready(function () {
//   // --- DOM Elements ---
//   const chatForm = document.getElementById('chat-form');
//   const chatBox = document.getElementById('chat-box');
//   const userInput = document.getElementById('user-input');

//   /**
//    * Appends a message to the chat box with the new UI style.
//    * @param {string} message - The message content.
//    * @param {'user' | 'bot'} sender - The sender of the message ('user' or 'bot').
//    */
//   function appendMessage(message, sender) {
//       // Remove the thinking indicator if it exists
//       removeThinkingIndicator();

//       const messageContainer = document.createElement('div');
//       messageContainer.classList.add('message-container');

//       if (sender === 'user') {
//           messageContainer.classList.add('user-message');
//           messageContainer.innerHTML = `
//               <div class="message-bubble">
//                   <div>${message}</div>
//               </div>
//               <div class="message-avatar">You</div>
//           `;
//       } else { // 'bot'
//           messageContainer.classList.add('ai-message');
//           messageContainer.innerHTML = `
//               <div class="message-avatar">AI</div>
//               <div class="message-bubble">
//                   <div>${message}</div>
//               </div>
//           `;
//       }
//       chatBox.appendChild(messageContainer);
//       // Auto-scroll to the latest message
//       chatBox.scrollTop = chatBox.scrollHeight;
//   }

//   /**
//    * Shows a thinking indicator in the chat box.
//    */
//   function showThinkingIndicator() {
//       const thinkingIndicator = document.createElement('div');
//       thinkingIndicator.id = 'thinking-indicator';
//       thinkingIndicator.classList.add('ai-message', 'message-container');
//       thinkingIndicator.innerHTML = `
//           <div class="message-avatar">AI</div>
//           <div class="message-bubble">
//               <div class="thinking">
//                   <span class="dot1"></span>
//                   <span class="dot2"></span>
//                   <span class="dot3"></span>
//               </div>
//           </div>
//       `;
//       chatBox.appendChild(thinkingIndicator);
//       chatBox.scrollTop = chatBox.scrollHeight;
//   }

//   /**
//    * Removes the thinking indicator from the chat box.
//    */
//   function removeThinkingIndicator() {
//       const indicator = document.getElementById('thinking-indicator');
//       if (indicator) {
//           indicator.remove();
//       }
//   }

//   /**
//    * Sends the message to your backend and handles the response.
//    * @param {string} userText - The text entered by the user.
//    */
//   function getBotResponse(userText) {
//       // Show the thinking indicator while waiting for the response
//       showThinkingIndicator();

//       // Collect chat history from the new message structure
//       const userMessages = $(".user-message .message-bubble div").map(function () {
//           return $(this).text();
//       }).get();
      
//       // We need the history *before* the latest message
//       userMessages.pop(); 

//       const botMessages = $(".ai-message .message-bubble div").map(function () {
//           return $(this).text();
//       }).get();

//       const context = [];
//       // Reconstruct the conversation history for the backend
//       for (let i = 0; i < botMessages.length; i++) {
//           const u = userMessages[i] || "";
//           const b = botMessages[i] || "";
//           context.push({ role: "user", message: u });
//           context.push({ role: "model", message: b });
//       }

//       const payload = {
//           role: "user",
//           message: userText,
//           ...(context.length > 0 && { context: context })
//       };

//       // AJAX call to your backend
//       $.ajax({
//           type: "POST",
//           url: "http://127.0.0.1:8000/send_msg", // Your backend endpoint
//           data: JSON.stringify(payload),
//           contentType: "application/json",
//           success: function (response) {
//               // Use the text from the correct response path
//               const botText = response.response.text || "I'm not sure how to respond to that.";
//               appendMessage(botText, 'bot');
//           },
//           error: function (xhr, status, error) {
//               console.error("Error from API:", error);
//               appendMessage("Sorry, something went wrong with the connection!", 'bot');
//           }
//       });
//   }

//   // --- Handle Form Submission ---
//   chatForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       const userText = userInput.value.trim();
//       if (!userText) return;

//       appendMessage(userText, 'user');
//       getBotResponse(userText);
//       userInput.value = '';
//   });
// });

$(document).ready(function () {
  // --- DOM Elements ---
  const chatForm = document.getElementById('chat-form');
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');

  /**
   * Parses a string with basic markdown and converts it to HTML.
   * @param {string} text - The text to parse.
   * @returns {string} - The HTML formatted string.
   */
  function parseMarkdown(text) {
      // Convert newlines to <br> tags
      let html = text.replace(/\n/g, '<br>');

      // Headings (e.g., #, ##, ###)
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      
      // Bold (e.g., **text** or *text*)
      html = html.replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>');
      html = html.replace(/\*(.*?)\*/gim, '<i>$1</i>');

      return html;
  }

  /**
   * Appends a message to the chat box with the new UI style.
   * @param {string} message - The message content.
   * @param {'user' | 'bot'} sender - The sender of the message ('user' or 'bot').
   */
  function appendMessage(message, sender) {
      // Remove the thinking indicator if it exists
      removeThinkingIndicator();

      const messageContainer = document.createElement('div');
      messageContainer.classList.add('message-container');

      if (sender === 'user') {
          messageContainer.classList.add('user-message');
          messageContainer.innerHTML = `
              <div class="message-bubble">
                  <div>${message}</div>
              </div>
              <div class="message-avatar">You</div>
          `;
      } else { // 'bot'
          // Parse the bot's message for markdown
          const formattedMessage = parseMarkdown(message);
          messageContainer.classList.add('ai-message');
          messageContainer.innerHTML = `
              <div class="message-avatar">AI</div>
              <div class="message-bubble">
                  <div>${formattedMessage}</div>
              </div>
          `;
      }
      chatBox.appendChild(messageContainer);
      // Auto-scroll to the latest message
      chatBox.scrollTop = chatBox.scrollHeight;
  }

  /**
   * Shows a thinking indicator in the chat box.
   */
  function showThinkingIndicator() {
      const thinkingIndicator = document.createElement('div');
      thinkingIndicator.id = 'thinking-indicator';
      thinkingIndicator.classList.add('ai-message', 'message-container');
      thinkingIndicator.innerHTML = `
          <div class="message-avatar">AI</div>
          <div class="message-bubble">
              <div class="thinking">
                  <span class="dot1"></span>
                  <span class="dot2"></span>
                  <span class="dot3"></span>
              </div>
          </div>
      `;
      chatBox.appendChild(thinkingIndicator);
      chatBox.scrollTop = chatBox.scrollHeight;
  }

  /**
   * Removes the thinking indicator from the chat box.
   */
  function removeThinkingIndicator() {
      const indicator = document.getElementById('thinking-indicator');
      if (indicator) {
          indicator.remove();
      }
  }

  /**
   * Sends the message to your backend and handles the response.
   * @param {string} userText - The text entered by the user.
   */
  function getBotResponse(userText) {
      // Show the thinking indicator while waiting for the response
      showThinkingIndicator();

      // Collect chat history from the new message structure
      // .text() will correctly get the content without the HTML tags
      const userMessages = $(".user-message .message-bubble div").map(function () {
          return $(this).text();
      }).get();
      
      // We need the history *before* the latest message
      userMessages.pop(); 

      const botMessages = $(".ai-message .message-bubble div").map(function () {
          return $(this).text();
      }).get();

      const context = [];
      // Reconstruct the conversation history for the backend
      for (let i = 0; i < botMessages.length; i++) {
          const u = userMessages[i] || "";
          const b = botMessages[i] || "";
          context.push({ role: "user", message: u });
          context.push({ role: "model", message: b });
      }

      const payload = {
          role: "user",
          message: userText,
          ...(context.length > 0 && { context: context })
      };

      // AJAX call to your backend
      $.ajax({
          type: "POST",
          url: "http://127.0.0.1:8000/send_msg", // Your backend endpoint
          data: JSON.stringify(payload),
          contentType: "application/json",
          success: function (response) {
              // Use the text from the correct response path
              const botText = response.response.text || "I'm not sure how to respond to that.";
              appendMessage(botText, 'bot');
          },
          error: function (xhr, status, error) {
              console.error("Error from API:", error);
              appendMessage("Sorry, something went wrong with the connection!", 'bot');
          }
      });
  }

  // --- Handle Form Submission ---
  chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const userText = userInput.value.trim();
      if (!userText) return;

      appendMessage(userText, 'user');
      getBotResponse(userText);
      userInput.value = '';
  });
});
