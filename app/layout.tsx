import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./lib/store/layout";
import { headers } from "next/headers";
import iconLignt from "@/public/images/favicon.svg";
import iconDark from "@/public/images/favicon.svg";
import Script from "next/script";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// Check if the current environment is production
const isProd = process.env.NEXT_PRODUCTION_ENV === "production";
const isStaging = process.env.NEXT_PRODUCTION_ENV === "staging";

// For SEO purpose to rank next js application
export const metadata: Metadata = {
  robots: isProd === true ? "" : "noindex",
  title:
    "Hire Expert Bartenders, Waiters & Mixologists for Your Events | Updone.com",
  description:
    "Planning a wedding, birthday, or baby shower? Need a cocktail barman, bartender, or mixologist to shake things up? Updone connects you with top-tier waiters and event staff for unforgettable parties.",
  keywords:
    "staff listing, hire Bartenders, cocktail waiters, event servers, event organizers, staff for hire, event staffing, bartending services, event planning, event staff",
  icons: [
    {
      media: "(prefers-color-scheme: light)",
      url: iconLignt.src,
      type: "image/svg+xml",
    },
    {
      media: "(prefers-color-scheme: dark)",
      url: iconDark.src,
      type: "image/svg+xml",
    },
  ],
};

export async function generateViewport(): Promise<any> {
  // const userAgent = headers()?.get("user-agent");
  // const isiPhone = /iphone/i.test(userAgent ?? "");
  // return isiPhone
  //   ? {
  //     width: "device-width",
  //     initialScale: 1,
  //     maximumScale: 1, //disables auto-zoom on ios safari
  //   }
  //   : {};
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Intercom Configuration */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            window.intercomSettings = {
              api_base: "https://api-iam.intercom.io",
              app_id: "ize5y2mu",
            };
          `,
          }}
        />
        {/* Intercom Script */}
        <Script
          id="intercom-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
            (function(){
              var w=window;
              var ic=w.Intercom;
              if(typeof ic==="function"){
                ic('reattach_activator');
                ic('update',w.intercomSettings);
              } else {
                var d=document;
                var i=function(){i.c(arguments);};
                i.q=[];
                i.c=function(args){i.q.push(args);};
                w.Intercom=i;
                var l=function(){
                  var s=d.createElement('script');
                  s.type='text/javascript';
                  s.async=true;
                  s.src='https://widget.intercom.io/widget/ize5y2mu';
                  var x=d.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s,x);
                };
                if(document.readyState==='complete'){l();}
                else if(w.attachEvent){w.attachEvent('onload',l);}
                else{w.addEventListener('load',l,false);}
              }
            })();
          `,
          }}
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 viewport-fit=cover" /> */}
        {/* Conditionally render Google Tag Manager script if it's production */}
        {isProd && (
          <>
            {/* Google Tag Manager Production*/}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-5C3FC2QT');`,
              }}
            />
            {/* End Google Tag Manager Production */}
          </>
        )}
        {isStaging === true && (
          <>
            {/* Google Tag Manager Staging*/}
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N7L8B6GP');`,
              }}
            />
            {/* End Google Tag Manager Production */}
          </>
        )}
      </head>
      <body className={`${poppins.className} no-x-overflow min-h-screen`}>
        {/* Google Tag Manager Production */}
        {isProd && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5C3FC2QT"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}

        {/* Google Tag Manager Staging */}
        {isStaging === true && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N7L8B6GP"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        {/* End Google Tag Manager */}
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
