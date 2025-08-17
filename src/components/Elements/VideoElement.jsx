import React from "react";
const VideoElement = ({ src = "https://www.youtube.com/embed/dQw4w9WgXcQ", style = {}, ...props }) => (
	<iframe
		src={src}
		width={240}
		height={140}
		frameBorder="0"
		allowFullScreen
		style={{ borderRadius: 8, ...style }}
		title="Video"
		{...props}
	/>
);
export default VideoElement;
