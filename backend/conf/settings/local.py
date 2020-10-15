from .base import *

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("DJANGO_DB_NAME", "sampledb"),
        "USER": os.environ.get("DJANGO_DB_USERNAME", "sampleuser"),
        "PASSWORD": os.environ.get("DJANGO_DB_PASSWORD", "samplesecret"),
        "HOST": os.environ.get("DJANGO_DB_HOST", "localhost"),
        "PORT": os.environ.get("DJANGO_DB_PORT", "5432"),
    }
}
