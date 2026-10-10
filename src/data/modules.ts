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
    id: 'm1', title: 'Hello, Gopher', slug: 'hello', level: 'Beginner', lessons: 4, duration: '25 min',
    description: 'Your first Go program. Packages, imports, and printing.',
    color: '#FFC145',
    lessonList: [
      { id: 'm1l1', title: 'Your first program', duration: '5 min', description: 'Every Go program starts with package main and func main. Print Hello, Gopher to the console.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, Gopher!")\n}', expectedOutput: 'Hello, Gopher!', hint: 'fmt.Println prints a line. String in double quotes.' },
      { id: 'm1l2', title: 'Imports and fmt', duration: '6 min', description: 'Learn how import works and try Printf for formatted output.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    name := "Forge"\n    fmt.Printf("Hello, %s! You are writing Go.\\n", name)\n}', expectedOutput: 'Hello, Forge! You are writing Go.', hint: 'Printf uses %s for strings.' },
      { id: 'm1l3', title: 'Comments', duration: '6 min', description: 'Single line and block comments.', code: 'package main\n\nimport "fmt"\n\n// main is the entry point\nfunc main() {\n    /* Print a greeting */\n    fmt.Println("Gopher Forge ready")\n}', expectedOutput: 'Gopher Forge ready', hint: '// single line, /* */ block.' },
      { id: 'm1l4', title: 'Exercise: Greeting', duration: '8 min', description: 'Build a greeting from two strings.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    first := "Gopher"\n    second := "Forge"\n    fmt.Println(first + " " + second)\n}', expectedOutput: 'Gopher Forge', hint: 'Use + to join strings.' },
    ]
  },
  {
    id: 'm2', title: 'Variables and Types', slug: 'variables', level: 'Beginner', lessons: 5, duration: '35 min',
    description: 'Declare, infer, and convert. Statically typed but friendly.',
    color: '#3DDC84',
    lessonList: [
      { id: 'm2l1', title: 'var and :=', duration: '6 min', description: 'Two ways to declare variables.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var language string = "Go"\n    version := 1.22\n    fmt.Printf("%s %.2f\\n", language, version)\n}', expectedOutput: 'Go 1.22', hint: ':= infers type.' },
      { id: 'm2l2', title: 'Zero values', duration: '6 min', description: 'Every type has a zero value.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var a int\n    var b string\n    var c bool\n    fmt.Printf("%d %q %t\\n", a, b, c)\n}', expectedOutput: '0 "" false', hint: '%d int, %q quoted, %t bool.' },
      { id: 'm2l3', title: 'Constants', duration: '5 min', description: 'Constants never change.', code: 'package main\n\nimport "fmt"\n\nconst Pi = 3.14159\n\nfunc main() {\n    fmt.Println(Pi * 2)\n}', expectedOutput: '6.28318', hint: 'const outside or inside func.' },
      { id: 'm2l4', title: 'Conversions', duration: '8 min', description: 'Explicit conversion only.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    x := 42\n    y := float64(x)\n    fmt.Printf("%T %.1f\\n", y, y)\n}', expectedOutput: 'float64 42.0', hint: 'Type(value) to convert.' },
      { id: 'm2l5', title: 'Exercise: Swap', duration: '10 min', description: 'Swap two variables.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    a, b := 10, 20\n    a, b = b, a\n    fmt.Println(a, b)\n}', expectedOutput: '20 10', hint: 'a, b = b, a swaps.' },
    ]
  },
  {
    id: 'm3', title: 'Control Flow', slug: 'control', level: 'Beginner', lessons: 4, duration: '30 min',
    description: 'if, for, switch. No while needed.',
    color: '#5EB0FF',
    lessonList: [
      { id: 'm3l1', title: 'if and else', duration: '7 min', description: 'No parens, braces required.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    score := 85\n    if score >= 80 {\n        fmt.Println("Pass")\n    } else {\n        fmt.Println("Retry")\n    }\n}', expectedOutput: 'Pass', hint: 'Braces always required.' },
      { id: 'm3l2', title: 'for loop', duration: '8 min', description: 'for does everything.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 0; i < 3; i++ {\n        fmt.Println(i)\n    }\n}', expectedOutput: '0\n1\n2', hint: 'for init; condition; post' },
      { id: 'm3l3', title: 'switch', duration: '7 min', description: 'No break needed.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    lang := "Go"\n    switch lang {\n    case "Go":\n        fmt.Println("Gopher!")\n    case "Rust":\n        fmt.Println("Crab!")\n    default:\n        fmt.Println("Hello")\n    }\n}', expectedOutput: 'Gopher!', hint: 'Only matching case runs.' },
      { id: 'm3l4', title: 'Exercise: Fizz', duration: '8 min', description: 'Print Fizz if divisible by 3.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    for i := 1; i <= 5; i++ {\n        if i%3 == 0 {\n            fmt.Println("Fizz")\n        } else {\n            fmt.Println(i)\n        }\n    }\n}', expectedOutput: '1\n2\nFizz\n4\n5', hint: 'i%3 == 0 check.' },
    ]
  },
  {
    id: 'm4', title: 'Functions', slug: 'functions', level: 'Beginner', lessons: 4, duration: '32 min',
    description: 'Multiple returns and defer.',
    color: '#FF7A7A',
    lessonList: [
      { id: 'm4l1', title: 'Defining functions', duration: '7 min', description: 'func name(params) returnType.', code: 'package main\n\nimport "fmt"\n\nfunc greet(name string) string {\n    return "Hello, " + name\n}\n\nfunc main() {\n    fmt.Println(greet("Tobi"))\n}', expectedOutput: 'Hello, Tobi', hint: 'Return type after params.' },
      { id: 'm4l2', title: 'Multiple returns', duration: '8 min', description: 'Return many values.', code: 'package main\n\nimport "fmt"\n\nfunc split(sum int) (int, int) {\n    return sum * 4 / 9, sum - sum*4/9\n}\n\nfunc main() {\n    x, y := split(17)\n    fmt.Println(x, y)\n}', expectedOutput: '7 10', hint: 'x, y := func()' },
      { id: 'm4l3', title: 'Defer', duration: '8 min', description: 'Runs when function returns.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    defer fmt.Println("done")\n    fmt.Println("working")\n}', expectedOutput: 'working\ndone', hint: 'LIFO if many defers.' },
      { id: 'm4l4', title: 'Exercise: Variadic', duration: '9 min', description: 'Sum any number of ints.', code: 'package main\n\nimport "fmt"\n\nfunc sum(nums ...int) int {\n    total := 0\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\nfunc main() {\n    fmt.Println(sum(1, 2, 3, 4))\n}', expectedOutput: '10', hint: '...int is variadic.' },
    ]
  },
  {
    id: 'm5', title: 'Arrays, Slices, Maps', slug: 'collections', level: 'Beginner', lessons: 5, duration: '40 min',
    description: 'The three collections you use daily.',
    color: '#FFC145',
    lessonList: [
      { id: 'm5l1', title: 'Arrays', duration: '6 min', description: 'Fixed size.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    var a [2]string\n    a[0] = "hello"\n    a[1] = "forge"\n    fmt.Println(a)\n}', expectedOutput: '[hello forge]', hint: '[2]string vs [3]string different types.' },
      { id: 'm5l2', title: 'Slices', duration: '9 min', description: 'Dynamic views over arrays.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    s := []int{1, 2, 3}\n    s = append(s, 4, 5)\n    fmt.Println(s, len(s))\n}', expectedOutput: '[1 2 3 4 5] 5', hint: 'append grows.' },
      { id: 'm5l3', title: 'Slice tricks', duration: '8 min', description: 's[low:high]', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    s := []int{0, 1, 2, 3, 4}\n    fmt.Println(s[1:4])\n}', expectedOutput: '[1 2 3]', hint: 'Includes low, excludes high.' },
      { id: 'm5l4', title: 'Maps', duration: '8 min', description: 'Dictionaries.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    m := map[string]int{"go": 1, "rust": 2}\n    m["zig"] = 3\n    fmt.Println(m["go"], len(m))\n}', expectedOutput: '1 3', hint: 'Missing key gives zero value.' },
      { id: 'm5l5', title: 'Exercise: Word count', duration: '9 min', description: 'Count words.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    words := []string{"go", "go", "forge", "go"}\n    count := make(map[string]int)\n    for _, w := range words {\n        count[w]++\n    }\n    fmt.Println(count["go"], count["forge"])\n}', expectedOutput: '3 1', hint: 'Range and increment.' },
    ]
  },
  {
    id: 'm6', title: 'Structs and Methods', slug: 'structs', level: 'Intermediate', lessons: 4, duration: '35 min',
    description: 'Structs plus methods.',
    color: '#3DDC84',
    lessonList: [
      { id: 'm6l1', title: 'Structs', duration: '7 min', description: 'Group fields.', code: 'package main\n\nimport "fmt"\n\ntype Gopher struct {\n    Name string\n    Age  int\n}\n\nfunc main() {\n    g := Gopher{Name: "Go", Age: 15}\n    fmt.Printf("%s is %d\\n", g.Name, g.Age)\n}', expectedOutput: 'Go is 15', hint: 'Dot access.' },
      { id: 'm6l2', title: 'Methods', duration: '9 min', description: 'Attach funcs to types.', code: 'package main\n\nimport "fmt"\n\ntype Rect struct{ W, H int }\n\nfunc (r Rect) Area() int { return r.W * r.H }\n\nfunc main() {\n    fmt.Println(Rect{3, 4}.Area())\n}', expectedOutput: '12', hint: '(r Rect) receiver.' },
      { id: 'm6l3', title: 'Pointer receiver', duration: '9 min', description: 'Mutate via pointer.', code: 'package main\n\nimport "fmt"\n\ntype Counter struct{ N int }\n\nfunc (c *Counter) Inc() { c.N++ }\n\nfunc main() {\n    c := Counter{}\n    c.Inc()\n    c.Inc()\n    fmt.Println(c.N)\n}', expectedOutput: '2', hint: '*Counter can change original.' },
      { id: 'm6l4', title: 'Exercise: User', duration: '10 min', description: 'User with greeting.', code: 'package main\n\nimport "fmt"\n\ntype User struct{ Name string }\n\nfunc (u User) Greet() string { return "Hi, " + u.Name }\n\nfunc main() {\n    fmt.Println(User{"Ada"}.Greet())\n}', expectedOutput: 'Hi, Ada', hint: 'Define type then method.' },
    ]
  },
  {
    id: 'm7', title: 'Pointers', slug: 'pointers', level: 'Intermediate', lessons: 3, duration: '25 min',
    description: 'Addresses and dereference.',
    color: '#5EB0FF',
    lessonList: [
      { id: 'm7l1', title: '& and *', duration: '8 min', description: 'Address and value.', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    x := 10\n    p := &x\n    *p = 20\n    fmt.Println(x, *p)\n}', expectedOutput: '20 20', hint: '& address, * value.' },
      { id: 'm7l2', title: 'Pointers as params', duration: '8 min', description: 'Modify outside.', code: 'package main\n\nimport "fmt"\n\nfunc double(n *int) { *n *= 2 }\n\nfunc main() {\n    x := 5\n    double(&x)\n    fmt.Println(x)\n}', expectedOutput: '10', hint: 'Takes *int, call with &x.' },
      { id: 'm7l3', title: 'Exercise: Swap', duration: '9 min', description: 'Swap via pointers.', code: 'package main\n\nimport "fmt"\n\nfunc swap(a, b *int) { *a, *b = *b, *a }\n\nfunc main() {\n    x, y := 1, 2\n    swap(&x, &y)\n    fmt.Println(x, y)\n}', expectedOutput: '2 1', hint: 'Dereference both.' },
    ]
  },
  {
    id: 'm8', title: 'Interfaces', slug: 'interfaces', level: 'Intermediate', lessons: 3, duration: '28 min',
    description: 'Implicit. Duck typing done right.',
    color: '#FF7A7A',
    lessonList: [
      { id: 'm8l1', title: 'Implicit', duration: '9 min', description: 'No implements keyword.', code: 'package main\n\nimport "fmt"\n\ntype Speaker interface{ Speak() string }\ntype Dog struct{}\nfunc (d Dog) Speak() string { return "woof" }\nfunc say(s Speaker) { fmt.Println(s.Speak()) }\nfunc main() { say(Dog{}) }', expectedOutput: 'woof', hint: 'Has method, implements.' },
      { id: 'm8l2', title: 'Type switch', duration: '10 min', description: 'interface{} holds anything.', code: 'package main\n\nimport "fmt"\n\nfunc describe(i interface{}) {\n    switch v := i.(type) {\n    case int:\n        fmt.Printf("int %d\\n", v)\n    case string:\n        fmt.Printf("string %s\\n", v)\n    default:\n        fmt.Printf("unknown %T\\n", v)\n    }\n}\nfunc main() { describe("hello"); describe(42) }', expectedOutput: 'string hello\nint 42', hint: 'i.(type) in switch only.' },
      { id: 'm8l3', title: 'Exercise: Shape', duration: '9 min', description: 'One interface, two shapes.', code: 'package main\n\nimport "fmt"\n\ntype Area interface{ Area() float64 }\ntype Square struct{ S float64 }\nfunc (s Square) Area() float64 { return s.S * s.S }\nfunc main() { var a Area = Square{4}; fmt.Println(a.Area()) }', expectedOutput: '16', hint: 'Assign concrete to interface.' },
    ]
  },
  {
    id: 'm9', title: 'Error Handling', slug: 'errors', level: 'Intermediate', lessons: 3, duration: '26 min',
    description: 'Errors are values.',
    color: '#FFC145',
    lessonList: [
      { id: 'm9l1', title: 'error type', duration: '8 min', description: 'Return error second.', code: 'package main\n\nimport (\n    "errors"\n    "fmt"\n)\nfunc divide(a, b int) (int, error) {\n    if b == 0 { return 0, errors.New("divide by zero") }\n    return a / b, nil\n}\nfunc main() {\n    v, err := divide(10, 2)\n    if err != nil { fmt.Println(err); return }\n    fmt.Println(v)\n}', expectedOutput: '5', hint: 'Check err != nil.' },
      { id: 'm9l2', title: 'Wrapping', duration: '9 min', description: 'fmt.Errorf with %w.', code: 'package main\n\nimport "fmt"\nfunc read() error { return fmt.Errorf("read failed: %w", fmt.Errorf("file not found")) }\nfunc main() { fmt.Println(read()) }', expectedOutput: 'read failed: file not found', hint: '%w preserves chain.' },
      { id: 'm9l3', title: 'Exercise: Validate', duration: '9 min', description: 'Error if empty.', code: 'package main\n\nimport (\n    "errors"\n    "fmt"\n)\nfunc greet(name string) (string, error) {\n    if name == "" { return "", errors.New("name required") }\n    return "Hello, " + name, nil\n}\nfunc main() {\n    fmt.Println(greet(""))\n    fmt.Println(greet("Go"))\n}', expectedOutput: ' name required\nHello, Go <nil>', hint: 'Return zero + error.' },
    ]
  },
  {
    id: 'm10', title: 'Concurrency', slug: 'concurrency', level: 'Advanced', lessons: 4, duration: '38 min',
    description: 'Goroutines and channels.',
    color: '#3DDC84',
    lessonList: [
      { id: 'm10l1', title: 'Goroutines', duration: '9 min', description: 'go launches.', code: 'package main\n\nimport (\n    "fmt"\n    "time"\n)\nfunc say(s string) { for i := 0; i < 3; i++ { fmt.Println(s); time.Sleep(10 * time.Millisecond) } }\nfunc main() { go say("gopher"); say("forge") }', expectedOutput: 'forge\nforge\nforge', hint: 'go func() runs concurrently.' },
      { id: 'm10l2', title: 'Channels', duration: '10 min', description: 'Connect goroutines.', code: 'package main\n\nimport "fmt"\nfunc main() {\n    ch := make(chan int)\n    go func() { ch <- 42 }()\n    fmt.Println(<-ch)\n}', expectedOutput: '42', hint: 'ch <- 42 sends, <-ch receives.' },
      { id: 'm10l3', title: 'Buffered', duration: '9 min', description: 'Capacity and close.', code: 'package main\n\nimport "fmt"\nfunc main() {\n    ch := make(chan int, 2)\n    ch <- 1; ch <- 2; close(ch)\n    for v := range ch { fmt.Println(v) }\n}', expectedOutput: '1\n2', hint: 'Range until close.' },
      { id: 'm10l4', title: 'Exercise: Select', duration: '10 min', description: 'Wait on many channels.', code: 'package main\n\nimport "fmt"\nfunc main() {\n    ch1 := make(chan string, 1); ch2 := make(chan string, 1)\n    ch1 <- "from one"\n    select {\n    case m := <-ch1:\n        fmt.Println(m)\n    case m := <-ch2:\n        fmt.Println(m)\n    }\n}', expectedOutput: 'from one', hint: 'Picks ready case.' },
    ]
  },
  {
    id: 'm11', title: 'Packages and Modules', slug: 'packages', level: 'Intermediate', lessons: 3, duration: '26 min',
    description: 'go mod and visibility.',
    color: '#5EB0FF',
    lessonList: [
      { id: 'm11l1', title: 'go mod', duration: '8 min', description: 'Track deps.', code: 'package main\n\nimport "fmt"\nfunc main() { fmt.Println("module ready") }', expectedOutput: 'module ready', hint: 'go.mod at root.' },
      { id: 'm11l2', title: 'Exported names', duration: '8 min', description: 'Capitalized is public.', code: 'package main\n\nimport "fmt"\ntype User struct{ Name string }\nfunc main() { fmt.Println(User{"Ada"}) }', expectedOutput: '{Ada}', hint: 'Capital vs lowercase.' },
      { id: 'm11l3', title: 'Import alias', duration: '10 min', description: 'Avoid clash.', code: 'package main\n\nimport (\n    "fmt"\n    f "fmt"\n)\nfunc main() { f.Println("aliased"); fmt.Println("normal") }', expectedOutput: 'aliased\nnormal', hint: 'alias before path.' },
    ]
  },
  {
    id: 'm12', title: 'Testing', slug: 'testing', level: 'Advanced', lessons: 3, duration: '28 min',
    description: 'testing package and table tests.',
    color: '#FF7A7A',
    lessonList: [
      { id: 'm12l1', title: 'First test', duration: '9 min', description: '_test.go and TestXxx.', code: 'package main\n\nimport "testing"\nfunc Add(a, b int) int { return a + b }\nfunc TestAdd(t *testing.T) {\n    if Add(2, 3) != 5 { t.Errorf("expected 5") }\n}', expectedOutput: 'ok', hint: 'go test -v' },
      { id: 'm12l2', title: 'Table driven', duration: '10 min', description: 'Many cases, one test.', code: 'package main\n\nimport "fmt"\nfunc Add(a,b int) int { return a+b }\nfunc main(){ fmt.Println("table ok") }', expectedOutput: 'table ok', hint: 'Slice of structs.' },
      { id: 'm12l3', title: 'Benchmark', duration: '9 min', description: 'BenchmarkXxx.', code: 'package main\n\nimport "testing"\nfunc Fib(n int) int { if n<2 {return n}; return Fib(n-1)+Fib(n-2)}\nfunc BenchmarkFib(b *testing.B){ for i:=0;i<b.N;i++{ Fib(10)} }', expectedOutput: 'BenchmarkFib', hint: 'b.N auto tuned.' },
    ]
  },
  {
    id: 'm13', title: 'JSON and HTTP', slug: 'json-http', level: 'Intermediate', lessons: 4, duration: '34 min',
    description: 'Encode, request, serve.',
    color: '#FFC145',
    lessonList: [
      { id: 'm13l1', title: 'JSON marshal', duration: '8 min', description: 'Struct to JSON.', code: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\ntype User struct { Name string `json:"name"`; Age int `json:"age"` }\nfunc main() {\n    u := User{"Ada", 30}\n    b, _ := json.Marshal(u)\n    fmt.Println(string(b))\n}', expectedOutput: '{"name":"Ada","age":30}', hint: 'Tag controls key.' },
      { id: 'm13l2', title: 'HTTP server', duration: '9 min', description: 'net/http in lines.', code: 'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\nfunc handler(w http.ResponseWriter, r *http.Request){ fmt.Fprint(w,"hello forge")}\nfunc main(){ http.HandleFunc("/", handler); fmt.Println("listen :8080")}', expectedOutput: 'listen :8080', hint: 'HandleFunc registers.' },
      { id: 'm13l3', title: 'HTTP client', duration: '8 min', description: 'http.Get', code: 'package main\n\nimport (\n    "fmt"\n    "net/http"\n)\nfunc main(){\n    resp,_:=http.Get("https://example.com")\n    fmt.Println(resp.Status)\n}', expectedOutput: '200 OK', hint: 'Defer Body.Close() in real code.' },
      { id: 'm13l4', title: 'Decode JSON', duration: '9 min', description: 'JSON to struct.', code: 'package main\n\nimport (\n    "encoding/json"\n    "fmt"\n)\ntype User struct{ Name string `json:"name"`}\nfunc main(){\n    data:=`+"`"+`{"name":"Gopher"}`+"`"+`\n    var u User\n    json.Unmarshal([]byte(data), &u)\n    fmt.Println(u.Name)\n}', expectedOutput: 'Gopher', hint: 'Pass &u pointer.' },
    ]
  },
  {
    id: 'm14', title: 'Generics', slug: 'generics', level: 'Advanced', lessons: 3, duration: '27 min',
    description: 'Type params since 1.18.',
    color: '#3DDC84',
    lessonList: [
      { id: 'm14l1', title: 'Generic func', duration: '9 min', description: 'func Foo[T any](v T) T', code: 'package main\n\nimport "fmt"\nfunc first[T any](s []T) T { return s[0] }\nfunc main() {\n    fmt.Println(first([]int{10, 20}))\n    fmt.Println(first([]string{"a", "b"}))\n}', expectedOutput: '10\na', hint: 'T any means any type.' },
      { id: 'm14l2', title: 'Constraints', duration: '9 min', description: 'Limit T.', code: 'package main\n\nimport "fmt"\nfunc sum[T int64 | float64](vals []T) T { var s T; for _, v := range vals { s += v }; return s }\nfunc main(){ fmt.Println(sum([]int64{1,2,3})); fmt.Println(sum([]float64{1.5,2.5})) }', expectedOutput: '6\n4', hint: 'T int64 | float64 allows +' },
      { id: 'm14l3', title: 'Exercise: Map', duration: '9 min', description: 'Generic Map.', code: 'package main\n\nimport "fmt"\nfunc Map[T, U any](s []T, f func(T) U) []U { r:=make([]U,len(s)); for i,v:=range s{ r[i]=f(v)}; return r }\nfunc main(){ fmt.Println(Map([]int{1,2,3}, func(n int) int { return n*2 })) }', expectedOutput: '[2 4 6]', hint: 'T in, U out.' },
    ]
  },
  {
    id: 'm15', title: 'Files and IO', slug: 'files', level: 'Intermediate', lessons: 3, duration: '26 min',
    description: 'Read, write, stream.',
    color: '#5EB0FF',
    lessonList: [
      { id: 'm15l1', title: 'Write and read', duration: '9 min', description: 'WriteFile and ReadFile.', code: 'package main\n\nimport (\n    "fmt"\n    "os"\n)\nfunc main(){\n    os.WriteFile("/tmp/forge.txt", []byte("hello forge"), 0644)\n    b,_:=os.ReadFile("/tmp/forge.txt")\n    fmt.Println(string(b))\n}', expectedOutput: 'hello forge', hint: '0644 permission.' },
      { id: 'm15l2', title: 'io.Reader', duration: '8 min', description: 'Stream data.', code: 'package main\n\nimport (\n    "fmt"\n    "strings"\n)\nfunc main(){\n    r:=strings.NewReader("gopher forge")\n    buf:=make([]byte,6)\n    r.Read(buf)\n    fmt.Println(string(buf))\n}', expectedOutput: 'gopher', hint: 'Read fills buffer.' },
      { id: 'm15l3', title: 'Exercise: Count', duration: '9 min', description: 'Count lines.', code: 'package main\n\nimport (\n    "fmt"\n    "strings"\n)\nfunc main(){\n    s:="a\nb\nc\n"\n    fmt.Println(strings.Count(s, "\n"))\n}', expectedOutput: '3', hint: 'strings.Count.' },
    ]
  },
];
