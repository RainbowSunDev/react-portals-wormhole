import React from "react";

export default ({className, ...rest}) => (
  <div {...rest} className={`${className} starship`}>
    <span role="img" aria-label="starship">
      🚀
    </span>
  </div>
);
