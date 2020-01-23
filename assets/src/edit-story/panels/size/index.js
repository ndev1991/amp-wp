/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { useEffect, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PrefixInput from '../../components/PrefixInput';
import LockSwitch from '../../components/IconSwitch/LockSwitch';
import { Panel, Row, SpaceSpan, getCommonValue } from '../shared';
import useSize from './useSize';

function SizePanel( { selectedElements, onSetProperties } ) {
	const width = getCommonValue( selectedElements, 'width' );
	const height = getCommonValue( selectedElements, 'height' );
	const isFullbleed = getCommonValue( selectedElements, 'isFullbleed' );

	const {
		lockRatio,
		state,
		setState,
		handleHeight,
		handleWidth,
		handleToggleLockRatio,
	} = useSize( width, height );

	useEffect( () => {
		setState( { width, height } );
	}, [ width, height, setState ] );

	const handleSubmit = useCallback( ( event ) => {
		onSetProperties( state );
		event.preventDefault();
	}, [ state, onSetProperties ]	);

	return (
		<Panel onSubmit={ handleSubmit }>
			<Row>
				<PrefixInput
					label={ __( 'W', 'amp' ) }
					value={ state.width }
					isMultiple={ width === '' }
					onChange={ handleWidth }
					disabled={ isFullbleed }
				/>
				<SpaceSpan />
				<LockSwitch
					label={ __( 'Lock Icon', 'amp' ) }
					checked={ lockRatio }
					onClick={ handleToggleLockRatio }
				/>
				<SpaceSpan />
				<PrefixInput
					label={ __( 'H', 'amp' ) }
					value={ state.height }
					isMultiple={ height === '' }
					onChange={ handleHeight }
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
