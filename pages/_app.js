import React from "react";
import App, { Container } from "next/app";
import MenuBar from "../components/MenuBar";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <MenuBar />
        <Component {...pageProps} />
        <style global jsx>{`
          :root {
            --marvel-red: #ed1d24;
          }

          /*  Makes a custom font that is named the given name from the given src */
          @font-face {
            font-family: "Marvel-Regular";
            src: url("../static/Marvel-Regular.ttf");
          }

          .marvel-text {
            color: white;
            font-family: "Marvel-Regular";
            letter-spacing: 2px;
            text-shadow: 0 0 10px var(--marvel-red), -2px 0 var(--marvel-red),
              0 2px var(--marvel-red), 2px 0 var(--marvel-red),
              0 -2px var(--marvel-red);
            text-transform: uppercase;
          }

          hr {
            color: var(--marvel-red);
            border-color: var(--marvel-red);
          }
        `}</style>
      </Container>
    );
  }
}

export default MyApp;