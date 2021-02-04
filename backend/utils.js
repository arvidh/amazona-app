

import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    //console.log("generateToken: process.env.JWT_SECRET: "+process.env.JWT_SECRET)
    return jwt.sign(
            {_id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, isSeller: user.isSeller},
            process.env.JWT_SECRET || 'somethingsecret', 
            {expiresIn: '30d'}
        )
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization
    console.log("authorization: "+JSON.stringify(authorization))
    if (authorization){
        const token = authorization.slice(7, authorization.length)
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) =>{
            if (err){
                res.status(401).send({message: 'Invalid Token'})
            }
            else {
                req.user = decode
                next()
            }
        })
    }
    else {
        res.status(401).send({message: 'No Token'})
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next()
    else res.status(401).send({message: 'Invalid Admin Token'})
}

export const isSeller = (req, res, next) => {
    if (req.user && req.user.isSeller) next()
    else res.status(401).send({message: 'Invalid Seller Token'})
}

export const isSellerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isSeller || req.user.isAdmin)) next()
    else res.status(401).send({message: 'Invalid Admin/Seller Token'})
}