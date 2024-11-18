import React from "react";

const useViewport = () => {
	const [width, setWidth] = React.useState(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	React.useEffect(() => {
		// Only run this code on the client side
		if (typeof window !== "undefined") {
			const handleWindowResize = () => setWidth(window.innerWidth);
			window.addEventListener("resize", handleWindowResize);

			// Clean up the event listener on component unmount
			return () =>
				window.removeEventListener("resize", handleWindowResize);
		}
	}, []);

	return { width };
};

export default useViewport;
