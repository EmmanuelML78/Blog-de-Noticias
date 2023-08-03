# Blog de Noticias

---

![BN ](https://res.cloudinary.com/dd5jlib2e/image/upload/v1691076708/Captura_de_pantalla_41_qchgm9.png)

---

---

## Requisitos para ejecutarla localmente ✔️✔️

1. Intala PostgreSQL
2. Crea una BDD llamada noticias
3. Dentro de `./back` crea una archivo .env con sus credenciales como se muestra a continuacion

```
DB_USER= tu nombre de usuario de postgresql
DB_PASSWORD= tu contraseña de posgresql
DB_NAME=noticias
DB_HOST=localhost
DB_PORT= el puerto elejido por lo general es: 5432
PORT= elegir el puerto donde quieres ejecutar el backend
SECRET_KEY= crear un secret key para el token de autenticaicon
```

Reemplaza: `DB_USER` , `DB_PASSWORD` , `DB_PORT`, `PORT`, `SECRET_KEY` con tus datos.

---

---

## Instalación ✔️✔️

Utilice el administrador de paquetes `npm` para instalar. Recuerda usar este comando en cada una de las carpetas, es decir en `./back` y `./front`

`npm install`

---

---

## Ejecutar local ✔️✔️

- Frontend dentro de `./front`

`npm run dev`

- Backend dentro de `./back`

`npm run dev`

---