const LocalStrategy = require('passport-local').Strategy;
const {User} = require("../model");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const config = require('config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const signUp = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        const bcryptPassword = await bcrypt.hash(password, 12);
        const userFromDb = await User.findOne({where: {email}});
        if (userFromDb) return done(null, false, {message: 'User exist'});
        const user = await User.create({email, password: bcryptPassword, status: 'unblocked'});
        return done(null, user, {message: 'Signup successful',});
    }
)

const login = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        const user = await User.findOne({where: {email}});
        if (!user) {
            return done(null, false, {message: 'User not found'});
        }

        if (user.status && user.status !== 'unblocked') {
            return done(null, false, {message: 'User blocked'});
        }

        const validate = await bcrypt.compare(password, user.password)
        if (!validate) {
            return done(null, false, {message: 'Wrong Password'});
        }

        let dataValues = user.dataValues;
        delete dataValues.password
        return done(null, dataValues, {message: 'Logged in Successfully'});
    }
)

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: config.get("jwtSecret"),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (jwt_payload, done) => {
        try {
            const user = await User.findOne({where: {id: jwt_payload.id}});
            if (user && user.status === 'unblocked') {
                done(null, user)
            } else {
                console.log("Auth by created date: ",user.createdAt === jwt_payload.createdAt)
                done(null, false,{message: 'Not found or blocked'})
            }
        } catch (e) {
            done(e, false, {message: 'Jwt error'})
        }
    }
)


module.exports = {login, signUp, jwtStrategy}