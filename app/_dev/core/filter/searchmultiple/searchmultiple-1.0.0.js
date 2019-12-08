app.filter('SearchMultiple', function () {
    return function (input, searchText, AND_OR) {
        var searchText = searchText.$;
        var returnArray = [],
            // Split on single or multi space
            splitext = searchText.toLowerCase().split(/\s+/),
            // Build Regexp with Logical AND using "look ahead assertions"
            regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")",
            // Build Regexp with logicial OR
            regexp_or = searchText.toLowerCase().replace(/\s+/g, "|"),
            // Compile the regular expression
            re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

        for (var x = 0; x < input.length; x++) {
            if (re.test(input[x])) returnArray.push(input[x]);
        }
        // View what the 2 regular expression look like
        console.log(regexp_or);
        console.log(regexp_and);
        return returnArray;
    }
});
