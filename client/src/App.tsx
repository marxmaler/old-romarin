import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { rosemaryTheme } from "./theme";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}

article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* { box-sizing: border-box}
a {
  text-decoration:none;
  color: inherit;
}

body {
  line-height: 1;
  max-width: 100vw;
  min-height:100vh;
  display: flex;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

main {
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.periwinkleTint90};
}

button {
  background-color: ${(props) => props.theme.periwinkleShade30};
  width: max-content;
padding: 5px 10px;
border-radius: 10px;
color: ${(props) => props.theme.periwinkleTint90};
font-size: 16px;
font-weight: 900;
cursor: pointer;
&:hover {
  transform: translateY(1.5px);
  transition: all 0.3s;
  opacity: 0.8;
}
}

select {
    background-color: transparent;
  border: 1px solid white;
  border-radius: 10px;
  outline: 0 none;
  padding: 0 5px;
  text-align: center;
  font-size: 16px;
  color: white;
  cursor: pointer;
  option {
    color: white;
    background-color: ${(props) => props.theme.periwinkleTint30};
    padding: 3px 0;
    font-size: 16px;
    text-align: center;
  }
}
`;

function App() {
  return (
    <>
      <ThemeProvider theme={rosemaryTheme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
