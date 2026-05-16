// Mock user database — in production this would query a real DB
const MOCK_USER = [
    { username: 'admin', password: 'admin123'},
    { username: 'user', password: 'user123' },
];

// Mock JWT — looks like a real token but is not cryptographically signed
const MOCK_JWT = 
    'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4ifQ.bW9ja1NpZ25hdHVyZUhlcmU';

//POST /api/login - fetch credentials and send mock JWT token 
const login = (req, res) => {
    const { username, password } = req.body;

    //Validate fields present
    if(!username || !password ){
        return res.status(400).json({
            status: 'error',
            message: 'username and password are required',
        });
    };

    // Check credentials against mock users
    const user = MOCK_USER.find(
        (p) => p.username === username && p.password === password 
    );

    if(!user){
        return res.status(401).json({
            status: 'error',
            message: 'Invalid credentials',
        });
    };

    // Credentials matched — return mock token
    res.status(200).json({
        status: 'success',
        message: 'Login successful',
        token: MOCK_JWT,
        user: { username: user.username },
    });
};

module.exports = login;
