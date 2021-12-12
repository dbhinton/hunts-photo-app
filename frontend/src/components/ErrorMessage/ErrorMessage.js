import React from 'react'
import { Alert } from 'react-bootstrap'

export default function ErrorMessage({ variant, children }) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}
