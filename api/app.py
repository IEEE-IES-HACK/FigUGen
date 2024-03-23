from flask import Flask, request
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()
from flask_cors import CORS, cross_origin

print(os.getenv("OPENAI_API_KEY"))

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

def PrompttoFigma(text):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant. You are great at converting user prompts into figma api codes for generating components in figma.For reference use https://www.figma.com/plugin-docs/api/global-objects/ and all the sub directories. You will respond the correct api call code which i can directly pass to api to create components.Nothing else. You should generate the code to create the components. You could use loops or any programming logic for creating awesome designs which is suitable with the prompt. Please avoid any characters that won't be able to be executed such as \n etc. You should only return the code that can be executed, no irrelevant text should be present. The response code should be JavaScript, else it won't be able to be executed."},
                {"role": "user", "content": text},
            ],
            stream=False,  # Setting stream to False
        )
        figmacode = response.choices[0].message.content
        return figmacode
    except Exception as error:
        print(f"An error occurred: {error}")
        return None
    

app = Flask(__name__)
cors = CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
@cross_origin()
def home():
  return "Hello, World!"

@app.route('/', methods=['POST'])
def post_request():
  data = request.get_json()
  prompt = data['prompt']
  return PrompttoFigma(prompt)

if __name__ == '__main__':
  app.run()