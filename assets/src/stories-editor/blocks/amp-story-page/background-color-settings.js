/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { ReactElement } from 'react';
import ColorPicker from 'material-ui-color-picker';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

import {
	PanelBody,
} from '@wordpress/components';

/**
 * Displays the page background color settings.
 *
 * @param {Object} props Component props.
 * @param {Array} props.backgroundColors Current background colors.
 * @param {Function} props.setAttributes setAttributes callback.
 * @param {number} props.overlayOpacity Overlay opacity.
 * @return {ReactElement} Component.
 */
const BackgroundColorSettings = ( { backgroundColors, setAttributes, overlayOpacity } ) => {
	const removeBackgroundColor = ( index ) => {
		backgroundColors.splice( index, 1 );
		setAttributes( { backgroundColors: JSON.stringify( backgroundColors ) } );
	};

	const setBackgroundColors = ( value, index ) => {
		backgroundColors[ index ] = {
			color: value,
		};
		setAttributes( { backgroundColors: JSON.stringify( backgroundColors ) } );
	};

	const getOverlayColorSettings = () => {
		if ( ! backgroundColors.length ) {
			return [
				{
					value: undefined,
					onChange: ( value ) => {
						setBackgroundColors( value, 0 );
					},
					label: __( 'Color', 'amp' ),
				},
			];
		}

		const backgroundColorSettings = [];
		const useNumberedLabels = backgroundColors.length > 1;

		backgroundColors.forEach( ( color, index ) => {
			backgroundColorSettings[ index ] = {
				value: color ? color.color : undefined,
				onChange: ( value ) => {
					setBackgroundColors( value, index );
				},
				/* translators: %s: color number */
				label: useNumberedLabels ? sprintf( __( 'Color %s', 'amp' ), index + 1 ) : __( 'Color', 'amp' ),
			};
		} );

		return backgroundColorSettings;
	};

	return (
		<PanelBody
			className="amp-story-order-controls"
			title={ __( 'Background Color', 'amp' ) }
		>
			<ColorPicker
				name='color'
				defaultValue='#000'
				// value={this.state.color} - for controlled component
				onChange={color => setBackgroundColors(color, 1)}

			/>
		</PanelBody>

	);
};

BackgroundColorSettings.propTypes = {
	backgroundColors: PropTypes.array,
	overlayOpacity: PropTypes.number,
	setAttributes: PropTypes.func.isRequired,
};

export default BackgroundColorSettings;
