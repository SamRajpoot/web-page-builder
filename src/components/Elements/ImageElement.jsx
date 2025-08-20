import React from "react";
const ImageElement = ({ src = "https://placehold.co/120x80", alt = "Image", style = {}, ...props }) => (
	<img src={src} alt={alt} style={{ maxWidth: 160, borderRadius: 8, ...style }} {...props} />
);
export default ImageElement;
