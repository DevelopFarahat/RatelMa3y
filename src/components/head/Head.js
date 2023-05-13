import React from "react";

export default function HeadTags({title, summary, url, img, keywords}) {
    return (
        <>
            <title>{title}</title>
            <meta name="author" content="Ratel May" />
            <meta name="audience" content="all" />
            
            <meta name="description" content={summary}/>
            <meta name="keywords" content={keywords} />

            <meta property="og:url" content={url} />
            <meta name="image" content={img} />
            <meta itemprop="description" content={summary}/>

            <meta itemprop="image" content={img} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={summary} />
            <meta property="og:image" content={img} />
            <meta property="og:image:width" content="300px" />

            <meta property="og:image:height" content="300px" />
            <meta property="og:image:alt" content="Ratel May post" />
            <meta property="og:type" content="website" />

            <meta property="og:site_name" content={title} />
            <meta property="og:url" content={url} />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={summary} />
            <meta name="twitter:image" content={img} />
            <meta name="twitter:url" content={url} />

            <meta name="theme-color" content="#000000" />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Noto+Kufi+Arabic&display=swap"
                rel="stylesheet" />
        </>)
}