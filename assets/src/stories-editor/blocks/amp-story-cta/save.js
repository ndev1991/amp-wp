/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getClassNameFromBlockAttributes, getStylesFromBlockAttributes, getUniqueId } from '../../helpers';

const CallToActionSave = ( { attributes } ) => {
	const {
		anchor,
		btnPositionLeft,
		btnPositionTop,
		btnWidth,
		btnHeight,
		text,
		url,
	} = attributes;

	const className = getClassNameFromBlockAttributes( { ...attributes, className: 'amp-block-story-cta__link' } );
	const styles = getStylesFromBlockAttributes( attributes );

	styles.top = btnPositionTop ? `${ btnPositionTop }%` : undefined;
	styles.left = btnPositionLeft ? `${ btnPositionLeft }%` : undefined;

	let content;

	// If it's an old story, this CTA button might not have width nor height.
	if ( btnWidth && btnHeight ) {
		// If it does have both, use new rendering idea.
		styles.width = `${ btnWidth }%`;
		styles.height = `${ btnHeight }%`;
		styles.display = 'flex';

		// Uses RawHTML to mimic RichText.Content behavior.
		content = (
			<div className="amp-cta-button-wrapper">
				<a
					className={ className }
					href={ url }
					style={ styles }
				>
					<amp-fit-text layout="flex-item" className="amp-cta-content">
						<RawHTML>
							{ text }
						</RawHTML>
					</amp-fit-text>
				</a>
			</div>
		);
	} else {
		// If not, use old rendering with a simple RichText component.
		content = (
			<RichText.Content
				tagName="a"
				className={ className }
				href={ url }
				style={ styles }
				value={ text }
			/>
		);
	}

	return (
		<amp-story-cta-layer id={ anchor ? anchor : getUniqueId() }>
			{ content }
		</amp-story-cta-layer>
	);
};

CallToActionSave.propTypes = {
	attributes: PropTypes.shape( {
		anchor: PropTypes.string,
		url: PropTypes.string,
		text: PropTypes.string,
		btnPositionLeft: PropTypes.number,
		btnPositionTop: PropTypes.number,
		btnWidth: PropTypes.number,
		btnHeight: PropTypes.number,
		backgroundColor: PropTypes.shape( {
			color: PropTypes.string,
			name: PropTypes.string,
			slug: PropTypes.string,
			class: PropTypes.string,
		} ).isRequired,
		customBackgroundColor: PropTypes.string,
		textColor: PropTypes.shape( {
			color: PropTypes.string,
			name: PropTypes.string,
			slug: PropTypes.string,
			class: PropTypes.string,
		} ).isRequired,
		customTextColor: PropTypes.string,
		fontSize: PropTypes.shape( {
			name: PropTypes.string,
			shortName: PropTypes.string,
			size: PropTypes.number,
			slug: PropTypes.string,
		} ).isRequired,
		customFontSize: PropTypes.number,
	} ).isRequired,
};

export default CallToActionSave;
