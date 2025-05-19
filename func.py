import os
from dotenv import load_dotenv
from google import genai
from google.genai.types import Content, Part, Tool, GoogleSearch, GenerateContentConfig
import json
def generate(queary, context=None, *args, **kwargs):

    final_text = ""
    load_dotenv()
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise ValueError("API_KEY not found in .env file")

    client = genai.Client(api_key=api_key)
    model = "gemini-2.5-flash-preview-04-17"

    # Start with empty contents
    contents = []

    # If there's context, add it in alternating role/parts
    if context:
        for role, message in context:
            contents.append(Content(
                role=role,
                parts=[Part.from_text(text=message)]
            ))

    # Append current user query
    contents.append(Content(
        role="user",
        parts=[Part.from_text(text=queary)]
    ))

    tools = [Tool(google_search=GoogleSearch())]

    generate_content_config = GenerateContentConfig(
        tools=tools,
        response_mime_type="text/plain",
        system_instruction=[
            Part.from_text(text="""you are an helpful assistant that helps old elderly people about tech problems that they face
you would generally tell solutions to problems with computers that can be fixable not using cmd or anything a non-tech guy can understand you will ask for clarifications if you have doubt and is absolutely nessesory . by default assume it is a windows pc if not specified if anything other than tech quearies are asked Do not answer""")
        ],
    )

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        final_text+=chunk.text
        

    return {"text":final_text.encode().decode('unicode_escape')}
if __name__ == '__main__':
    context = [
        ("user", "How do I connect my printer to my laptop?"),
        ("model", "Click the Start button, go to Settings > Devices > Printers & scanners..."),
        ("user", "It is not showing up. What now?")
    ]

    response = generate("Should I restart the printer?", context=context)
    print(response)
