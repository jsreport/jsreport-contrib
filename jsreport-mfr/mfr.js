module.exports = function(reporter, definition) {

    reporter.extensionsManager.beforeRenderListeners.add(definition.name, this, function(request, response) {
        
        var resolveReferences = function(json) {
            if (typeof json === 'string')
                json = JSON.parse(json);

            var byid = {}, // all objects by id
                refs = []; // references to objects that could not be resolved
            json = (function recurse(obj, prop, parent) {
                if (typeof obj !== 'object' || !obj) // a primitive value
                    return obj;
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    for (var i = 0; i < obj.length; i++)
                        if ("$ref" in obj[i])
                            obj[i] = recurse(obj[i], i, obj);
                        else
                            obj[i] = recurse(obj[i], prop, obj);
                    return obj;
                }
                if ("$ref" in obj) { // a reference
                    var ref = obj.$ref;
                    if (ref in byid)
                        return byid[ref];
                    // else we have to make it lazy:
                    refs.push([parent, prop, ref]);
                    return;
                } else if ("$id" in obj) {
                    var id = obj.$id;
                    delete obj.$id;
                    if ("$values" in obj) // an array
                        obj = obj.$values.map(recurse);
                    else // a plain object
                        for (var prop in obj)
                            obj[prop] = recurse(obj[prop], prop, obj);
                    byid[id] = obj;
                }
                return obj;
            })(json); // run it!

            for (var i = 0; i < refs.length; i++) { // resolve previously unknown references
                var ref = refs[i];
                ref[0][ref[1]] = byid[ref[2]];
                // Notice that this throws if you put in a reference at top-level
            }
            return json;
        };

        request.data = request.data(resolveReferences);
    });
};