import Container from '@mui/material/Container';
import  Nav  from './Nav';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
export default function Layout({
  noNav,
  children,
  containerSize = 'container.xl',
  ...props
}) {
  return (
    <>
      <header>{!noNav && <Nav />}</header>
      
      <main><Container maxWidth={containerSize} {...props} mb={24}>
        {children}
      </Container>
      </main>
      {/* <ScrollRestoration
        getKey={(location, matches) => {
          const paths = ["/home"];
          return paths.includes(location.pathname)
            ? location.pathname
            : location.key;
        }}
      /> */}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  noNav: PropTypes.bool,
  containerSize: PropTypes.string
};
