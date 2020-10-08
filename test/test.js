const jwt = require('jsonwebtoken');





const createJwt = () => {
    return jwt.sign(
        {status: 'online'},
        'secret',
        {expiresIn: '1h'}
    )
}


const checkUser = (jwtToken) => {
    return jwt.verify(jwtToken,'secret')
}

let jwt1 = createJwt();
let checkUser1 = checkUser(jwt1);
console.log(checkUser1);
