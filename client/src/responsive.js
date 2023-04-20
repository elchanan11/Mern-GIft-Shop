import {css} from "styled-components"
export const mobile = (props) =>{

    return css`
        @media only screen and (max-width: 500px) {
          ${props}
        }
    `
}

export const mobileMini = (props) =>{

    return css`
        @media only screen and (max-width: 330px) {
          ${props}
        }
    `
}

export const tablet = (props) =>{

    return css`
        @media only screen and (max-width: 870px) {
          ${props}
        }
    `
}

export const leptop = (props) =>{

    return css`
        @media only screen and (min-width: 870px) {
          ${props}
        }
    `
}