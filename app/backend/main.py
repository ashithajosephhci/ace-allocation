from fastapi import FastAPI
from database import Base, engine
from routers import user, auth, rto, qualification, campus, cohort, unit, trainer, room, classroom
from fastapi.middleware.cors import CORSMiddleware
import models

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","http://localhost:3001"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(rto.router)
app.include_router(qualification.router)
app.include_router(campus.router)
app.include_router(cohort.router)
app.include_router(trainer.router)
app.include_router(unit.router)
app.include_router(classroom.router)
app.include_router(room.router)
