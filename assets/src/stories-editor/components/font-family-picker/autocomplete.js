/**
 * External dependencies
 */
import OriginalAutocomplete from 'accessible-autocomplete/react';

class Autocomplete extends OriginalAutocomplete {
	/**
	 * Overrides default method to prevent an issue with
	 * scrollbars appearing inadvertently.
	 */
	handleInputBlur() {}

	/*
	 * Adds defeaultValue reset behaviours
	 */
	componentDidUpdate( prevProps, prevState ) {
		super.componentDidUpdate( prevProps, prevState );

		if ( this.props.defaultValue === '' && prevProps.defaultValue !== '' ) {
			this.setState( { query: '' } );
		}
	}
}

export default Autocomplete;
