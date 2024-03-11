import React from 'react'

export default function TextLink({ text, url }) {
    return (
        <a href={url}>{text}</a>
    )
}