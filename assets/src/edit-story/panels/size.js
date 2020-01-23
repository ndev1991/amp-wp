/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { useEffect, useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PrefixInput from '../components/PrefixInput';
import LockSwitch from '../components/IconSwitch/LockSwitch';
import { Panel, Row, SpaceSpan, getCommonValue } from './shared';

function SizePanel( { selectedElements, onSetProperties } ) {
	const width = getCommonValue( selectedElements, 'width' );
	const height = getCommonValue( selectedElements, 'height' );
	const isFullbleed = getCommonValue( selectedElements, 'isFullbleed' );
	const [ state, setState ] = useState( { width, height } );
	const [ lockRatio, setLockRatio ] = useState( true );
	useEffect( () => {
		setState( { width, height } );
	}, [ width, height ] );
	const handleSubmit = useCallback(
		( event ) => {
			onSetProperties( state );
			event.preventDefault();
		},
		[ state, onSetProperties ],
	);
	return (
		<Panel onSubmit={ handleSubmit }>
			<Row>
				<PrefixInput
					label={ __( 'W', 'amp' ) }
					value={ state.width }
					isMultiple={ width === '' }
					onChange={ ( value ) => {
						const ratio = width / height;
						const newWidth = isNaN( value ) || value === '' ? '' : parseFloat( value );
						setState( {
							...state,
							width: newWidth,
							height: typeof newWidth === 'number' && lockRatio ? newWidth / ratio : height,
						} );
					} }
					disabled={ isFullbleed }
				/>
				<SpaceSpan />
				<LockSwitch
					label={ __( 'Lock Icon', 'amp' ) }
					checked={ lockRatio }
					onClick={ () => {
						setLockRatio( ! lockRatio );
					} }
				/>
				<SpaceSpan />
				<PrefixInput
					label={ __( 'H', 'amp' ) }
					value={ state.height }
					isMultiple={ height === '' }
					onChange={ ( value ) => {
						const ratio = width / height;
						const newHeight = isNaN( value ) || value === '' ? '' : parseFloat( value );
						setState( {
							...state,
							height: newHeight,
							width: typeof newHeight === 'number' && lockRatio ? newHeight * ratio : width,
						} );
					} }
					disabled={ isFullbleed }
				/>
			</Row>
		</Panel>
	);
}

SizePanel.propTypes = {
	selectedElements: PropTypes.array.isRequired,
	onSetProperties: PropTypes.func.isRequired,
};

export default SizePanel;
