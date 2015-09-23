/**
 * @author 123cmp
 * @description Extensions
 */

define(['backbone', 'jquery'], function(_, $) {
    'use strict';
    $.each( [ "putJSON", "deleteJSON", "postJSON"], function( i, method ) {
        $[ method ] = function(url, data) {
            if(typeof data == "object")
                try {
                    data = JSON.stringify(data);
                } catch (parseError) {
                    console.error(parseError);
                }
            return $.ajax({
                url: url,
                type: method.replace("JSON", "").toUpperCase(),
                contentType: 'application/json',
                dataType: "json",
                data: data
            });
        };
    });

    _.isBlank = function(str) {
        return (/^\s*$/).test(str||'');
    };
});


