/**
 * External dependencies
 */
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */

const CheckBoxInput = styled.input.attrs( { type: 'checkbox' } )`
	position: absolute;
	opacity: 0;
`;

const MarkSpan = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	height: ${ ( { height } ) => height }px;
	width: ${ ( { width } ) => width }px;
	color: ${ ( { theme } ) => theme.colors.fg.v4 };
`;

const ContainerLabel = styled.label`
	display: block;
	position: relative;
	padding: 0;
	cursor: pointer;
	user-select: none;
	height: ${ ( { height } ) => height }px;
	width: ${ ( { width } ) => width }px;
	${ ( { disabled } ) => disabled && `
		pointer-events: none;
		opacity: .3;
	` }

	${ CheckBoxInput } {
		height: 0;
		width: 0;
		margin: 0;
	}
`;

const IconSwitch = ( { checked, width, height, label, onClick, CheckedIcon, UncheckedIcon, ...props } ) => (
	<ContainerLabel width={ width } height={ height } ariaLabel={ label } { ...props }>
		<CheckBoxInput checked={ checked } onClick={ onClick } />
		<MarkSpan width={ width } height={ height }>
			{ checked ? <CheckedIcon /> : <UncheckedIcon /> }
		</MarkSpan>
	</ContainerLabel>
);

IconSwitch.propTypes = {
	label: PropTypes.string,
	checked: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	CheckedIcon: PropTypes.node.isRequired,
	UncheckedIcon: PropTypes.node.isRequired,
};

IconSwitch.defaultProps = {
	locked: false,
	disabled: false,
	width: 16,
	height: 16,
};

export default IconSwitch;
