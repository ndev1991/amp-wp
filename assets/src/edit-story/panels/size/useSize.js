
/**
 * WordPress dependencies
 */
import { useCallback, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */

function useSize( width, height ) {
	const [ lockRatio, setLockRatio ] = useState( true );
	const [ state, setState ] = useState( { width, height } );

	const handleToggleLockRatio = useCallback( () => {
		setLockRatio( ( val ) => ! val );
	}, [ setLockRatio ] );

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
		setState,
		handleWidth,
		handleHeight,
		handleToggleLockRatio,
	};
}

export default useSize;
