
/**
 * WordPress dependencies
 */
import { useCallback, useState, useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useToggle from '../../utils/useToggle';

/**
 * @param {number} width  Initial width
 * @param {number} height  Initial height
 * @return {Object} Array of value, state and setState.
 */
function useSize( width = 0, height = 0 ) {
	const [ lockRatio, toggleLockRatio ] = useToggle( true );
	const [ state, setState ] = useState( { width, height } );

	useEffect( () => {
		setState( { width, height } );
	}, [ width, height ] );

	const handleWidth = useCallback( ( value ) => {
		const ratio = width / height;
		const newWidth = isNaN( value ) || value === '' ? '' : parseFloat( value );
		setState( {
			...state,
			width: newWidth,
			height: typeof newWidth === 'number' && lockRatio ? newWidth / ratio : height,
		} );
	}, [ width, height, state, setState, lockRatio ] );

	const handleHeight = useCallback( ( value ) => {
		const ratio = width / height;
		const newHeight = isNaN( value ) || value === '' ? '' : parseFloat( value );
		setState( {
			...state,
			height: newHeight,
			width: typeof newHeight === 'number' && lockRatio ? newHeight * ratio : width,
		} );
	}, [ width, height, state, setState, lockRatio ] );

	return {
		lockRatio,
		state,
		handleWidth,
		handleHeight,
		toggleLockRatio,
	};
}

export default useSize;
