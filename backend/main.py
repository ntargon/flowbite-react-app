from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
import crud
import models
import schemas
from database import SessionLocal, engine

def backend():
    api = FastAPI()

    models.Base.metadata.create_all(bind=engine)


    # Dependency
    def get_db():
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()


    @api.post("/users/", response_model=schemas.User)
    def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
        db_user = crud.get_user_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        return crud.create_user(db=db, user=user)


    @api.get("/users/", response_model=List[schemas.User])
    def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
        users = crud.get_users(db, skip=skip, limit=limit)
        return users


    @api.get("/users/{user_id}", response_model=schemas.User)
    def read_user(user_id: int, db: Session = Depends(get_db)):
        db_user = crud.get_user(db, user_id=user_id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user


    @api.post("/users/{user_id}/items/", response_model=schemas.Item)
    def create_item_for_user(
            user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
    ):
        return crud.create_user_item(db=db, item=item, user_id=user_id)


    @api.get("/items/", response_model=List[schemas.Item])
    def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
        items = crud.get_items(db, skip=skip, limit=limit)
        return items


    @api.get("/hello")
    def read_root():
        return {"Hello": "World"}


    return api


def frontend(build_dir="./build"):
    import pathlib
    import fastapi.exceptions
    from fastapi import FastAPI, Request, Response
    from fastapi.staticfiles import StaticFiles

    build_dir = pathlib.Path(build_dir)

    react = FastAPI(openapi_url="")

    react.mount('/_next/static', StaticFiles(directory=build_dir / '_next/static', html=True))

    @react.get('/{path:path}')
    async def handle_catch_all(request: Request, path):
        print(path)

        if path and path != "/":
            disk_path = build_dir / (path + '.html')
            if disk_path.exists():
                return Response(disk_path.read_bytes(), 200)
            else:
                if disk_path.is_file():
                    raise fastapi.exceptions.HTTPException(404)

        return Response((build_dir / "index.html").read_bytes(), 200)

    return react

def main():
    app = FastAPI()

    app.mount('/api', backend())
    app.mount('/', frontend(build_dir='./frontend/out'))
    uvicorn.run(app, port=8000)

if __name__ == '__main__':
    main()
