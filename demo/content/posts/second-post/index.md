---
title: RSS Feed with Cover Flow
date: "2019-07-31T22:00:00Z"
---

With little effort gatsby-theme-coverflow can make [a coverflow for an
RSS feed](../rss-feed/):

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://www.gatsbyjs.org/blog/rss.xml`,
        name: `GatsbyBlog`,
      },
    },
    {
      resolve: "gatsby-theme-coverflow",
      options: {
        path: `rss-feed`,
        query: `
{
  allCoverPages: allFeedGatsbyBlog {
    edges {
      node {
        title
        link
      }
    } 
  }
}
      `,
      },
    },
  ],
}
```

