import Document, { Head, Main, NextScript } from "next/document";
// css/styles.less -> ../assets/css/styles.less
// see .babelrc for more detail
import styles from "styles/index.less";
import styled, { injectGlobal, ServerStyleSheet } from "styled-components";

injectGlobal`

  h1 {
    font-size: 42px;
    font-weight: 700;
    text-transform: none;
  }

  h2 {
    font-size: 48px;
    font-weight: 600;
    line-height: 64px;
    text-transform: none;
  }

  h5 {
    font-size: 14px;
    font-weight: 600;
  }

  @media (max-width: 576px) {
    h2 {
      font-size: 32px;
      line-height: 40px;  
    }
  }

`;

const Body = styled.body`
  background-color: #2b7284;
  height: 100%;
  width: 100%;
`

//   <style dangerouslySetInnerHTML={{ __html: styles }} />
// <link rel='stylesheet' href='https://unpkg.com/antd@3/dist/antd.min.css' />
export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet={process.env.CHARSET} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css' rel='stylesheet' />
          <style dangerouslySetInnerHTML={{ __html: styles }} />
          {this.props.styleTags}
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </html>
    );
  }
}