/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { useCallback, useEffect, useRef, useState } from '@wordpress/element';
import { Spinner, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.css';

function SelectTemplateInitializer( { settings } ) {
	const [ selectedTemplate, setSelectedTemplate ] = useState( null );
	const [ selectedTemplateType, setSelectedTemplateType ] = useState( null );
	const [ isFetching1, setIsFetching1 ] = useState( false );
	const [ isFetching2, setIsFetching2 ] = useState( false );
	const [ filter, setFilter ] = useState( '' );
	const fetchRequest1 = useRef( null );
	const fetchRequest2 = useRef( null );
	const isStillMounted = useRef( true );

	const fetchSelectedTemplates = useCallback( () => {
		isStillMounted.current = true;
		setIsFetching1( true );
		const currentFetchRequest = fetchRequest1.current = apiFetch( {
			path: settings.api + '?amp_template_type=' + filter,
		} ).then(
			( post ) => {
				if ( isStillMounted.current && fetchRequest1.current === currentFetchRequest ) {
					setSelectedTemplate( post );
					setIsFetching1( false );
				}
			},
		).catch(
			() => {
				if ( isStillMounted.current && fetchRequest1.current === currentFetchRequest ) {
					setSelectedTemplate( null );
					setIsFetching1( false );
				}
			},
		);
	}, [ settings, filter ] );

	const fetchSelectedTemplatesType = useCallback( () => {
		isStillMounted.current = true;
		setIsFetching2( true );
		const currentFetchRequest = fetchRequest2.current = apiFetch( {
			path: settings.api2,
		} ).then(
			( tag ) => {
				if ( isStillMounted.current && fetchRequest2.current === currentFetchRequest ) {
					setSelectedTemplateType( tag );
					setIsFetching2( false );
				}
			},
		).catch(
			() => {
				if ( isStillMounted.current && fetchRequest2.current === currentFetchRequest ) {
					setSelectedTemplateType( null );
					setIsFetching2( false );
				}
			},
		);
	}, [ settings ] );

	useEffect( () => {
		return () => {
			isStillMounted.current = false;
		};
	}, [] );

	useEffect( () => {
		fetchSelectedTemplates();
		fetchSelectedTemplatesType();
	}, [ fetchSelectedTemplates, fetchSelectedTemplatesType ] );

	const selectTemplateEvent = ( id ) => {
		// eslint-disable-next-line no-alert,no-undef
		alert( ' Selected template ' + id );
	};

	const selectTemplateTypeEvent = ( id ) => {
		setFilter( id );
	};

	return (
		<>
			{ isFetching1 && isFetching2 && <Spinner /> }

			{ isFetching1 === false && selectedTemplateType && (
				<div className={ 'template-type-container' }>
					<Button
						isDefault
						isLarge
						className={ 'each-template-type' }
						onClick={ () => {
							selectTemplateTypeEvent( '' );
						} }>
						{ __( 'All', 'amp' ) }
					</Button>
					{ selectedTemplateType.map( ( template ) => (
						<Button
							isDefault
							isLarge
							className={ 'each-template-type' }
							key={ template.id }
							onClick={ () => {
								selectTemplateTypeEvent( template.id );
							} }>
							{ template.name }
						</Button>
					) )
					}
				</div>
			)
			}

			{ isFetching1 === false && selectedTemplate && (
				<div className={ 'template-container' }>
					{ selectedTemplate.map( ( template ) => (
						// eslint-disable-next-line jsx-a11y/click-events-have-key-events
						<div
							role={ 'button' }
							tabIndex={ 0 }
							className={ 'each-template' }
							key={ template.id }
							onClick={ () => {
								selectTemplateEvent( template.id );
							} }
						>
							{ template.title.rendered }
						</div>
					) )
					}
				</div>
			)
			}
		</>
	);
}

SelectTemplateInitializer.propTypes = {
	settings: PropTypes.shape( {
		testing: PropTypes.string,
		api: PropTypes.string,
		api2: PropTypes.string,
	} ).isRequired,
};

export default SelectTemplateInitializer;
