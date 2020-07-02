import App, { Container } from 'next/app';
import Page from '../components/Page';
import 'semantic-ui-css/semantic.min.css';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from 'react-apollo';
import theme from './theme';
import { CacheProvider, css, Global } from '@emotion/core';
import withData from '../lib/withData';

import { cache } from 'emotion';

const injectGlobal = css`
  @font-face {
    font-family: 'Jost';
    src: url('/static/Jost-Regular.ttf');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'JostSemiBold';
    src: url('/static/Jost-SemiBold.ttf');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'JostBold';
    src: url('/static/Jost-Bold.ttf');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Open Sans';
    src: url('/static/OpenSans-Regular.ttf');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Icons';
    src: url('/static/icons.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'outline-icons';
    src: url('/static/outline-icons.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Open Sans';
  }
  a {
    font-family: 'Jost';
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'Jost'; }
`;

const globalStyles = (
  <Global styles={injectGlobal} />
);

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query and pathname to the user
    pageProps.query = ctx.query;
    pageProps.pathname = ctx.pathname;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <CacheProvider value={cache}>
        {globalStyles}
        <Container>
          <ApolloProvider client={apollo}>
            <ThemeProvider theme={theme}>
              <Global styles={injectGlobal} />
              <Page>
                <Component {...pageProps}/>
              </Page>
            </ThemeProvider>
          </ApolloProvider>
        </Container>
      </CacheProvider>
    );
  }
}

export default withData(MyApp);
