import psycopg2
from psycopg2 import OperationalError

def test_connection():
    try:
        conn = psycopg2.connect(
            dbname="defaultdb",
            user="avnadmin",
            password="AVNS_z4m3-3YWNVQiY5ot-gW",
            host="pg-ff93086-mirtarhimul-e348.d.aivencloud.com",
            port="23170",
            sslmode="require"
        )
        print("Connection successful!")
        conn.close()
    except OperationalError as e:
        print(f"Error: {e}")

test_connection()
