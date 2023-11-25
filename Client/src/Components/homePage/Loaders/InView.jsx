import React from 'react';
import { InView } from 'react-intersection-observer';

const InViews = ({action}) => (
    
  <InView  onChange={action}  rootMargin='40px'  threshold={0}>
    {({ inView, ref, entry }) =>{ 
        
        return (
        
      <div ref={ref}>
        {/* <h2>{`Header inside viewport ${inView}.`}</h2> */}
      </div>
    )}
    }
  </InView>
);

export default InViews;