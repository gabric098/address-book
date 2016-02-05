module.exports = function modelList(LocalStorageAdapter) {
    "ngInject";

    var modellist = {};

    function loadFromStorage() {
        var item = LocalStorageAdapter.getItem('addressbook');
        if (item && item !== '') {
            modellist = JSON.parse(item);
        }
    }

    function saveToStorage() {
        LocalStorageAdapter.setItem('addressbook', JSON.stringify(modellist));
    }

    function getNewKey() {
        loadFromStorage();
        var lastKey = 0;
        console.log(modellist);

        _.each(modellist, function(value, key) {
            var currentKey = parseInt(key);
            console.log(key);
            if (currentKey > lastKey) {
                lastKey = currentKey;
            }
        });
        return lastKey+1;
    }

    function getModelById(id) {
        loadFromStorage();
        var model = null;
        if (modellist.hasOwnProperty(id)) {
            model = modellist[id];
        }
        return model;
    }

    function getAllModels() {
        loadFromStorage();
        return modellist;
    }

    function addModel(model) {
        var newKey = getNewKey();
        modellist[newKey] = model;
        saveToStorage();
    }

    function removeModel(id) {
        if (_.has(modellist, id)) {
            delete modellist.id;
            saveToStorage();
        }
    }

    return  {
        getModelById: getModelById,
        getAllModels: getAllModels,
        addModel: addModel,
        removeModel: removeModel
    }
};