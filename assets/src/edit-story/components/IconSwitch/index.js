/**
 * External dependencies
 */
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import LockClosedIcon from './lock_closed.svg';
import LockOpenIcon from './lock_open.svg';

const StyledButton = styled.button`
  border: none;
  background: transparent;
  display: block;
	padding: 0;
	width: ${ ( { width } ) => width }px;
	height: ${ ( { height } ) => height }px;
  min-width: initial;
  cursor: pointer;
	color: ${ ( { theme } ) => theme.colors.fg.v3 };
	&:focus, &:active, &:hover {
    opacity: 1;
    outline: none;
	}
	svg {
		width: ${ ( { width } ) => width }px;
		height: ${ ( { height } ) => height }px;
  }
  ${ ( { disabled } ) => disabled && `
		pointer-events: none;
		opacity: .3;
	` }
`;

const IconSwitch = ( { locked, ...props } ) => (
	<StyledButton { ...props }>
		{ locked ? <LockClosedIcon /> : <LockOpenIcon /> }
	</StyledButton>
);

IconSwitch.propTypes = {
	locked: PropTypes.bool,
	width: PropTypes.number,
	height: PropTypes.number,
	disabled: PropTypes.bool,
};

IconSwitch.defaultProps = {
	locked: false,
	disabled: false,
	width: 16,
	height: 16,
};

export default IconSwitch;
