import React from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const SignupScreen = () => {
  return (
    <FormContainer>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Full Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="outline-info" type="submit" className='mx-auto'>
          Signup
        </Button>
      </Form>
    </FormContainer>
  )
}

export default SignupScreen