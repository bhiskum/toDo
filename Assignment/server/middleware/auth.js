var jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies['jwt'];
        const claims = jwt.verify(token,"privateKey");
        if(!claims){
            res.status(401).json({msg: 'Unauthenticated' });
          }

        req.userId = claims.userId;
        
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate!' })
    }
}

module.exports = auth
