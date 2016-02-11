(function () {
    'use strict';
    module.exports = function localStorageAdapter() {

        var prefix = '_lsa_';

        function getItem(key) {
            var result = null;
            var item = null;

            item = localStorage.getItem(getFullKey(key));

            if (item) {
                result = JSON.parse(item);
            }

            return result;
        }

        function setItem(key, value) {
            localStorage.setItem(getFullKey(key), JSON.stringify(value));
        }

        function getFullKey(key) {
            return prefix + key;
        }

        return {
            getItem: getItem,
            setItem: setItem,
            getFullKey: getFullKey
        }
    };
})();