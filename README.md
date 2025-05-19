
# 🧓💬 CatBot - Tech Helper for Elderly (FastAPI + Gemini)

Welcome to **CatBot**, a friendly AI assistant built with **FastAPI** and powered by **Google Gemini**. Designed to patiently assist **elderly users with tech problems**, CatBot focuses on simplicity, clarity, and user comfort — no technical jargon, no command-line magic. Just helpful answers. 🧡

---

## ✨ Features

- 🤖 **Natural language support** via Gemini 2.5 Flash
- 💾 Loads API key securely via `.env`
- 🧠 Remembers **conversation context** (previous messages)
- 🧓 Tailored responses for **elderly/non-tech-savvy** users
- 🔧 Simple steps for common tasks like formatting pendrives, using browsers, etc.
- ⚡ Built with **FastAPI** for speed and flexibility

---

## 📁 Project Structure

```
catbot/
├── main.py                 # FastAPI app
├── model.py                # Pydantic model for message handling
├── generate.py             # Gemini content generation logic
├── .env                    # Securely store your Gemini API Key
└── README.md               # You're reading it!
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/catbot.git
cd catbot
```

### 2. Create and Activate a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up `.env`

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

### 5. Run the FastAPI Server

```bash
uvicorn main:app --reload
```

---

## 📬 API Usage

### Endpoint: `POST /send_msg`

**Request Body:**

```json
{
  "role": "User",
  "message": "Yes I have backed up and am sure I have a Windows 11 PC",
  "context": [
    {"user": "Help me format my pendrive"},
    {"model": "Is the pendrive connected to your computer?"},
    {"user": "yes now what"},
    {"model": "Are you using Windows or Mac?"}
  ]
}
```

**Response:**

```json
{
  "response": [
    {
      "text": "Okay, perfect! Here are the steps to format your pendrive on Windows 11..."
    }
  ]
}
```

---

## 💡 Developer Notes

- Add context in a clean, sequential format
- The system prompt is tailored specifically for **non-technical elderly users**
- Use `.encode().decode('unicode_escape')` to clean Gemini's response output
- Easy to customize and extend (e.g., for new devices or platforms)

---

## 🛠 Built With

- 🐍 Python 3.10+
- ⚡ FastAPI
- 🌐 Google Gemini API
- 🔐 python-dotenv
- 📦 Pydantic

---

## 🙏 Special Thanks

To all the **grandparents, parents, and elders** who strive to adapt to the digital age — this one's for you. ❤️

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Agnik Roy**  
📍 India  
🔗 [GitHub](https://github.com/ar12agnik) | 🐦 [Twitter](https://twitter.com/agnikroy12)
