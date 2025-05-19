from fastapi import FastAPI
import uvicorn
from func import generate
from pydantic import BaseModel
from typing import List, Optional, Literal

class ContextMessage(BaseModel):
    role: Literal["user", "model"]
    message: str

class Message(BaseModel):
    role: Literal["user", "Model"]
    message: str
    context: Optional[List[ContextMessage]] = None

app = FastAPI()

@app.post("/send_msg")
async def send_msg(message: Message):
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

    return {"message": "Please provide context."}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)