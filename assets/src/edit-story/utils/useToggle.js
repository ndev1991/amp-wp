
/**
 * WordPress dependencies
 */
import { useState, useCallback } from '@wordpress/element';
/**
 * As common toggling function to handle a toggle value
 * Avoid duplicated setState function from it's uses.
 * Can use this function for boolean based or toggle based feature.
 *
 * @param {Function} initialValue  Initial value of the variable
 * @return {Array} Array of value, state and setState.
 * @example const [ toggle, setToggle ] = useToggle( default )
 */
function useToggle( initialValue = false ) {
	const [ toggle, setToggle ] = useState( initialValue );

	const handleToggle = useCallback( () => {
		setToggle( ( val ) => ! val );
	}, [ ] );

	return [ toggle, handleToggle ];
}

export default useToggle;
