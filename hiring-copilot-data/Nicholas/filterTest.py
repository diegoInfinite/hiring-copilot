import os
from google import genai
from google.genai import types
from dotenv import load_dotenv
import pdfplumber
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv()  # Load GEMINI_API_KEY from .env


# ------------------------------
# PDF → TEXT
# ------------------------------
def pdf_to_text(path: str) -> str:
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text() or ""
            text += page_text + "\n"
    return text


# ------------------------------
# GENERATE FUNCTION
# ------------------------------
def generate(job_description: str, resume: str):
    client = genai.Client(
        api_key=os.environ.get("GEMINI_API_KEY")
    )

    model = "gemini-flash-latest"

    # Simple, clean prompt
    user_prompt = f"""
Compare the job description and the resume.

Your tasks:
1. Give a suitability score from 1 to 100.
2. Explain briefly why.
3. Provide 5 interview questions.

--- Job Description ---
{job_description}

--- Resume ---
{resume}
"""

    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_prompt)],
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
        thinking_config=types.ThinkingConfig(
            thinking_budget=-1,
        ),
        image_config=types.ImageConfig(
            image_size="1K",
        ),
        system_instruction=[
            types.Part.from_text(text=(
                "You are an HR employee; you speak in a direct but respectful tone. "
                "Your task is to check new job applicants' resumes against the job description "
                "and give a score from 1-100 plus 5 interview questions."
            )),
        ],
    )

    # Stream the response
    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        if chunk.text:
            print(chunk.text, end="")


# ------------------------------
# MAIN ENTRY
# ------------------------------
if __name__ == "__main__":
    # Load job description text
    with open(os.path.join(BASE_DIR, "job_description.txt"), "r", encoding="utf-8") as f:
        job_description = f.read()

resume_text = pdf_to_text(os.path.join(BASE_DIR, "resume.pdf"))


    # Run comparison
generate(job_description, resume_text)
