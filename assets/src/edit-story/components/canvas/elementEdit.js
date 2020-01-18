/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import { getDefinitionForType } from '../../elements';
import { ElementWithPosition, ElementWithSize, ElementWithRotation, getBox } from '../../elements/shared';

// Background color is used to make the edited element more prominent and
// easier to see.
const Wrapper = styled.div`
  ${ ElementWithPosition }
  ${ ElementWithSize }
  ${ ElementWithRotation }
  pointer-events: initial;
	background-color: rgba(255, 255, 255, 0.5);
`;

function ElementEdit( {
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
	const { Edit } = getDefinitionForType( type );

	const box = getBox( { x, y, width, height, rotationAngle, isFullbleed } );
	// eslint-disable-next-line @wordpress/no-unused-vars-before-return
	const props = { ...box, ...rest, id };

	return (
		<Wrapper
			{ ...box }
			onMouseDown={ ( evt ) => evt.stopPropagation() }
		>
			<Edit { ...props } />
		</Wrapper>
	);
}

ElementEdit.propTypes = {
	element: PropTypes.object.isRequired,
};

export default ElementEdit;
