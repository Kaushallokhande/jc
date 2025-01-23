const jwt = require('jsonwebtoken');

const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
            }

            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid Token' });
        }
    };
};

module.exports = checkRole;
