import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const Body = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: ${props => (props.colors && props.colors.backdrop) || '#333'};
`;

const Layout = ({ children, colors }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <>
      <Helmet title={site.siteMetadata.title} />
      <Body colors={colors}>{children}</Body>
    </>
  );
};

export default Layout;
