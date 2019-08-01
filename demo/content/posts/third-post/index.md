---
title: Gatsby Theme Blog with Cover Flow
date: "2019-07-31T23:00:00Z"
---

This is how gatsby-theme-coverflow can be configured to create [a blog post cover flow for gatsby-theme-blog](/):

```js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-blog`,
      options: {
        basePath: `/blog/`,
      },
    },
    {
      resolve: "gatsby-theme-coverflow",
      options: {
        path: `/`,
        colors: {
          text: `#fff`,
          cover: `#663399`,
          backdrop: `#333`,
        },
        query: `
{
  allCoverPages: allBlogPost(sort: {fields: date, order: DESC}) {
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

