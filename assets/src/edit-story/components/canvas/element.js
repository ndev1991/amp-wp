// QQQ: rename to `elementDisplay.js`
/**
 * External dependencies
 */
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { getDefinitionForType } from '../../elements';
import { ElementWithPosition, ElementWithSize, ElementWithRotation, getBox } from '../../elements/shared';

const Wrapper = styled.div`
	${ ElementWithPosition }
	${ ElementWithSize }
	${ ElementWithRotation }
`;

function ElementDisplay( {
	element: {
		id,
		type,
		x,
		y,
		width,
		height,
		rotationAngle,
		isFullbleed,
		...rest
	},
} ) {
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const { Display } = getDefinitionForType( type );

	const box = getBox( { x, y, width, height, rotationAngle, isFullbleed } );
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const props = { ...box, ...rest, id };

	return (
		<Wrapper
			{ ...box }
		>
			<Display { ...props } />
		</Wrapper>
	);
}

ElementDisplay.propTypes = {
	element: PropTypes.object.isRequired,
};

export default ElementDisplay;
