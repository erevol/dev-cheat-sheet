import App, { Container } from 'next/app';
import Page from '../components/Page';
import 'semantic-ui-css/semantic.min.css';
import { ThemeProvider } from 'emotion-theming';
import { ApolloProvider } from 'react-apollo';
import theme from './theme';
// import { Global, css } from '@emotion/core';
import { CacheProvider, css, Global } from '@emotion/core';
import withData from '../lib/withData';

// Use only { cache } from 'emotion'. Don't use { css }.
import { cache } from 'emotion';

const injectGlobal = css`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/Jost-Regular.ttf');
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
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {  font-family: 'radnika_next'; }
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
    // this exposes the query to the user
    pageProps.query = ctx.query;
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
