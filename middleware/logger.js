const logger = ( req, res, next) => {
    const method = req.method;
    const path = req.originalUrl;
    const timeStamp = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
    });

    console.log(`[${method}] ${path} - ${timeStamp}`);

    next();
};

module.exports = logger;