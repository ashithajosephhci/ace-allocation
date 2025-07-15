from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.dialects.postgresql.psycopg2 import PGDialect_psycopg2

# Disable hstore support (which is causing SSL issue)
PGDialect_psycopg2.use_native_hstore = False

# Replace with your actual database URL
DATABASE_URL = "postgresql://postgres.dgsgqvnzeiyzpubuktxf:Edupathhci25@aws-0-ap-southeast-2.pooler.supabase.com:6543/postgres"

engine = create_engine(DATABASE_URL, echo=True, pool_pre_ping=True )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
