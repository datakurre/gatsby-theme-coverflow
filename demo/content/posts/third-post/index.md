---
title: Gatsby Theme Blog Cover Flow
date: "2019-07-31T23:00:00Z"
---

This is how gatsby-theme-coverflow can be configured to create [a blog post cover flow with gatsby-theme-blog](../blog-posts):

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {
        basePath: `/`,
      },
    },
    {
      resolve: "gatsby-theme-coverflow",
      options: {
        path: `blog-posts`,
        colors: {
          text: `#fff`,
          cover: `#663399`,
          backdrop: `#333`,
        },
        query: `
{
  allCoverPages: allBlogPost {
    edges {
      node {
        title
        link: slug
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

