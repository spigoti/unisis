const {verify} = require('jsonwebtoken');

function confirmAuthenticated(req, res, next) {
    const [, token] = req.headers.authorization.split(' ');

    if(!token) {
        return res.status(400).json({
            error: "Token inválido"
        })
    }

    try {
        const {exp, sub} = verify(token, process.env.JWT_SECRET);
        // if (Date.now() >= exp * 1000) {
        //     return res.status(201).json({
        //         error: "Token expirado"
        //     })
        // };

        req.userId = sub;
        return next();

    } catch (error) {
        return res.status(500).json({
            error: "Deu erro"
        })
    }
}

module.exports = {confirmAuthenticated}