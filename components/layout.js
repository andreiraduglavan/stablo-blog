import React from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";
import GetImage from "@utils/getImage";
import Navbar from "@components/navbar";
// import defaultOG from "../public/img/og-default.jpg";

import Footer from "@components/footer";
import Script from "next/script";
// import PopupWidget from "../components/popupWidget";

export default function Layout(props) {
  const { children } = props;
  const ogimage = GetImage(props?.openGraphImage)?.src ?? "";
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.sanity.io/" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io//" />
        { process.env.NEXT_PUBLIC_GOOGLE_ADS_ID &&
          <Script
            id="Adsense-id"
            data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}
            async="true"
            strategy="beforeInteractive"
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        }
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.url}
        openGraph={{
          url: props.url,
          title: props.title,
          description: props.description,
          images: [
            {
              url: ogimage,
              width: 800,
              height: 600,
              alt: props.title
            }
          ],
          site_name: props.title
        }}
        twitter={{
          handle: "@surjithctly",
          site: "@surjithctly",
          cardType: "summary_large_image"
        }}
      />

      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-400 flex flex-col min-h-screen">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20 -z-50">
          <div className="blur-[106px] h-32 bg-gradient-to-br from-emerald-800 to-emerald-400 dark:from-blue-300"></div>
          <div className="blur-[106px] h-56 bg-gradient-to-r from-blue-800 to-blue-400 dark:to-indigo-400"></div>
        </div>
        <div className="grow">
          <Navbar {...props} />
          <div>{children}</div>
        </div>

        <Footer {...props} />
      </div>
    </>
  );
}
