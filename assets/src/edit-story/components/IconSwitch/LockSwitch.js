/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import LockClosedIcon from './lock_closed.svg';
import LockOpenIcon from './lock_open.svg';
import IconSwitch from './';

const LockSwitch = ( { ...props } ) => (
	<IconSwitch { ...props } CheckedIcon={ LockClosedIcon } UncheckedIcon={ LockOpenIcon } />
);

export default LockSwitch;
