import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  return (
    <FormContainer>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="outline-info" type="submit" className='mx-auto'>
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default LoginScreen