import { SyntheticEvent, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("submitted")
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}

          />
        </Form.Group>

        <Button variant="outline-info" type="submit" className='mx-auto'>
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen