/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

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
    {
      resolve: "gatsby-theme-coverflow",
    },
  ],
}
