/**
 * External dependencies
 */
import { renderHook, act } from '@testing-library/react-hooks';

/**
 * Internal dependencies
 */
import useToggle from '../useToggle';

describe( 'useToggle Hook', () => {
	it( 'initial useToggle with true input param and check the result is true', () => {
		const api = renderHook( () => useToggle( true ) );
		const [ value ] = api.result.current;

		expect( value ).toStrictEqual( true );
	} );

	it( 'initial toggle value should be false without default value and toggle function should update the value to true', async () => {
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
