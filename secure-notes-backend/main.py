from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8081",
    "http://127.0.0.1:8081",
    "http://192.168.40.181:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

fake_users = {"alice": "password123"}
fake_notes = {"alice": ["First secure note"]}

@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username in fake_users and fake_users[form_data.username] == form_data.password:
        return {"access_token": form_data.username, "token_type": "bearer"}
    raise HTTPException(status_code=400, detail="Invalid credentials")

@app.get("/notes")
def get_notes(token: str = Depends(oauth2_scheme)):
    if token not in fake_notes:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"notes": fake_notes[token]}

@app.post("/notes")
def add_note(note: str, token: str = Depends(oauth2_scheme)):
    if token not in fake_notes:
        fake_notes[token] = []
    fake_notes[token].append(note)
    return {"message": "Note added"}
