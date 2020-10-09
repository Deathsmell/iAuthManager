const jwt = require('jsonwebtoken');





const createJwt = () => {
    let user = {id: 12, email: "213"}
    return jwt.sign(
        {_id: user.id, email: user.email},
        'deathsmellSecret',
        {expiresIn: '1h'}
    )
}


const checkUser = (jwtToken) => {
    return jwt.verify(jwtToken,'deathsmellSecret')
}

let jwt1 = createJwt();
let checkUser1 = checkUser(jwt1);
console.log(checkUser1);
