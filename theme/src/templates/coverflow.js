import React from 'react';
import Layout from '../components/layout';
import { CoverItem } from '../components/coverflow';
import CoverFlow from '../components/coverflow';
import { Link } from 'gatsby';

const PageTemplate = ({ pageContext }) => (
  <Layout colors={pageContext.colors}>
    <CoverFlow>
      {pageContext.allCoverPages.edges.map(({ node }) => (
        <CoverItem key={node.guid || node.link} colors={pageContext.colors}>
          <h1>
            {node.link.match(/^\//) ? (
              <Link to={node.link}>{node.title}</Link>
            ) : (
              <a href={node.link}>{node.title}</a>
            )}
          </h1>
        </CoverItem>
      ))}
    </CoverFlow>
  </Layout>
);

export default PageTemplate;
