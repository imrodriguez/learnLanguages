import {
    ThemeProvider,
    createGlobalStyle
} from "styled-components"
import React from 'react'

const theme = {
    colors: {
        primary: "#9b003dff",
        secondary: "#ffcd00ff",
    },
    fontSizes: {
        small: "1em",
        medium: "2em",
        large: "3em"
    }
}

const GlobalStyle = createGlobalStyle`
    html, body {
        height: 100%;
    }
    
    body {
        margin: 0;
    }

    a:hover {
        cursor: pointer; 
    }

    #root {
        height: 100%;
    }
`

const Theme = ({ children }) => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
    </ThemeProvider>
)

export default Theme