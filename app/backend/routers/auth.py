from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from auth.auth import verify_password, create_access_token, create_refresh_token, decode_token
from database import SessionLocal
import crud.user as crud_user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")
router = APIRouter(prefix="/auth", tags=["Auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login")
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud_user.get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})

    # Set refresh token as HttpOnly cookie
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="strict",
        secure=False,  # Set to True in production with HTTPS
        max_age=7 * 24 * 60 * 60
    )

    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/refresh")
def refresh_token(response: Response, db: Session = Depends(get_db), refresh_token: str = Depends(lambda: None)):
    # Fetch from cookie manually
    from fastapi import Request
    async def _refresh(request: Request):
        refresh_token = request.cookies.get("refresh_token")
        if not refresh_token:
            raise HTTPException(status_code=401, detail="Missing refresh token")

        try:
            payload = decode_token(refresh_token)
            email = payload.get("sub")
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid refresh token")

        user = crud_user.get_user_by_email(db, email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        new_access_token = create_access_token(data={"sub": user.email})
        return {"access_token": new_access_token, "token_type": "bearer"}

    return _refresh

@router.post("/logout")
def logout(response: Response):
    response.delete_cookie("refresh_token")
    return {"detail": "Logged out successfully"}
