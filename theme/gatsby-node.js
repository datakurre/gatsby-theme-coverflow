exports.createPages = async (
  { graphql, actions, reporter },
  { path = '/coverflow/', colors = {}, query }
) => {
  const result = query
    ? await graphql(query)
    : {
        data: {
          allCoverPages: {
            edges: [
              {
                node: {
                  title: 'TODO: Configure Coverflow',
                  link:
                    'https://github.com/datakurre/gatsby-theme-coverflow.git',
                },
              },
            ],
          },
        },
      };
  actions.createPage({
    path,
    component: require.resolve('./src/templates/coverflow.js'),
    context: {
      colors,
      ...result.data,
    },
  });
};
