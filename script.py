# ...existing code...
import json
import mysql.connector
from typing import List, Dict, Any

# Ajuste: arquivo JSON contendo um array de objetos (ou objetos por linha)
JSON_FILE = r"c:\\Users\\joaop\\OneDrive\\Documentos\\Estudo\\MTrader\\mtgCards.json"

# Conexão MySQL
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="m_trader"
)
cur = conn.cursor()

# Tabela e colunas desejadas
table = "library"
columns = [
    "name",
    "image_small",
    "image_normal",
    "image_large",
    "image_png",
    "set_name",
]
placeholders = ", ".join(["%s"] * len(columns))
insert_sql = f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({placeholders})"

def load_json_file(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        text = f.read().strip()
        # Se for um array JSON
        if text.startswith("["):
            return json.loads(text)
        # Se for vários objetos JSON um por linha
        objs = []
        for line in text.splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                objs.append(json.loads(line))
            except json.JSONDecodeError:
                # tenta consertar vírgulas finais ou extrair objeto completo
                pass
        return objs

data = load_json_file(JSON_FILE)

rows = []
for obj in data:
    # cada obj tem estrutura Scryfall - extrair campos solicitados
    name = obj.get("name")
    image_uris = obj.get("image_uris") or obj.get("image_uris", {}) or {}
    # Alguns dumps usam 'image_uris' dentro de 'card_faces' ou outra estrutura; tenta fallback
    if not image_uris and "card_faces" in obj and isinstance(obj["card_faces"], list):
        # pega o primeiro face se existir
        face = obj["card_faces"][0]
        image_uris = face.get("image_uris") or {}

    image_small = image_uris.get("small")
    image_normal = image_uris.get("normal")
    image_large = image_uris.get("large")
    image_png = image_uris.get("png")
    set_name = obj.get("set_name")

    rows.append((name, image_small, image_normal, image_large, image_png, set_name))

# Inserção em lote (com tratamento simples)
if rows:
    try:
        cur.executemany(insert_sql, rows)
        conn.commit()
    except mysql.connector.Error as e:
        conn.rollback()
        print("Erro ao inserir:", e)
    finally:
        cur.close()
        conn.close()

print(f"Inseridas {len(rows)} linhas em {table}")
# ...existing code...