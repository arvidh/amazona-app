import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {register} from '../actions/userActions'
import {useDispatch, useSelector} from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SigninScreen(props){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const redirect = props.location.search ? props.location.search.split('=')[1]: '/'
    const userRegister = useSelector((state) => state.userRegister)
    const {userInfo, loading, error} = userRegister
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword){
            alert('Password and confirm password do not match')
        }
        else {
            dispatch(register(name, email, password))
        }
    }
    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect)
        }
    }, [userInfo, props.history, redirect])

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create account</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="name" id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="email">Email address</label>
                    <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Confirm password" required onChange={(e) => setConfirmPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label></label>
                    <div>
                        Already have an account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign-in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}