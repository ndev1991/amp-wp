/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SelectTeplateInitializer from './components/SelectTeplateInitializer';

/**
 * Initializes the block editor in the widgets screen.
 *
 * @param {string} id       ID of the root element to render the screen in.
 * @param {Object} settings Block editor settings.
 */
const initialize = ( id, settings ) => {
	render(
		<SelectTeplateInitializer
			settings={ settings }
		/>,
		document.getElementById( id ),
	);
};

domReady( () => {
	const { id, settings } = window.ampStoriesTemplateSettings;
	initialize( id, settings );
} );
