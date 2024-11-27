// https://prismjs.com/extending.html
// draft version, not yet included in index.html

(function (Prism) {
    Prism.languages.heta = {};

    // Define reusable patterns
    var stringPattern = [
        {
            // Double-quoted strings
            pattern: /"(?:\\.|[^\\"])*"/,
            greedy: true
        },
        {
            // Single-quoted strings
            pattern: /'(?:\\.|[^\\'])*'/,
            greedy: true
        },
        {
            // Unquoted strings (up to delimiters)
            pattern: /[^\s"';{}()[\]]+(?=\s|$|[;{}()[\]])/,
            greedy: true
        }
    ];

    var numberPattern = {
        // Numeric constants with optional exponent
        pattern: /[-+]?\d+\.?\d*(?:[eE][-+]?\d+)?\b/,
        greedy: true
    };

    var booleanPattern = {
        pattern: /\b(?:true|false)\b/,
        greedy: true
    };

    var nullPattern = {
        pattern: /\bnull\b/,
        greedy: true
    };

    // Comments
    Prism.languages.heta.comment = [
        {
            // Line comments
            pattern: /\/\/.*/,
            greedy: true
        },
        {
            // Block comments
            pattern: /\/\*[\s\S]*?\*\//,
            greedy: true
        },
        {
            // Notes (triple single quotes)
            pattern: /'''[\s\S]*?'''/,
            greedy: true
        }
    ];

    // Keywords
    Prism.languages.heta.keyword = {
        pattern: /\b(?:include|type|with|namespace|abstract|concrete|begin|end)\b/,
        greedy: true
    };

    // Booleans and Null
    Prism.languages.heta.boolean = booleanPattern;
    Prism.languages.heta.null = nullPattern;

    // Operators
    Prism.languages.heta.operator = {
        // Operators like =, :=, .=, [id]=
        pattern: /[.:]?=|\[\w*\]=/,
        greedy: true
    };

    // Numbers
    Prism.languages.heta.number = numberPattern;

    // Strings
    //Prism.languages.heta.string = stringPattern;

    // Variables
    Prism.languages.heta.variable = {
        // Variable definitions
        pattern: /\b[A-Za-z_]\w*(?=\s*[:=])/,
        greedy: true
    };

    // Class Names (e.g., @className)
    Prism.languages.heta['class-name'] = {
        pattern: /@\w+/,
        greedy: true
    };

    // Functions (Actions) (e.g., #action)
    Prism.languages.heta.function = {
        pattern: /#\w+/,
        greedy: true
    };

    // Namespaces
    Prism.languages.heta.namespace = {
        pattern: /\bnamespace\b\s+\w+\s+begin/,
        inside: {
            'keyword': /\bnamespace\b|\bbegin\b/,
            'variable': /\w+/
        },
        greedy: true
    };

    // Punctuation
    Prism.languages.heta.punctuation = /[;{}()\[\]]/;

    // Dictionaries
    Prism.languages.heta.dictionary = {
        pattern: /\{[^}]*\}/,
        greedy: true,
        inside: {
            'comment': Prism.languages.heta.comment,
            'property': {
                pattern: /\b[A-Za-z_]\w*(?=\s*:)/,
                greedy: true
            },
            'operator': /:/,
            'punctuation': /[{},]/,
            'string': stringPattern,
            'number': numberPattern,
            'boolean': booleanPattern,
            'null': nullPattern
            // 'array' and 'dictionary' will be added later for recursion
        }
    };

    // Arrays
    Prism.languages.heta.array = {
        pattern: /\[[^\]]*\]/,
        greedy: true,
        inside: {
            'comment': Prism.languages.heta.comment,
            'punctuation': /[\[\],]/,
            'string': stringPattern,
            'number': numberPattern,
            'boolean': booleanPattern,
            'null': nullPattern
            // 'array' and 'dictionary' will be added later for recursion
        }
    };

    // Handle recursive references
    Prism.languages.heta.dictionary.inside.dictionary = Prism.languages.heta.dictionary;
    Prism.languages.heta.dictionary.inside.array = Prism.languages.heta.array;
    Prism.languages.heta.array.inside.dictionary = Prism.languages.heta.dictionary;
    Prism.languages.heta.array.inside.array = Prism.languages.heta.array;

})(Prism);
