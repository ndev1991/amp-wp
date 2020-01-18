/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { ElementFillContent } from '../shared';
import { getImgProps, ImageWithScale } from './util';

const Element = styled.div`
	${ ElementFillContent }
	overflow: hidden;
`;

const Img = styled.img`
	position: absolute;
	${ ImageWithScale }
`;

function ImageDisplay( { src, origRatio, width, height, scale, focalX, focalY } ) {
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const imgProps = getImgProps( width, height, scale, focalX, focalY, origRatio );
	return (
		<Element>
			<Img draggable={ false } src={ src } { ...imgProps } />
		</Element>
	);
}

ImageDisplay.propTypes = {
	src: PropTypes.string.isRequired,
	origRatio: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	scale: PropTypes.number,
	focalX: PropTypes.number,
	focalY: PropTypes.number,
};

ImageDisplay.defaultProps = {
	scale: null,
	focalX: null,
	focalY: null,
};

export default ImageDisplay;
