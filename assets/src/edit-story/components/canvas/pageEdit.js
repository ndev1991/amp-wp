/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import withOverlay from '../overlay/withOverlay';
import ElementEdit from './elementEdit';

const Background = withOverlay( styled.div.attrs( { className: 'container' } )`
  position: relative;
  width: 100%;
  height: 100%;
` );

function PageEdit( { element } ) {
	if ( ! element ) {
		return null;
	}

	return (
		<Background>
			<ElementEdit
				element={ element }
			/>
		</Background>
	);
}

PageEdit.propTypes = {
	element: PropTypes.object.isRequired,
};

export default PageEdit;
