# AI-Chat-Bot
git clone <repo>
cd AI-Chat-Bot 
API:
  cd API 
  rename env.example to env 
  -- update file with correct vales
  pip install -r requirements.txt
  
  run:  uvicorn main:app --host 0.0.0.0 --port 8000 --reload
UI:
   cd UI
   npm install
   src/util/config - check the URL
   npm run dev - local env.
   npm run build - to host.
