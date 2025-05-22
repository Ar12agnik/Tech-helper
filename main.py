from fastapi import FastAPI
import uvicorn
from func import generate
from pydantic import BaseModel
from typing import List, Optional, Literal
from fastapi.middleware.cors import CORSMiddleware

class ContextMessage(BaseModel):
    role: Literal["user", "model"]
    message: str

class Message(BaseModel):
    role: Literal["user", "model"]
    message: str
    context: Optional[List[ContextMessage]] = None

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/send_msg")
async def send_msg(message: Message):
    # print(message)
    query = message.message

    if message.context:
        # Reformat context to match the expected format in your `generate` function
        formatted_context = [
            (ctx.role, ctx.message)
            for ctx in message.context
        ]

        # Send query and context to your generate function
        response = generate(query, context=formatted_context)
        return {"response": response}
    else:
        response = generate(query)

    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)