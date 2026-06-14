require('dotenv').config();
const express = require('express');
const cors = require('cors');
const verificarSupabaseToken = require('./authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/usuarios', verificarSupabaseToken, (req, res) => {
    res.json({
        mensaje: 'Usuario autenticado correctamente',
        usuario: {
            id: req.usuario.id,
            email: req.usuario.email
        }
    });
});

// Solo escucha en local (no en Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
}

module.exports = app;
