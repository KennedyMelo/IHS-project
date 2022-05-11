import asyncio
import websockets

async def hello():
    async with websockets.connect("ws://localhost:3001") as websocket:
        while True:
            data = await websocket.recv()
            print(f'data: {data}')

            await asyncio.sleep(2)
            await websocket.send("Hello world!")

asyncio.run(hello())
