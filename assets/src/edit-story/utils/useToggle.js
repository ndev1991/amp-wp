
/**
 * WordPress dependencies
 */
import { useState, useCallback } from '@wordpress/element';
/**
 * @param {Function} initialValue  Initial value of the variable
 * @return {Array} Array of value, state and setState.
 */
function useToggle( initialValue = undefined ) {
	const [ toggle, setToggle ] = useState( initialValue || false );

	const handleToggle = useCallback( () => {
		setToggle( ( val ) => ! val );
	}, [ setToggle ] );

	return [ toggle, handleToggle ];
}

export default useToggle;
