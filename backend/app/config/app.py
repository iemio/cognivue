# app/config.py
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

PUSHER_APP_ID  = os.getenv("PUSHER_APP_ID")
PUSHER_KEY=os.getenv("PUSHER_KEY")
PUSHER_SECRET=os.getenv("PUSHER_SECRET")
PUSHER_CLUSTER=os.getenv("PUSHER_CLUSTER")