from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import uvicorn

def backend():
    api = FastAPI()

    @api.get("/hello")
    def read_root():
        return {"Hello": "World"}


    @api.get("/items/{item_id}")
    def read_item(item_id: int, q: str = None):
        return {"item_id": item_id, "q": q}

    return api


def frontend(build_dir="./build"):
    import pathlib
    import fastapi.exceptions
    from fastapi import FastAPI, Request, Response
    from fastapi.staticfiles import StaticFiles

    build_dir = pathlib.Path(build_dir)

    react = FastAPI(openapi_url="")

    react.mount('/static', StaticFiles(directory=build_dir, html=True))

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
    app.mount('/', frontend(build_dir='./out'))
    uvicorn.run(app, port=8000)

if __name__ == '__main__':
    main()
