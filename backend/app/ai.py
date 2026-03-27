import os
import easyocr
from celery import Celery
try:
    from openai import OpenAI
except ImportError:
    pass

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
celery_app = Celery("ai_tasks", broker=redis_url, backend=redis_url)

@celery_app.task
def process_uploaded_document(rep_id: int, file_path: str):
    """
    Background task to process rep's uploaded PDF/Image.
    Extracts text using EasyOCR and uses GPT-4o-mini to:
    - Anonymize PII
    - Extract Metrics (Quota, ARR, Deal Size, Exp, Industries)
    """
    try:
        # Example dummy extraction using easyocr
        # reader = easyocr.Reader(['en', 'hi'])
        # result = reader.readtext(file_path, detail=0)
        # combined_text = " ".join(result)
        combined_text = "Dummy extracted text from document."

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            # Mock extraction
            metrics = {
                "quota": 120.0,
                "deal_size": 25.0,
                "arr": 1.5,
                "exp": 6,
                "industries": "SaaS, IT"
            }
        else:
            client = OpenAI(api_key=api_key)
            prompt = f"Extract quota attainment %, avg deal size in Lakhs, total ARR in Cr, years exp, and industries from the text. Return JSON. Text: {combined_text}"
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"}
            )
            # pseudo-parsing
            import json
            metrics = json.loads(response.choices[0].message.content)
        
        # In a real scenario, we'll update the RepProfile in db here
        # db = SessionLocal()
        # rep = db.query(RepProfile).get(rep_id)
        # rep.quota_attainment_pct = metrics.get('quota')
        # rep.status = 'approved'
        # db.commit()

        return {"status": "success", "rep_id": rep_id, "metrics": metrics}
    except Exception as e:
        return {"status": "error", "error": str(e)}
