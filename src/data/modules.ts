export type Lesson = {
  id: string;
  title: string;
  duration: string;
  description: string;
  code: string;
  expectedOutput?: string;
  hint: string;
};

export type Module = {
  id: string;
  title: string;
  slug: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessons: number;
  duration: string;
  description: string;
  color: string;
  lessonList: Lesson[];
};

export const modules: Module[] = [
  {
    id: 'm1', title: 'Hello, Gopher', slug: 'hello', level: 'Beginner', lessons: 4, duration: '30 min',
    description: 'Your very first steps. You will write a tiny program that prints text to the screen.',
    color: '#FFC145',
    lessonList: [
      {
        id: 'm1l1', title: 'Your first program', duration: '6 min',
        description: 'Every Go file starts with two lines: package main tells Go this is an app you can run, and func main is where it starts. fmt is a helper for printing text. Think of fmt.Println as saying out loud what is inside the quotes.',
        code: 'package main\n\nimport "fmt"\n\n// package main means this file can run as an app\n// func main is where Go starts reading your code\nfunc main() {\n    // Println prints text and moves to the next line\n    fmt.Println("Hello, Gopher!")\n}',
        expectedOutput: 'Hello, Gopher!',
        hint: 'Anything inside double quotes " " is text. Try changing Gopher to your name and tap Run to see it.',
      },
      {
        id: 'm1l2', title: 'Printing with values', duration: '7 min',
        description: 'You can store a word in a box called a variable, then print it. := creates the box and puts the value in. %s is a placeholder that gets replaced by the variable. \\n just means new line.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // := creates a variable and fills it right away\n    name := "Forge"\n    // %s will be replaced by the value of name\n    // \\n moves the cursor to the next line\n    fmt.Printf("Hello, %s! You are writing Go.\\n", name)\n}',
        expectedOutput: 'Hello, Forge! You are writing Go.',
        hint: 'Printf is like filling blanks. %s for text, %d for numbers. The comma separates the template from the value.',
      },
      {
        id: 'm1l3', title: 'Comments are notes', duration: '6 min',
        description: 'Comments are notes for humans. Go ignores them, but they help you remember what code does. Use // for one line and /* */ for many lines. Good comments explain why, not just what.',
        code: 'package main\n\nimport "fmt"\n\n// main is the starting point of the app\nfunc main() {\n    /* This line prints a message.\n       You can write many lines inside */\n    fmt.Println("Gopher Forge ready")\n}',
        expectedOutput: 'Gopher Forge ready',
        hint: 'Comments do not affect output. Try adding // hello at the end of a line. Nothing changes when you run it.',
      },
      {
        id: 'm1l4', title: 'Exercise: Make a greeting', duration: '8 min',
        description: 'Practice joining words. + sticks two pieces of text together like tape. " " is a single space so words do not crash into each other.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    first := "Gopher"\n    second := "Forge"\n    // + joins text together\n    // " " adds a space between them\n    fmt.Println(first + " " + second)\n}',
        expectedOutput: 'Gopher Forge',
        hint: 'Try fmt.Println(first + " loves " + second). You can join any pieces of text with +.',
      },
    ]
  },
  {
    id: 'm2', title: 'Variables and Types', slug: 'variables', level: 'Beginner', lessons: 5, duration: '38 min',
    description: 'Learn how to store information in boxes called variables. Each box has a type like text, number, or yes/no.',
    color: '#3DDC84',
    lessonList: [
      {
        id: 'm2l1', title: 'Creating variables', duration: '7 min',
        description: 'var creates a box with a label and a type. string means text, int means whole number. := is a shortcut that lets Go guess the type for you. Both do the same job.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // long form: var name type = value\n    var language string = "Go"\n    // short form: Go guesses the type\n    version := 1.22\n    // %.2f prints a number with 2 digits after the dot\n    fmt.Printf("%s %.2f\\n", language, version)\n}',
        expectedOutput: 'Go 1.22',
        hint: 'Use var when you want to be explicit. Use := when you want it short. Same result.',
      },
      {
        id: 'm2l2', title: 'Empty boxes have defaults', duration: '7 min',
        description: 'If you make a box but put nothing in, Go fills it with a safe default. Numbers start at 0, text starts empty "", yes/no starts at false. This is called the zero value.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var a int    // empty number -> 0\n    var b string // empty text -> ""\n    var c bool   // empty yes/no -> false\n    // %d for numbers, %q shows text with quotes, %t for true/false\n    fmt.Printf("%d %q %t\\n", a, b, c)\n}',
        expectedOutput: '0 "" false',
        hint: 'Think of zero values as Go tidying up. An empty score starts at 0, not random.',
      },
      {
        id: 'm2l3', title: 'Constants never change', duration: '6 min',
        description: 'A constant is a box you seal shut. Once you set it, it stays that way forever. Useful for things like Pi that should never change.',
        code: 'package main\n\nimport "fmt"\n\n// Pi will always be 3.14159, no one can change it later\nconst Pi = 3.14159\n\nfunc main() {\n    // use Pi like a normal number\n    fmt.Println(Pi * 2)\n}',
        expectedOutput: '6.28318',
        hint: 'Try changing Pi inside main. Go will complain because constants are locked.',
      },
      {
        id: 'm2l4', title: 'Changing types', duration: '8 min',
        description: 'Go is strict. You cannot mix a whole number and a decimal directly. You must convert. float64(x) says treat x as a decimal number. %T shows the type.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    x := 42              // whole number (int)\n    y := float64(x)      // convert to decimal (float64)\n    // %T prints the type, %.1f prints one digit after dot\n    fmt.Printf("%T %.1f\\n", y, y)\n}',
        expectedOutput: 'float64 42.0',
        hint: 'Conversion looks like Type(value). For example int(3.14) would cut the decimal.',
      },
      {
        id: 'm2l5', title: 'Exercise: Swap two values', duration: '10 min',
        description: 'You can swap two boxes in one line. a, b = b, a means put the value of b into a and a into b at the same time. Like swapping two cups.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    a, b := 10, 20\n    // swap them in one step\n    a, b = b, a\n    fmt.Println(a, b)\n}',
        expectedOutput: '20 10',
        hint: 'You can also write x, y := b, a to create new variables already swapped.',
      },
    ]
  },
  {
    id: 'm3', title: 'Control Flow', slug: 'control', level: 'Beginner', lessons: 4, duration: '34 min',
    description: 'Make decisions and repeat work. If for choosing, for for repeating, switch for picking one of many.',
    color: '#5EB0FF',
    lessonList: [
      {
        id: 'm3l1', title: 'If and else', duration: '7 min',
        description: 'if checks a condition. If it is true, the first block runs, otherwise the else block runs. No parentheses needed, but braces { } are required.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    score := 85\n    // if score is 80 or more, pass. Otherwise retry.\n    if score >= 80 {\n        fmt.Println("Pass")\n    } else {\n        fmt.Println("Retry")\n    }\n}',
        expectedOutput: 'Pass',
        hint: 'Try changing score to 60 and run again. You will see Retry because the condition is false.',
      },
      {
        id: 'm3l2', title: 'Repeating with for', duration: '8 min',
        description: 'Go has only one loop word: for. It has three parts: start (i := 0), keep going while (i < 3), and step (i++ adds one). It is like counting on fingers.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // start at 0, run while i is less than 3, add 1 each time\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}',
        expectedOutput: '0\n1\n2',
        hint: 'i++ is short for i = i + 1. The loop stops when the middle condition becomes false.',
      },
      {
        id: 'm3l3', title: 'Choosing with switch', duration: '8 min',
        description: 'switch is a cleaner way to check many options. Go automatically stops after one match, so you never need break. default runs if nothing matches.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    lang := "Go"\n    switch lang {\n    case "Go":\n        fmt.Println("Gopher!")\n    case "Rust":\n        fmt.Println("Crab!")\n    default:\n        fmt.Println("Hello")\n    }\n}',
        expectedOutput: 'Gopher!',
        hint: 'Change lang to "Rust" or "Python" and see which line prints. Only one case wins.',
      },
      {
        id: 'm3l4', title: 'Exercise: Fizz', duration: '9 min',
        description: 'We loop 1 to 5. % gives the remainder after division. If i divided by 3 has no remainder (i%3 == 0), we print Fizz, otherwise we print the number.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 1; i <= 5; i++ {\n        if i%3 == 0 {\n            fmt.Println("Fizz") // divisible by 3\n        } else {\n            fmt.Println(i)\n        }\n    }\n}',
        expectedOutput: '1\n2\nFizz\n4\n5',
        hint: 'i%3 means remainder when i is divided by 3. Try i%2 == 0 to check even numbers.',
      },
    ]
  },
  {
    id: 'm4', title: 'Functions', slug: 'functions', level: 'Beginner', lessons: 4, duration: '35 min',
    description: 'Bundle code into reusable pieces you can call by name. Like a recipe you write once and use many times.',
    color: '#FF7A7A',
    lessonList: [
      {
        id: 'm4l1', title: 'Making a function', duration: '7 min',
        description: 'func tells Go you are making a new action. Inside the parentheses you list inputs, after them you say what it returns. return hands the result back.',
        code: 'package main\n\nimport "fmt"\n\n// greet takes a name (string) and returns a greeting (string)\nfunc greet(name string) string {\n    return "Hello, " + name\n}\n\nfunc main() {\n    // call greet and print what it returns\n    fmt.Println(greet("Tobi"))\n}',
        expectedOutput: 'Hello, Tobi',
        hint: 'The name string means the function expects text. Try greet("Ada") or greet("Go").',
      },
      {
        id: 'm4l2', title: 'Returning two values', duration: '8 min',
        description: 'A Go function can return more than one thing at once. You list both types in parentheses. Callers catch them with x, y :=.',
        code: 'package main\n\nimport "fmt"\n\n// split takes a sum and returns two parts\nfunc split(sum int) (int, int) {\n    return sum * 4 / 9, sum - sum*4/9\n}\n\nfunc main() {\n    x, y := split(17) // catch two results\n    fmt.Println(x, y)\n}',
        expectedOutput: '7 10',
        hint: ' x, y := means store first return in x and second in y. Try split(10).',
      },
      {
        id: 'm4l3', title: 'Defer runs later', duration: '8 min',
        description: 'defer says do this later, right before the function ends. It is useful for cleanup. If you defer many things, they run last-in first-out, like stacking plates.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // this line waits until main is about to finish\n    defer fmt.Println("done")\n    fmt.Println("working")\n}',
        expectedOutput: 'working\ndone',
        hint: 'Try adding defer fmt.Println("first") before the other defer. It will print last.',
      },
      {
        id: 'm4l4', title: 'Exercise: Sum any amount', duration: '9 min',
        description: '...int means the function can take any number of integers. range loops over each one. Think of it as an empty bag that fills with whatever you pass.',
        code: 'package main\n\nimport "fmt"\n\n// nums ...int means any number of integers\nfunc sum(nums ...int) int {\n    total := 0\n    for _, n := range nums { // _ ignores the index, n is the value\n        total += n\n    }\n    return total\n}\n\nfunc main() {\n    fmt.Println(sum(1, 2, 3, 4))\n}',
        expectedOutput: '10',
        hint: 'Try sum(10, 20) or sum(5). It works with any count because of ...int.',
      },
    ]
  },
  {
    id: 'm5', title: 'Arrays, Slices, Maps', slug: 'collections', level: 'Beginner', lessons: 5, duration: '42 min',
    description: 'Three ways to hold many values. Arrays are fixed, slices grow, maps look up by name.',
    color: '#FFC145',
    lessonList: [
      {
        id: 'm5l1', title: 'Arrays are fixed', duration: '7 min',
        description: 'An array is a row of boxes with a fixed size. [2]string means exactly 2 texts. You cannot add a third without making a new array. Index starts at 0.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var a [2]string // room for exactly 2 strings\n    a[0] = "hello"   // first slot\n    a[1] = "forge"   // second slot\n    fmt.Println(a)\n}',
        expectedOutput: '[hello forge]',
        hint: 'a[0] is the first item. Try changing a[1] to "gopher" and see the output.',
      },
      {
        id: 'm5l2', title: 'Slices can grow', duration: '9 min',
        description: 'A slice is like a flexible list. You start with []int{1,2,3} and append adds more. len tells you how many items are inside. Most Go code uses slices, not arrays.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    s := []int{1, 2, 3}   // a slice with 3 numbers\n    s = append(s, 4, 5)   // grow it by 2\n    fmt.Println(s, len(s))\n}',
        expectedOutput: '[1 2 3 4 5] 5',
        hint: 'append returns a new slice, so you must write s = append(s, ...).',
      },
      {
        id: 'm5l3', title: 'Cutting a slice', duration: '8 min',
        description: 's[low:high] cuts out a piece. It includes the start index but stops before the end index. Think of slicing bread between two marks.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    s := []int{0, 1, 2, 3, 4}\n    // from index 1 up to but not including 4\n    fmt.Println(s[1:4])\n}',
        expectedOutput: '[1 2 3]',
        hint: 'Try s[0:2] or s[2:]. Leaving one side empty means from start or to end.',
      },
      {
        id: 'm5l4', title: 'Maps are dictionaries', duration: '8 min',
        description: 'A map stores pairs: a key and its value. You look up by name. m["go"] gives 1. If a key is missing, you get the zero value like 0 or "". Great for counting.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    m := map[string]int{"go": 1, "rust": 2}\n    m["zig"] = 3 // add a new pair\n    fmt.Println(m["go"], len(m))\n}',
        expectedOutput: '1 3',
        hint: 'map[string]int means text keys point to number values. Try fmt.Println(m["missing"]) to see 0.',
      },
      {
        id: 'm5l5', title: 'Exercise: Count words', duration: '10 min',
        description: 'We make an empty map to count. For each word in the list, we add one to its counter. count[w]++ means increase the number for that word.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    words := []string{"go", "go", "forge", "go"}\n    count := make(map[string]int) // empty counter\n    for _, w := range words {     // loop each word\n        count[w]++                // add one for that word\n    }\n    fmt.Println(count["go"], count["forge"])\n}',
        expectedOutput: '3 1',
        hint: 'make(map[string]int) creates an empty map ready to use. Count appears automatically.',
      },
    ]
  },
  {
    id: 'm6', title: 'Structs and Methods', slug: 'structs', level: 'Intermediate', lessons: 4, duration: '38 min',
    description: 'Group related fields into one object, then give that object its own actions.',
    color: '#3DDC84',
    lessonList: [
      {
        id: 'm6l1', title: 'Grouping with structs', duration: '8 min',
        description: 'A struct groups related data. Think of a contact card with Name and Age together. You access fields with a dot like g.Name. Capital letters mean the field is public.',
        code: 'package main\n\nimport "fmt"\n\n// Gopher is a blueprint with two fields\ntype Gopher struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    g := Gopher{Name: "Go", Age: 15}\n    fmt.Printf("%s is %d\\n", g.Name, g.Age)\n}',
        expectedOutput: 'Go is 15',
        hint: 'Gopher{Name: "Go"} sets fields by name. You can also try g.Age = 16.',
      },
      {
        id: 'm6l2', title: 'Giving structs actions', duration: '9 min',
        description: 'A method is a function attached to a type. (r Rect) before the name means this function belongs to Rect. Inside you can use r.W and r.H.',
        code: 'package main\n\nimport "fmt"\n\ntype Rect struct{ W, H int }\n\n// Area belongs to Rect, like a skill the rectangle has\nfunc (r Rect) Area() int { return r.W * r.H }\n\nfunc main() {\n    fmt.Println(Rect{3, 4}.Area())\n}',
        expectedOutput: '12',
        hint: 'Rect{3,4}.Area() creates a rectangle and immediately calls its Area method.',
      },
      {
        id: 'm6l3', title: 'Changing the original', duration: '9 min',
        description: 'If a method uses (c *Counter) with a star, it can change the original object. Without the star it only changes a copy. Like editing the real document vs a photocopy.',
        code: 'package main\n\nimport "fmt"\n\ntype Counter struct{ N int }\n\n// *Counter means we can modify the real counter\nfunc (c *Counter) Inc() { c.N++ }\n\nfunc main() {\n    c := Counter{}\n    c.Inc() // N becomes 1\n    c.Inc() // N becomes 2\n    fmt.Println(c.N)\n}',
        expectedOutput: '2',
        hint: 'Try changing *Counter to Counter and see that N stays 0. The star makes it stick.',
      },
      {
        id: 'm6l4', title: 'Exercise: Greeting user', duration: '10 min',
        description: 'First define the type, then attach a method that uses its field. User{"Ada"} creates a value, .Greet() calls the action on it.',
        code: 'package main\n\nimport "fmt"\n\ntype User struct{ Name string }\n\nfunc (u User) Greet() string { return "Hi, " + u.Name }\n\nfunc main() {\n    fmt.Println(User{"Ada"}.Greet())\n}',
        expectedOutput: 'Hi, Ada',
        hint: 'User{"Ada"} is short for User{Name: "Ada"}. Try User{"Tobi"}.Greet().',
      },
    ]
  },
  {
    id: 'm7', title: 'Pointers', slug: 'pointers', level: 'Intermediate', lessons: 3, duration: '28 min',
    description: 'Learn addresses. A pointer holds the location of a value, not the value itself.',
    color: '#5EB0FF',
    lessonList: [
      {
        id: 'm7l1', title: 'Addresses and values', duration: '8 min',
        description: '& means address of. Give me where x lives. * means value at that address. Follow the address and change what is there. They are opposites.',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    x := 10\n    p := &x  // p holds the address of x\n    *p = 20  // go to that address and set it to 20\n    fmt.Println(x, *p) // both show 20 because they point to same spot\n}',
        expectedOutput: '20 20',
        hint: '&x asks where, *p goes there. After *p = 20, x also changes because they share the spot.',
      },
      {
        id: 'm7l2', title: 'Sharing with functions', duration: '9 min',
        description: 'Normally a function gets a copy. With a pointer *int, it gets the real address and can change the original value outside. Call with &x to share the address.',
        code: 'package main\n\nimport "fmt"\n\n// double takes the address of a number and doubles it in place\nfunc double(n *int) { *n *= 2 }\n\nfunc main() {\n    x := 5\n    double(&x) // share the address of x\n    fmt.Println(x)\n}',
        expectedOutput: '10',
        hint: 'If double took int instead of *int, x would stay 5. The star lets it reach out.',
      },
      {
        id: 'm7l3', title: 'Exercise: Swap with pointers', duration: '9 min',
        description: 'We swap by following both addresses. *a, *b = *b, *a reads the values at both places and writes them swapped. &x passes the address when calling.',
        code: 'package main\n\nimport "fmt"\n\nfunc swap(a, b *int) { *a, *b = *b, *a }\n\nfunc main() {\n    x, y := 1, 2\n    swap(&x, &y)\n    fmt.Println(x, y)\n}',
        expectedOutput: '2 1',
        hint: '*a means value at a. Try printing *a inside swap before the swap line.',
      },
    ]
  },
  {
    id: 'm8', title: 'Interfaces', slug: 'interfaces', level: 'Intermediate', lessons: 3, duration: '30 min',
    description: 'Interfaces let different types be used the same way if they share a method. Like a universal remote.',
    color: '#FF7A7A',
    lessonList: [
      {
        id: 'm8l1', title: 'No keyword needed', duration: '9 min',
        description: 'If a type has the method listed in the interface, it automatically counts. No need to say it implements. If it can Speak, it is a Speaker.',
        code: 'package main\n\nimport "fmt"\n\ntype Speaker interface{ Speak() string }\ntype Dog struct{}\nfunc (d Dog) Speak() string { return "woof" }\nfunc say(s Speaker) { fmt.Println(s.Speak()) }\nfunc main() { say(Dog{}) }',
        expectedOutput: 'woof',
        hint: 'Try adding type Cat struct{} with Speak returning meow. say(Cat{}) will also work.',
      },
      {
        id: 'm8l2', title: 'Anything and type switch', duration: '10 min',
        description: 'interface{} can hold any value, like an empty box. A type switch i.(type) checks what is actually inside and runs the matching case. %T prints the type name.',
        code: 'package main\n\nimport "fmt"\n\nfunc describe(i interface{}) {\n    switch v := i.(type) {\n    case int:\n        fmt.Printf("int %d\\n", v)\n    case string:\n        fmt.Printf("string %s\\n", v)\n    default:\n        fmt.Printf("unknown %T\\n", v)\n    }\n}\nfunc main() { describe("hello"); describe(42) }',
        expectedOutput: 'string hello\nint 42',
        hint: 'Try describe(true). It will hit default and show unknown bool.',
      },
      {
        id: 'm8l3', title: 'Exercise: Shape area', duration: '10 min',
        description: 'Define an interface Area with one method. Any type with Area() qualifies. var a Area = Square{4} stores a square as an Area, then we call a.Area().',
        code: 'package main\n\nimport "fmt"\n\ntype Area interface{ Area() float64 }\ntype Square struct{ S float64 }\nfunc (s Square) Area() float64 { return s.S * s.S }\nfunc main() { var a Area = Square{4}; fmt.Println(a.Area()) }',
        expectedOutput: '16',
        hint: 'Try adding type Circle and giving it Area too. Both can be stored in Area.',
      },
    ]
  },
  {
    id: 'm9', title: 'Error Handling', slug: 'errors', level: 'Intermediate', lessons: 3, duration: '30 min',
    description: 'In Go, errors are just values you return and check. No surprises, you always decide what to do.',
    color: '#FFC145',
    lessonList: [
      {
        id: 'm9l1', title: 'Returning errors', duration: '9 min',
        description: 'A function returns the result and an error. If nothing went wrong, error is nil (means no error). Always check if err != nil right after calling. It is like checking did this work.',
        code: 'package main\n\nimport (\n    "errors"\n    "fmt"\n)\nfunc divide(a, b int) (int, error) {\n    if b == 0 { return 0, errors.New("divide by zero") }\n    return a / b, nil // nil means no error\n}\nfunc main() {\n    v, err := divide(10, 2)\n    if err != nil { fmt.Println(err); return }\n    fmt.Println(v)\n}',
        expectedOutput: '5',
        hint: 'Try divide(10, 0) and see the error. The if err != nil guard catches it.',
      },
      {
        id: 'm9l2', title: 'Wrapping errors', duration: '9 min',
        description: 'You can add context to an error with fmt.Errorf and %w. It keeps the original error inside like a chain, so you can see the full story: read failed because file not found.',
        code: 'package main\n\nimport "fmt"\nfunc read() error { return fmt.Errorf("read failed: %w", fmt.Errorf("file not found")) }\nfunc main() { fmt.Println(read()) }',
        expectedOutput: 'read failed: file not found',
        hint: '%w wraps, %v just prints. Wrapping lets you check the inner error later.',
      },
      {
        id: 'm9l3', title: 'Exercise: Validate input', duration: '10 min',
        description: 'Check input first. If the name is empty, return an error right away. Otherwise return the greeting and nil error. The caller prints both values: the result and the error (which is nil when ok).',
        code: 'package main\n\nimport (\n    "errors"\n    "fmt"\n)\nfunc greet(name string) (string, error) {\n    if name == "" { return "", errors.New("name required") }\n    return "Hello, " + name, nil\n}\nfunc main() {\n    fmt.Println(greet(""))   // prints error\n    fmt.Println(greet("Go")) // prints greeting\n}',
        expectedOutput: ' name required\nHello, Go <nil>',
        hint: 'First line shows empty string plus error. Second shows greeting plus nil meaning ok.',
      },
    ]
  },
  {
    id: 'm10', title: 'Concurrency', slug: 'concurrency', level: 'Advanced', lessons: 4, duration: '40 min',
    description: 'Do many things at once. Goroutines are light tasks, channels let them talk safely.',
    color: '#3DDC84',
    lessonList: [
      {
        id: 'm10l1', title: 'Starting goroutines', duration: '9 min',
        description: 'go before a function starts it in the background while the current code keeps running. Like asking a friend to do a task while you continue. They run at the same time.',
        code: 'package main\n\nimport (\n    "fmt"\n    "time"\n)\nfunc say(s string) { for i := 0; i < 3; i++ { fmt.Println(s); time.Sleep(10 * time.Millisecond) } }\nfunc main() { go say("gopher"); say("forge") }',
        expectedOutput: 'forge\nforge\nforge',
        hint: 'go say runs in background. If main ends, everything stops. Try adding time.Sleep at end of main.',
      },
      {
        id: 'm10l2', title: 'Talking with channels', duration: '10 min',
        description: 'A channel is a pipe between goroutines. ch <- 42 sends a value in, <-ch takes one out. The receiver waits if nothing is there yet. make(chan int) builds the pipe.',
        code: 'package main\n\nimport "fmt"\nfunc main() {\n    ch := make(chan int)          // make a pipe for integers\n    go func() { ch <- 42 }()      // send 42 through the pipe in background\n    fmt.Println(<-ch)             // wait and receive it\n}',
        expectedOutput: '42',
        hint: 'Send with ch <-, receive with <-ch. Think arrow shows direction of data flow.',
      },
      {
        id: 'm10l3', title: 'Buffered channels', duration: '9 min',
        description: 'A buffered channel has room to hold values without waiting. make(chan int, 2) can hold 2. close says no more will be sent. for range drains the channel until closed.',
        code: 'package main\n\nimport "fmt"\nfunc main() {\n    ch := make(chan int, 2) // hold up to 2 values\n    ch <- 1; ch <- 2; close(ch) // send two, then close\n    for v := range ch { fmt.Println(v) }\n}',
        expectedOutput: '1\n2',
        hint: 'Without close, for range would wait forever. close tells it we are done sending.',
      },
      {
        id: 'm10l4', title: 'Exercise: Pick the ready one', duration: '10 min',
        description: 'select waits for whichever channel is ready first, like answering whichever phone rings. Only one case runs. Here ch1 already has a message, so it wins.',
        code: 'package main\n\nimport "fmt"\nfunc main() {\n    ch1 := make(chan string, 1); ch2 := make(chan string, 1)\n    ch1 <- "from one"\n    select {\n    case m := <-ch1:\n        fmt.Println(m)\n    case m := <-ch2:\n        fmt.Println(m)\n    }\n}',
        expectedOutput: 'from one',
        hint: 'Try putting a value in ch2 instead. Then the other case will run.',
      },
    ]
  },
  {
    id: 'm11', title: 'Packages and Modules', slug: 'packages', level: 'Intermediate', lessons: 3, duration: '28 min',
    description: 'Organize code into packages and control what others can see.',
    color: '#5EB0FF',
    lessonList: [
      {
        id: 'm11l1', title: 'Modules keep track', duration: '8 min',
        description: 'A module is your project. go.mod at the root lists its name and dependencies, like a shopping list. You do not need to write go.mod by hand here, just know it exists.',
        code: 'package main\n\nimport "fmt"\nfunc main() { fmt.Println("module ready") }',
        expectedOutput: 'module ready',
        hint: 'Every new project starts with go mod init. It creates the go.mod file for you.',
      },
      {
        id: 'm11l2', title: 'Public vs private', duration: '8 min',
        description: 'In Go, capital first letter means public (others can use it), lowercase means private (only your package can see it). Like open door vs locked door.',
        code: 'package main\n\nimport "fmt"\ntype User struct{ Name string } // Name is public because capital N\nfunc main() { fmt.Println(User{"Ada"}) }',
        expectedOutput: '{Ada}',
        hint: 'Try changing Name to name (lowercase). You will still see it here, but other packages could not.',
      },
      {
        id: 'm11l3', title: 'Giving imports nicknames', duration: '10 min',
        description: 'If two packages have the same name, you can give one an alias. f "fmt" means use f.Println instead of fmt.Println. Helps avoid name clashes.',
        code: 'package main\n\nimport (\n    "fmt"\n    f "fmt" // nickname f for fmt\n)\nfunc main() { f.Println("aliased"); fmt.Println("normal") }',
        expectedOutput: 'aliased\nnormal',
        hint: 'Alias goes before the path. You can name it anything, like myfmt "fmt".',
      },
    ]
  },
  {
    id: 'm12', title: 'Testing', slug: 'testing', level: 'Advanced', lessons: 3, duration: '30 min',
    description: 'Check your code works automatically. Write small tests that run with one command.',
    color: '#FF7A7A',
    lessonList: [
      {
        id: 'm12l1', title: 'Your first test', duration: '9 min',
        description: 'A test file ends with _test.go and each test starts with Test. t.Errorf reports a failure but keeps running. go test runs all tests. Here we test that 2+3 equals 5.',
        code: 'package main\n\nimport "testing"\nfunc Add(a, b int) int { return a + b }\nfunc TestAdd(t *testing.T) {\n    if Add(2, 3) != 5 { t.Errorf("expected 5") }\n}',
        expectedOutput: 'ok',
        hint: 'On your computer you would run go test -v and see PASS. Here expected output is ok.',
      },
      {
        id: 'm12l2', title: 'Many cases at once', duration: '10 min',
        description: 'Table driven tests check many inputs with one test. You make a list of cases, each with input and expected output, then loop and check each. Saves repeating code.',
        code: 'package main\n\nimport "fmt"\nfunc Add(a,b int) int { return a+b }\nfunc main(){ fmt.Println("table ok") }',
        expectedOutput: 'table ok',
        hint: 'A table is a slice of structs like {a:2,b:3,want:5}. Loop over it and check each.',
      },
      {
        id: 'm12l3', title: 'Measuring speed', duration: '9 min',
        description: 'A benchmark measures speed. It starts with Benchmark and gets *testing.B. b.N is how many times Go will repeat the work. More N means more accurate timing.',
        code: 'package main\n\nimport "testing"\nfunc Fib(n int) int { if n<2 {return n}; return Fib(n-1)+Fib(n-2)}\nfunc BenchmarkFib(b *testing.B){ for i:=0;i<b.N;i++{ Fib(10)} }',
        expectedOutput: 'BenchmarkFib',
        hint: 'Run go test -bench . to see nanoseconds per operation. Useful for finding slow code.',
      },
    ]
  },
  {
    id: 'm13', title: 'JSON and HTTP', slug: 'json-http', level: 'Intermediate', lessons: 4, duration: '36 min',
    description: 'Talk to the internet. Turn Go data into JSON, fetch web pages, and run a tiny server.',
    color: '#FFC145',
    lessonList: [
      {
        id: 'm13l1', title: 'Go to JSON', duration: '8 min',
        description: 'JSON is how apps share data, like {"name":"Ada"}. json.Marshal turns your struct into JSON bytes. The tag `json:"name"` controls the key name. string(b) shows it as text.',
        code: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\ntype User struct { Name string `json:"name"`; Age int `json:"age"` }\nfunc main() {\n    u := User{"Ada", 30}\n    b, _ := json.Marshal(u) // turn struct into JSON\n    fmt.Println(string(b))\n}',
        expectedOutput: '{"name":"Ada","age":30}',
        hint: 'json:"name" makes the JSON key lowercase. Without it the key would be "Name".',
      },
      {
        id: 'm13l2', title: 'Tiny web server', duration: '9 min',
        description: 'net/http can run a server in a few lines. HandleFunc says when someone visits /, run this function. w is where you write the reply.',
        code: 'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\nfunc handler(w http.ResponseWriter, r *http.Request){ fmt.Fprint(w,"hello forge")}\nfunc main(){ http.HandleFunc("/", handler); fmt.Println("listen :8080")}',
        expectedOutput: 'listen :8080',
        hint: 'Fprint writes to the browser instead of the console. r holds info about the request.',
      },
      {
        id: 'm13l3', title: 'Fetching a page', duration: '8 min',
        description: 'http.Get downloads a page like a browser. It returns a response with Status like "200 OK" meaning success. In real code you should close the body after, but we keep it simple here.',
        code: 'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\nfunc main(){\n    resp,_:=http.Get("https://example.com")\n    fmt.Println(resp.Status)\n}',
        expectedOutput: '200 OK',
        hint: '200 means success, 404 means not found. Try printing resp.Header too.',
      },
      {
        id: 'm13l4', title: 'JSON to Go', duration: '9 min',
        description: 'Unmarshal does the reverse: JSON text into your struct. You pass &u (address of u) so it can fill the struct. Backticks ` ` let you write JSON easily.',
        code: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\ntype User struct{ Name string `json:"name"`}\nfunc main(){\n    data:=`{"name":"Gopher"}`\n    var u User\n    json.Unmarshal([]byte(data), &u) // fill u from JSON\n    fmt.Println(u.Name)\n}',
        expectedOutput: 'Gopher',
        hint: '&u means give the address so Unmarshal can write into it. Without &, nothing changes.',
      },
    ]
  },
  {
    id: 'm14', title: 'Generics', slug: 'generics', level: 'Advanced', lessons: 3, duration: '30 min',
    description: 'Write one function that works with many types. Like a universal tool.',
    color: '#3DDC84',
    lessonList: [
      {
        id: 'm14l1', title: 'One function many types', duration: '9 min',
        description: '[T any] means T can be any type. first returns the first item, whether the list holds numbers or text. You write it once, use it for everything.',
        code: 'package main\n\nimport "fmt"\nfunc first[T any](s []T) T { return s[0] }\nfunc main() {\n    fmt.Println(first([]int{10, 20}))\n    fmt.Println(first([]string{"a", "b"}))\n}',
        expectedOutput: '10\na',
        hint: 'T any is the broadest. You could also say T string to only allow text.',
      },
      {
        id: 'm14l2', title: 'Limiting the types', duration: '9 min',
        description: 'Sometimes you need to limit T. int64 | float64 means T can be either, so + works. Without the limit, Go would not know if + is allowed.',
        code: 'package main\n\nimport "fmt"\nfunc sum[T int64 | float64](vals []T) T { var s T; for _, v := range vals { s += v }; return s }\nfunc main(){ fmt.Println(sum([]int64{1,2,3})); fmt.Println(sum([]float64{1.5,2.5})) }',
        expectedOutput: '6\n4',
        hint: 'Try calling sum with []string. It will fail because string is not in the allowed list.',
      },
      {
        id: 'm14l3', title: 'Exercise: Generic Map', duration: '9 min',
        description: 'Map takes a list of T and a function from T to U, returns a list of U. It transforms each item. Here we double each number. T in, U out.',
        code: 'package main\n\nimport "fmt"\nfunc Map[T, U any](s []T, f func(T) U) []U { r:=make([]U,len(s)); for i,v:=range s{ r[i]=f(v)}; return r }\nfunc main(){ fmt.Println(Map([]int{1,2,3}, func(n int) int { return n*2 })) }',
        expectedOutput: '[2 4 6]',
        hint: 'Map works like translate. Give it numbers and a double function, get doubled numbers.',
      },
    ]
  },
  {
    id: 'm15', title: 'Files and IO', slug: 'files', level: 'Intermediate', lessons: 3, duration: '28 min',
    description: 'Save and read files, and stream data piece by piece.',
    color: '#5EB0FF',
    lessonList: [
      {
        id: 'm15l1', title: 'Writing and reading files', duration: '9 min',
        description: 'os.WriteFile writes text to a file, os.ReadFile reads it back. 0644 is permission meaning you can read/write, others can only read. Like saving a note to disk.',
        code: 'package main\n\nimport (\n    "fmt"\n    "os"\n)\nfunc main(){\n    os.WriteFile("/tmp/forge.txt", []byte("hello forge"), 0644)\n    b,_:=os.ReadFile("/tmp/forge.txt")\n    fmt.Println(string(b))\n}',
        expectedOutput: 'hello forge',
        hint: '[]byte("hello") turns text into bytes that WriteFile needs. string(b) turns it back.',
      },
      {
        id: 'm15l2', title: 'Streaming data', duration: '8 min',
        description: 'A Reader lets you read bit by bit instead of all at once. Useful for large data. We make a reader from text, then Read 6 bytes into a buffer and print them.',
        code: 'package main\n\nimport (\n    "fmt"\n    "strings"\n)\nfunc main(){\n    r:=strings.NewReader("gopher forge")\n    buf:=make([]byte,6) // space for 6 bytes\n    r.Read(buf)         // fill the buffer\n    fmt.Println(string(buf))\n}',
        expectedOutput: 'gopher',
        hint: 'Change 6 to 12 and you will get "gopher forge". Buffer size controls how much you read.',
      },
      {
        id: 'm15l3', title: 'Exercise: Count lines', duration: '9 min',
        description: 'Every line ends with \\n. Counting \\n counts the lines. strings.Count does it for you.',
        code: 'package main\n\nimport (\n    "fmt"\n    "strings"\n)\nfunc main(){\n    s:="a\\nb\\nc\\n"\n    fmt.Println(strings.Count(s, "\\n"))\n}',
        expectedOutput: '3',
        hint: 'Try s:="one\\ntwo" and count again. You will get 1 newline, meaning 2 lines of content.',
      },
    ]
  },
];
