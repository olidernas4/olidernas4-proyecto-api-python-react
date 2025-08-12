import bcrypt

# Contraseña que quieres hashear
password = "1"

# Generar un salt y hashear la contraseña
hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

print(hashed_password.decode('utf-8'))  # Esto imprime la contraseña hasheada
