/**
 * Internal dependencies
 */
import { PanelTypes } from '../../panels';
export { default as Display } from './display';
export { default as Edit } from './edit';
export { default as Frame } from './frame';
export { default as Save } from './save';
export { default as TextContent } from './textContent';

export const defaultAttributes = {
	fontFamily: 'Arial',
	fontFallback: [ 'Helvetica Neue', 'Helvetica', 'sans-serif' ],
	fontWeight: 400,
	fontSize: 14,
	fontStyle: 'normal',
	color: 'black',
	backgroundColor: 'transparent',
};

export const hasEditMode = true;

export const panels = [
	PanelTypes.TEXT,
	PanelTypes.SIZE,
	PanelTypes.POSITION,
	PanelTypes.FONT,
	PanelTypes.COLOR,
	PanelTypes.BACKGROUND_COLOR,
	PanelTypes.ROTATION_ANGLE,
];
