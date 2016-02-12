(function () {
    'use strict';
    module.exports = function localStorageAdapter($q) {

        var prefix = '_lsa_';
        var service = {
            getItem: getItem,
            setItem: setItem
        };
        return service;

        /**
         * Get a specific key from the local stoage.
         * It also assumes that the object is stored as a JSON serialization and tries to deserialize it.
         * It returns a promise.
         *
         * @param key
         * @returns {*|promise}
         */
        function getItem(key) {
            var deferred = $q.defer();
            var result = null;
            var item = null;

            try {
                item = localStorage.getItem(getFullKey(key));
            } catch (e) {
                // something very bad happend with the local storage!
                console.error('Error loading data from storage', e);
                deferred.reject();
            }

            try {
                result = JSON.parse(item);
            } catch (e) {
                // probably parsing error... the data are corrupted.
                console.error('Error parsing JSON from storage', e);
                deferred.reject();
            }

            // happy path
            if (result === null) {
                result = {};
            }
            deferred.resolve(result);
            return deferred.promise;
        }

        /**
         * Set a key value pair in the local storage.
         * It returns a promise.
         *
         * @param key
         * @param value
         */
        function setItem(key, value) {
            var deferred = $q.defer();

            try {
                localStorage.setItem(getFullKey(key), JSON.stringify(value));
                deferred.resolve();
            } catch (e) {
                deferred.reject();
            }
            return deferred.promise;
        }

        function getFullKey(key) {
            return prefix + key;
        }
    };
})();