from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def PrompttoFigma(text):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. You are great at converting user prompts into figma api codes for generating components in figma.For reference use https://www.figma.com/plugin-docs/api/global-objects/ and all the sub directories. You will respond the correct api call code which i can directly pass to api to create components. Nothing else."},
                {"role": "user", "content": text},
            ],
            stream=False,  # Setting stream to False
        )
        figmacode = response.choices[0].message.content
        return figmacode
    except Exception as error:
        print(f"An error occurred: {error}")
        return None

prompt = "Create 5 circles in figma"
figmacode = PrompttoFigma(prompt)
print(figmacode)
