const sendJwtToCLient = (user, res) => {
    const token = user.generateJwtToken();
    res.status(200)
        .cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 1000 * 60),
            secure: process.env.NODE_ENV === "development" ? false:true
        })
        .json({
            access_token: token,
            data: {
                id:user._id,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
        })
}
const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
}
const getTokenFromHeader = (req) => {
    const authorization = req.headers.authorization;
    return authorization.split(" ")[1]

}
module.exports = {
    sendJwtToCLient,
    isTokenIncluded,
    getTokenFromHeader
}