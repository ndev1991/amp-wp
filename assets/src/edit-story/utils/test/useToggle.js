/**
 * External dependencies
 */
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * Internal dependencies
 */
import useToggle from '../useToggle';

describe( 'useToggle Hook', () => {
	it( 'set initial value for toggle', () => {
		const api = renderHook( () => useToggle( true ) );
		const [ value ] = api.result.current;

		expect( value ).toStrictEqual( true );
	} );

	it( 'initial toggle value should be true and toggle function should update the value to false', async () => {
		const api = renderHook( () => useToggle() );
		const [ value, toggleValue ] = api.result.current;

		expect( value ).toStrictEqual( false );

		await act( async () => {
			toggleValue( );
			await api.waitForNextUpdate();
		} );

		const [ newValue ] = api.result.current;

		expect( newValue ).toStrictEqual( true );
	} );
} );
