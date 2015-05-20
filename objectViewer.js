var objectViewer = (function () {
    'use strict';
    var obj = {};
    var elId = 'objectViewer';
    function getChain($this, chain) {
        chain = chain || [];

        var prop = $this.parents('ul').eq(0).siblings('div');
        var p = prop.parent('li');
        //stop if its the top level
        if ($this.parent('.objectV').length >0) {
            return chain;
        }

        if (prop.length > 0) {
            chain.push(prop.text());
        }

        if (p.length > 0) {
            getChain(p, chain);
        }
        return chain;
    }

    function findPath(obj, path) {
        var g_obj,
        i;
        console.log(path);
        for (i = path.length; i--; ) {
            var p = path[i];
            g_obj = g_obj && g_obj[p] || obj[p];
        }
        return g_obj;
    }

    function closeUpTo(selector, toClose) {
        if (typeof toClose === 'number' && toClose > 0) {
            $(selector).find('.objectTitle,.arrayTitle').each(function (e) {
                if ($(this).parents('ul').length >= toClose) {
                    $(this).next('ul').hide();
                    $(this).toggleClass('close');
                }
            });
        }
    }

    function htmlEntities(str) {
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function M(obj, el, maxChildren, counter, notCreateHeader) {

        var li,
        head,
        prop,
        end,
        recution,
        isArray,
        isArray2,
        maxChildren = maxChildren || 0,
        newEl;
        counter = counter || 0;
        el = el || document.createElement('ul');

        if (obj && obj.constructor) {
            isArray = obj.constructor.toString().indexOf("Array") >= 0 ? true : false;
        } else {
            isArray = false;
        }

        if (isArray) {
            el.className = 'array';
        } else {
            el.className = 'object';
        }
        if (counter === 0 && notCreateHeader !== true) {
            li = document.createElement('li');
            var ObjName = isArray ? 'Array' : 'Object'
                li.innerHTML = '<h1>' + ObjName + '</h1>'
                el.appendChild(li);
            el.className += ' objectV';
        }
        if (counter > maxChildren && maxChildren !== -1) {
            end = document.createElement('li');
            end.className = 'end';
            end.innerHTML = 'Child ' + counter + '...';
            el.appendChild(end)
            return el;
        }

        for (var x in obj) {
            if (obj.hasOwnProperty && obj.hasOwnProperty(x) || true) {
                li = document.createElement('li');
                head = document.createElement('div');
                head.innerHTML = htmlEntities(x);
                head.className += 'title';

                if (typeof obj[x] === 'object' && obj[x] !== null && obj !== undefined) {
                    if (obj[x].constructor) {
                        isArray2 = obj[x].constructor.toString().indexOf("Array") >= 0 ? true : false;
                    } else {
                        isArray2 = false;
                    }
                    li.className = isArray ? 'arrayProp' : 'objectProp';
                    head.className += isArray2 ? ' arrayTitle' : ' objectTitle';

                    li.appendChild(head);

                    if (isSameInstanc(obj, obj[x])) {
                        console.log('SAME');
                        recution = document.createElement('ul');
                        recution.className = 'recution';
                        recution.innerHTML = 'recution this is a parent child object';
                        li.appendChild(recution);
                    } else {
                        li.appendChild(M(obj[x], false, maxChildren,  + (counter + 1)));
                    }

                    el.appendChild(li);
                } else {
                    head.className += ' propTitle';
                    prop = document.createElement('p');
                    prop.innerHTML = htmlEntities(obj[x]);
                    prop.className = 'propValue ' + typeof obj[x];
                    li.appendChild(head);
                    li.appendChild(prop);
                    el.appendChild(li);
                }
            }
        }
        return el;
    }

    function objectVEvents(selector, toClose) {
        function toggleOpen($this,time){
            time = time >= 0 ? time : 250;
            $this.next('ul').slideToggle(time);
            $this.toggleClass('close');
        }
        $(selector).on('click', '.objectTitle,.arrayTitle', function (e) {
            if(e.altKey || e.ctrlKey){
                $(this).next('ul').find('.objectTitle,.arrayTitle').each(function(){
                    toggleOpen($(this),1);
                });
            }
            toggleOpen($(this));
        });

        // $(selector).on('click', '.title', function (e) {
            // console.log($(this).parents('ul').length);
        // });

        $(selector).on('click', '.end', function (e) {
            var chain = getChain($(this));
            var thisObj = findPath(obj, chain);
            this.innerHTML = '';
            M(thisObj, this, 1, 0, true);
            closeUpTo(this, 1);
        });

        closeUpTo(selector, toClose);
    }

    function isSameInstanc(obj, obj2) {
        try {
            obj['___TESTING___'] = true;
            if (obj2['___TESTING___']) {
                return true;
            }

            delete obj['___TESTING___'];
            return false;

        } catch (err) {
            console.warn(err);

        }
        return false;
    }

    function viewer(options) {
        var data = options.data,
        appendTo = options.appendTo,
        limit = options.limit,
        closeChilds = options.closeChilds,
        id = options.id || 'objectViewer';
        elId = id;
        closeChilds = closeChilds || 0;

        if (typeof data !== 'object' || data === null || data === undefined) {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data);
                } catch (err) {
                    data = {
                        Error : 'thre was error in the input string'
                    };
                }
            } else {
                console.warn('I dont know how to handle this type', data);
            }
        }
        obj = data;

        var ul = document.getElementById(id) || document.createElement('ul');
        ul.innerHTML = '';

        // try {
            // M(data, ul, limit);
            M(data, ul, limit);
        // } catch (err) {
            // console.warn(err);
        // }


        $(appendTo).append(ul);
        if (ul.id !== id) {
            ul.id = id;
            objectVEvents('#' + id, closeChilds);
        } else {
            closeUpTo('#' + id,closeChilds)
        }
    }

    return {
        viewer : viewer
    };
})();

