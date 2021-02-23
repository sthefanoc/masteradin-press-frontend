import { extractCritical } from "emotion-server";
import Document, { Head, Main, NextScript } from "next/document";
import React from "react";
import flush from "styled-jsx/server";

interface IProps {
  css: any;
}

class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const { html, head } = ctx.renderPage();
    const styles = flush();
    const emotionStyles = extractCritical(html);
    return { ...emotionStyles, ...initialProps, html, head, styles };
  }

  render() {
    const { ids }: any = this.props;

    return (
      <html lang="en">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="robots" content="index, follow" />
          <meta key="googlebot" name="googlebot" content="index,follow" />
          <meta name="google" content="notranslate" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="keywords" content="nextjs, realworld" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:site_name" content="masteradin press" />
          <meta property="og:title" content="masteradin press" />
          <meta
            property="og:description"
            content="Releases de imprensa com dados regionais e infográficos interativos"
          />
          <meta property="og:url" content="https://press.masteradin.com/" />
          <meta
            property="og:image"
            content="https://media-exp1.licdn.com/dms/image/C561BAQEcFc6N8saXGg/company-background_10000/0/1564587339230?e=2159024400&v=beta&t=e79nndwVRRU9NVnGALDLfqu8wE1ANXn-Aux0bpC1YnM"
          />
          <meta property="youtube:card" content="Masteradin Youtube" />
          <meta
            property="youtube:url"
            content="https://www.youtube.com/channel/UCQzESaWhqb_hSX-uenFoxcA/"
          />
          <meta
            property="youtube:title"
            content="Masteradin Youtube"
          />
          <meta
            property="youtube:description"
            content="Masteradin Youtube"
          />
          <meta
            property="youtube:image"
            content="https://yt3.ggpht.com/ytc/AAUvwniSIEFk16L3nTZveq-8QE18dQG_-5YANvaCwM_-=s88-c-k-c0x00ffffff-no-rj"
          />
          <meta name="msapplication-TileColor" content="#000" />
          <meta
            name="msapplication-TileImage"
            content="/images/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#000" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/images/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/images/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/images/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/images/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/images/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/images/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/images/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/images/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/images/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/images/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `{
              "@context": "http://schema.org/",
              "@type": "Organization",
              "url": "https://next-realworld.now.sh/",
              "logo": "https://next-realworld.now.sh/images/share-link.png",
              "sameAs": [
                "https://realworld.io",
                "https://medium.com/@ericsimons/introducing-realworld-6016654d36b5",
              ],
            }`,
            }}
          /> */}
          <link rel="manifest" href="/manifest.json" />
          {/* <link rel="stylesheet" href="//demo.productionready.io/main.css" /> */}
          <link
            rel="stylesheet"
            href="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic&display=swap"
          />
          <style
            data-emotion-css={ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
