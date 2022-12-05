import React, { Children } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

interface Props {
    children: React.ReactNode
}

const FormContainer = ({ children }: Props) => {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md lg="5">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
