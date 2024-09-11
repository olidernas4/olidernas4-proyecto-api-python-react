import os

class Config:
    DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql://olider:esuvejes1@localhost/escuela')
