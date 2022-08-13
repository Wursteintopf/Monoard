import { css } from '@emotion/react'
import poppinsThinWoff2 from './fonts/poppins-v20-latin-300.woff2'
import poppinsThinWoff from './fonts/poppins-v20-latin-300.woff'
import poppinsRegularWoff2 from './fonts/poppins-v20-latin-regular.woff2'
import poppinsRegularWoff from './fonts/poppins-v20-latin-regular.woff'
import poppinsThickWoff2 from './fonts/poppins-v20-latin-600.woff2'
import poppinsThickWoff from './fonts/poppins-v20-latin-600.woff'

export const globalStyles = css`
  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    src: local(''),
        url(${poppinsThinWoff2}) format('woff2'),
        url(${poppinsThinWoff}) format('woff');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url(${poppinsRegularWoff2}) format('woff2'),
        url(${poppinsRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    src: local(''),
        url(${poppinsThickWoff2}) format('woff2'),
        url(${poppinsThickWoff}) format('woff');
  }

  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    height: 100%;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      outline: 0;
    }
  }
`
