define(
	[
        "vent"
	],
	function ( vent ) {
		"use strict";

		return {

            items: {},

            set: function( name, value ) {
                this.items[name] = value;
            },

            get: function( name ) {
                if ( this.isset( name ) ) {
                    return this.items[name];
                } else {
                    return false;
                }
            },

            unset: function( name ) {
                if ( this.isset( name ) ) {
                    delete this.items[name];
                }
            },

            isset: function( name ) {
                if ( this.items.hasOwnProperty(name) ) {
                    return true;
                } else {
                    return false;
                }
            }

        }
	}
);