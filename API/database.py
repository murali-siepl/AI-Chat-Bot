from sqlalchemy.ext.asyncio import create_async_engine  # Use async engine
from config.settings import settings

engine = create_async_engine(settings.SQLALCHEMY_DATABASE_URI, echo=False, pool_pre_ping=True)