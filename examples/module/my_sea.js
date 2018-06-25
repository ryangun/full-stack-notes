let define = function() {};

const seajs = {
    use(path, fn_end) {
        $.ajax({
            url: path,
            success(str) {
                parseStr(str, fn_end);

                function parseStr(str, fn_end) {
                    define = function(fn) {
                        let module = {
                            exports: {}
                        }
                        fn(function() {}, module.exports, module);

                        fn_end(module.exports)
                    }

                    // 第一步，把所有require都找出来
                    let tmp = str.substring(str.indexOf('{') + 1, str.lastIndexOf('}'));
                    // console.log(tmp.match(/require\([^\(\)]+\)/g));
                    let arr = $.each(tmp.match(/require\([^\(\)]+\)/g), function(index, item) {
                        // console.log(item)
                        getRequireFile(item);
                    })
                    // console.log(arr)

                    let i = 0;
                    let json = {};
                    console.log(getRequireFile(arr[i]))
                    let next = function() {
                        $.ajax({
                            url: getRequireFile(arr[i]),
                            success(str) {
                                parseStr(str, function(mod) {
                                    json[arr[i]] = mod;
                                    console.log(json[arr[i]])
                                    i++;
                                    if (i == arr.length) {
                                        // 第二步，执行代码
                                        // getRequireFile(arr[i])
                                        eval(str);
                                    } else {
                                        next();
                                    }
                                })
                            }
                        })
                    }
                    next();
                }
            },

            error(str) {
                console.log(str)
                console.log('失败')
            }
        })
    }
}

function getRequireFile(item) {
    if (item.indexOf('"') != -1) {
        return item.substring(item.indexOf("\"") + 1, item.lastIndexOf("\""));
    } else {
        return item.substring(item.indexOf("\'") + 1, item.lastIndexOf("\'"));
    }
}