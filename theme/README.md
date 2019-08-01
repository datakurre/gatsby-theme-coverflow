# Cover flow Gatsby theme plugin

A Gatsby theme for creating cover flow pages with customizable sources.

See https://datakurre.github.io/gatsby-theme-coverflow/ for a live demo where cover flow has been mixed with [gatsby-theme-blog](https://www.gatsbyjs.org/packages/gatsby-theme-blog/) and [gatsby-source-rss-feed](https://www.gatsbyjs.org/packages/gatsby-source-rss-feed/):

* https://datakurre.github.io/gatsby-theme-coverflow/#1
* https://datakurre.github.io/gatsby-theme-coverflow/rss-feed/#1
* https://datakurre.github.io/gatsby-theme-coverflow/coverflow/

Cover flow supports customizable sources, customizable colors, and both internal and external
links. Cover flow pages support keyboard navigation.

## Installation

Manually add to your site

```sh
npm install --save gatsby-theme-coverflow
```

## Usage

### Theme options

| Key           | Default value    | Description                                                                                               |
| ------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| `path    `    | `/coverflow/`    | Url for the created cover flow page                                                                       |
| `colors`      | {}               | Configurable text, cover and backdrop colors (see example usage)                                          |
| `query`       | ``               | GraphQL query for fetching the cover flow data (see example usage)                                        |

Each instance of cover flow theme plugin creates just a single page at configured path.

Colors of that page can be customized. Supported color keys and their default values are:

```js
{
  text: `#fff`,
  cover: `#663399`,
  backdrop: `#333`,
}
```

Content of the cover page is defined with a GraphQL query:

```graphql
{
  allCoverPages {
    edges {
      node {
        title
        link
      }
    }
  }
}
```
 
See the examples below on how to use GraphQL query aliases to conform with the required query...

### Example usage

```js
// gatsby-config.js
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
