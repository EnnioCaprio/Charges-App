import React, { useState, useEffect } from 'react';

const getWindowDimension = () => {
	const { innerWidth: width, innerHeight: height } = window;

	return {
		width,
		height
	}
}

const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimension());

	useEffect(() => {
		const resize = () => {
			setWindowDimensions(getWindowDimension());
		}

		window.addEventListener('resize', resize);

		return () => window.removeEventListener('resize', resize);
	}, []);

	return windowDimensions;
}

export {useWindowDimensions as default}