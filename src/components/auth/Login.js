import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Login.css"
import { Card } from "react-bootstrap"
import Logo from "./Logo.svg";
import Button from "react-bootstrap/Button"

export const Login = () => {
    const [email, set] = useState("molly@email.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUser => {
                if (foundUser.length === 1) {
                    const user = foundUser[0]
                    localStorage.setItem("cookijar_user", JSON.stringify({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }))
                    navigate("/")
                    window.alert('Welcome back ' + user.name + '!')
                }
                else {
                    window.alert("Invalid login. Please Try again.")
                }
            })
    }

    return (
        <main className="container--login">
            <Card className="form--login">
                <form className="form--login" onSubmit={handleLogin}>
                    <Card.Header>
                        <center>
                            <img src={Logo} alt="Login-logo"
                                width="400"
                                height="400"

                                className="Login-Logo" />
                            <h3>Please sign in</h3>
                        </center>
                    </Card.Header>
                    <Card.Body>

                        <fieldset>
                            <label htmlFor="inputEmail"><h3>

                            </h3>
                                Email address</label>
                            <input type="email"
                                value={email}
                                onChange={evt => set(evt.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                    </Card.Body>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
                <section className="link--register">
                    <Link to="/register">Not a member yet?</Link>
                </section>
            </Card>
        </main>
    )
}


