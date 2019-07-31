# Cover flow Gatsby theme plugin

A Gatsby theme for creating cover flow pages with configurable sources.

See https://datakurre.github.io/gatsby-theme-coverflow/ for an example where
cover flow has been mixed with gatsby-theme-blog.

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

### Example usage

```js
// gatsby-config.js
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
