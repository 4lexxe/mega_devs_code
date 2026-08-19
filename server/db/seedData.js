/**
 * MEGA DEVs - Semilla inicial con currículum completo:
 * 1. POO Básica (Clases, Atributos, Encapsulamiento, Métodos)
 * 2. POO Avanzada (Métodos de cálculo, Estado interno)
 * 3. ARREGLOS (3 Básicos, 3 Medios, 3 Avanzados de Exámenes)
 * 4. ArrayList (Colecciones dinámicas y búsquedas)
 * 5. Pilas Stack (Ordenados rigurosamente por nivel: Fácil -> Medio -> Difícil)
 */

const STACK_JAVA_CODE = `public class Stack<ELEMENT> {
    private final static Integer defaulDimension = 20;

    private ELEMENT[] data;
    private Integer count;

    public Stack() {
        this(Stack.defaulDimension);
    }

    public Stack(Integer dimension) {
        if (dimension <= 0) {
            throw new RuntimeException("La cantidad de elementos en la pila debe ser positiva");
        }
        this.data = (ELEMENT[]) new Object[dimension];
        this.count = 0;
    }

    public boolean empty() {
        return this.count <= 0;
    }

    public ELEMENT peek() {
        if (this.empty()) {
            throw new RuntimeException("La pila está vacía...");
        }
        return this.data[this.count - 1];
    }

    public ELEMENT pop() {
        if (this.empty()) {
            throw new RuntimeException("La pila está vacía...");
        }
        --this.count;
        return this.data[this.count];
    }

    public ELEMENT push(ELEMENT element) {
        if (this.size() >= this.data.length) {
            ELEMENT[] temp = (ELEMENT[]) new Object[this.data.length * 2];
            for (int i = 0; i < this.data.length; ++i) {
                temp[i] = this.data[i];
            }
            this.data = temp;
        }
        this.data[this.count] = element;
        ++this.count;
        return element;
    }

    public int search(Object object) {
        for (int pos = this.count - 1; pos >= 0; --pos) {
            if (this.data[pos].equals(object)) {
                return this.count - pos;
            }
        }
        return -1;
    }

    public int size() {
        return this.count;
    }

    @Override
    public String toString() {
        if (this.size() <= 0) {
            return "";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("[" + this.data[0].toString());
        for (int i = 1; i < this.size(); ++i) {
            sb.append(", " + this.data[i].toString());
        }
        sb.append("]");
        return sb.toString();
    }
}`;


export const INITIAL_PROBLEMS = [
    // --- MÓDULO 0: ADAPTACIÓN AL EDITOR Y ENTORNOS DE PROGRAMACIÓN ---
    {
        id: "ED01_INTRO",
        title: "Primeros Pasos: Mi Primer Hola Mundo y Uso del Editor",
        difficulty: "Fácil",
        points: 100,
        category: "EDITOR -> INTRO",
        sectionTitle: "Módulo 0: Adaptación al Editor y Entorno",
        track: "Uso del Editor y Fundamentos",
        language: "python",
        timeLimit: 1,
        memoryLimit: 32,
        description: "¡Bienvenido a MEGA DEVS!\n\nEste primer ejercicio está diseñado para que te adaptes a usar el **Editor de Código** y la **Terminal de Ejecución**.\n\n### 🛠️ ¿Cómo usar la interfaz?\n1. **A la derecha** tienes el **Editor Monaco** donde puedes escribir y modificar tu código.\n2. Debajo del editor encontrarás los botones **`Ejecutar Código`** y **`Enviar Solución`**.\n   - **`Ejecutar Código`**: Ejecuta tu código de prueba usando los datos de la pestaña *Entrada Personalizada*.\n   - **`Enviar Solución`**: Evalúa automáticamente tu código contra todos los casos de prueba y te otorga puntaje.\n\n### 🎯 Tu Misión:\nModifica o mantén el código inicial para que imprima exactamente el siguiente texto:\n`¡Hola, Mundo desde MEGA DEVS!`",
        inputDesc: "No requiere datos de entrada.",
        outputDesc: "Imprimir exactamente: `¡Hola, Mundo desde MEGA DEVS!`",
        constraints: ["Ninguna"],
        hints: [
            { title: "Sintaxis en Python", content: "Usa `print(\"¡Hola, Mundo desde MEGA DEVS!\")` para mostrar el texto en pantalla." },
            { title: "Probar el Editor", content: "Presiona el botón verde 'Enviar Solución' cuando el texto esté listo." }
        ],
        examples: [{ input: "", output: "¡Hola, Mundo desde MEGA DEVS!" }],
        testcases: [{ input: "", expectedOutput: "¡Hola, Mundo desde MEGA DEVS!", isSample: true }],
        starterCode: `# Escribe tu solución en Python aquí
`
    },
    {
        id: "ED02_ENTRADA",
        title: "Uso del Editor: Lectura de Datos y Consola Personalizada",
        difficulty: "Fácil",
        points: 100,
        category: "EDITOR -> INTRO",
        sectionTitle: "Módulo 0: Adaptación al Editor y Entorno",
        track: "Uso del Editor y Fundamentos",
        language: "python",
        timeLimit: 1,
        memoryLimit: 32,
        description: "En este ejercicio aprenderás a interactuar con la **Entrada Personalizada** en la terminal del editor.\n\n### 💡 ¿Cómo funciona la Entrada?\n- Cuando un programa solicita datos (por ejemplo, con `input()` en Python o `Scanner` en Java), el editor lee la información provista en la consola.\n- Puedes escribir datos de prueba en la pestaña **Entrada Personalizada** antes de hacer clic en **`Ejecutar Código`**.\n\n### 🎯 Tu Misión:\nLee un nombre $S$ desde la entrada estándar e imprime un saludo en el siguiente formato:\n`Bienvenido al editor, <S>!`",
        inputDesc: "Una línea que contiene el nombre $S$.",
        outputDesc: "Un saludo con la estructura `Bienvenido al editor, <S>!`.",
        constraints: ["1 <= longitud de S <= 50"],
        hints: [
            { title: "Lectura en Python", content: "Usa `nombre = input().strip()` para leer la línea de entrada." },
            { title: "Formateo f-string", content: "Puedes usar `print(f\"Bienvenido al editor, {nombre}!\")`." }
        ],
        examples: [{ input: "Alex", output: "Bienvenido al editor, Alex!" }],
        testcases: [
            { input: "Alex", expectedOutput: "Bienvenido al editor, Alex!", isSample: true },
            { input: "Estudiante", expectedOutput: "Bienvenido al editor, Estudiante!", isSample: false }
        ],
        starterCode: `# Escribe tu solución en Python aquí
`
    },

    // --- MÓDULO PYTHON: FUNDAMENTOS BÁSICOS ---
    {
        id: "PY01_SUMA",
        title: "Python Básico: Suma de Dos Números Enteros",
        difficulty: "Fácil",
        points: 100,
        category: "PYTHON -> BASICO",
        sectionTitle: "Módulo Python: Fundamentos de Programación",
        track: "Fundamentos en Python",
        language: "python",
        timeLimit: 1,
        memoryLimit: 32,
        description: "En Python, la lectura de datos mediante `input()` o `sys.stdin.read()` retorna texto (strings). Para realizar operaciones matemáticas, debemos convertir ese texto a entero con `int()`.\n\n### 🎯 Tu Misión:\nDados dos números enteros $A$ y $B$, calcula e imprime la suma en el formato `Suma: <resultado>`.",
        inputDesc: "Dos enteros $A$ y $B$, cada uno en su propia línea.",
        outputDesc: "Imprimir `Suma: <A + B>`.",
        constraints: ["-1000 <= A, B <= 1000"],
        hints: [
            { title: "Lectura Múltiple", content: "Usa `import sys` y `sys.stdin.read().split()` para obtener todos los números de la entrada fácilmente." }
        ],
        examples: [{ input: "5\n7", output: "Suma: 12" }],
        testcases: [
            { input: "5\n7", expectedOutput: "Suma: 12", isSample: true },
            { input: "100\n250", expectedOutput: "Suma: 350", isSample: false },
            { input: "-15\n20", expectedOutput: "Suma: 5", isSample: false }
        ],
        starterCode: `# Escribe tu solución en Python aquí
`
    },
    {
        id: "PY02_PAR_IMPAR",
        title: "Python Básico: Verificación de Par o Impar",
        difficulty: "Fácil",
        points: 100,
        category: "PYTHON -> BASICO",
        sectionTitle: "Módulo Python: Fundamentos de Programación",
        track: "Fundamentos en Python",
        language: "python",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Las estructuras condicionales `if` y `else` en Python permiten tomar decisiones según se cumpla una condición.\nUn número entero es **par** si su resto al dividirlo entre 2 es cero (`num % 2 == 0`).\n\n### 🎯 Tu Misión:\nDado un número entero $N$, determina si es par o impar e imprime:\n- `El número <N> es PAR`\n- `El número <N> es IMPAR`",
        inputDesc: "Un entero $N$.",
        outputDesc: "`El número <N> es PAR` o `El número <N> es IMPAR`.",
        constraints: ["-10000 <= N <= 10000"],
        hints: [
            { title: "Operador Módulo", content: "Usa `if num % 2 == 0:` para evaluar si es par." }
        ],
        examples: [{ input: "8", output: "El número 8 es PAR" }, { input: "15", output: "El número 15 es IMPAR" }],
        testcases: [
            { input: "8", expectedOutput: "El número 8 es PAR", isSample: true },
            { input: "15", expectedOutput: "El número 15 es IMPAR", isSample: true },
            { input: "0", expectedOutput: "El número 0 es PAR", isSample: false }
        ],
        starterCode: `# Escribe tu solución en Python aquí
`
    },
    {
        id: "PY03_TABLA",
        title: "Python Básico: Tabla de Multiplicar y Bucles",
        difficulty: "Fácil",
        points: 100,
        category: "PYTHON -> BASICO",
        sectionTitle: "Módulo Python: Fundamentos de Programación",
        track: "Fundamentos en Python",
        language: "python",
        timeLimit: 1,
        memoryLimit: 32,
        description: "En Python, los bucles `for` combinados con la función `range(inicio, fin)` permiten iterar un número determinado de veces.\n\n### 🎯 Tu Misión:\nDado un entero $N$, genera su tabla de multiplicar del 1 al 5 en el siguiente formato:\n`<N> x 1 = <N*1>`\n`<N> x 2 = <N*2>`\n...\n`<N> x 5 = <N*5>`",
        inputDesc: "Un entero $N$.",
        outputDesc: "5 líneas mostrando las multiplicaciones de $N$ por 1, 2, 3, 4 y 5.",
        constraints: ["1 <= N <= 100"],
        hints: [
            { title: "Bucle Range", content: "Usa `for i in range(1, 6):` para iterar desde 1 hasta 5 inclusive." }
        ],
        examples: [{ input: "3", output: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15" }],
        testcases: [
            { input: "3", expectedOutput: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15", isSample: true },
            { input: "7", expectedOutput: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35", isSample: false }
        ],
        starterCode: `# Escribe tu solución en Python aquí
`
    },

    {
        "id": "OC01_INC",
        "title": "Microoperaciones: Incremento de Registro ACC",
        "difficulty": "Fácil",
        "points": 100,
        "category": "OC -> MICROOPERACIONES",
        "sectionTitle": "Módulo OC: Microoperaciones & Arquitectura",
        "track": "Organización Computacional",
        "language": "python",
        "timeLimit": 1,
        "memoryLimit": 32,
        "description": "En arquitectura de computadoras, la microoperación `ACC+1 -> ACC` incrementa en 1 el valor almacenado en el Acumulador.\n\n### 🎯 Tu Misión:\nDado un valor entero inicial del registro `ACC`, simula el efecto de la microoperación e imprime el nuevo valor de `ACC`.",
        "inputDesc": "Un entero representando el valor inicial de `ACC`.",
        "outputDesc": "Un entero con el valor incrementado de `ACC`.",
        "constraints": [
                "0 <= ACC <= 4095"
        ],
        "hints": [
                {
                        "title": "Incremento",
                        "content": "Lee la entrada con `acc = int(input())` e imprime `acc + 1`."
                }
        ],
        "examples": [
                {
                        "input": "5",
                        "output": "6"
                }
        ],
        "testcases": [
                {
                        "input": "5",
                        "expectedOutput": "6",
                        "isSample": true
                },
                {
                        "input": "99",
                        "expectedOutput": "100",
                        "isSample": true
                },
                {
                        "input": "4095",
                        "expectedOutput": "4096",
                        "isSample": false
                }
        ],
        "starterCode": "# Escribe tu solución en Python aquí\n"
},
    {
        "id": "OC02_SUMA",
        "title": "Microoperaciones: Suma de ACC y GPR",
        "difficulty": "Fácil",
        "points": 100,
        "category": "OC -> MICROOPERACIONES",
        "sectionTitle": "Módulo OC: Microoperaciones & Arquitectura",
        "track": "Organización Computacional",
        "language": "python",
        "timeLimit": 1,
        "memoryLimit": 32,
        "description": "La ALU realiza operaciones aritméticas entre registros. La microoperación `ACC+GPR -> ACC` suma los valores del Acumulador (`ACC`) y el Registro General (`GPR`), guardando el resultado en `ACC`.\n\n### 🎯 Tu Misión:\nDados los enteros `ACC` y `GPR` en dos líneas separadas, imprime el nuevo valor de `ACC`.",
        "inputDesc": "Dos líneas con los enteros `ACC` y `GPR`.",
        "outputDesc": "El resultado de la suma.",
        "constraints": [
                "0 <= ACC, GPR <= 2048"
        ],
        "hints": [
                {
                        "title": "Lectura de dos líneas",
                        "content": "Lee `acc = int(input())` y luego `gpr = int(input())`."
                }
        ],
        "examples": [
                {
                        "input": "10\n15",
                        "output": "25"
                }
        ],
        "testcases": [
                {
                        "input": "10\n15",
                        "expectedOutput": "25",
                        "isSample": true
                },
                {
                        "input": "100\n200",
                        "expectedOutput": "300",
                        "isSample": true
                },
                {
                        "input": "0\n42",
                        "expectedOutput": "42",
                        "isSample": false
                }
        ],
        "starterCode": "# Escribe tu solución en Python aquí\n"
},
    {
        "id": "OC03_COPIA",
        "title": "Microoperaciones: Transferencia Dato a Memoria",
        "difficulty": "Fácil",
        "points": 100,
        "category": "OC -> MICROOPERACIONES",
        "sectionTitle": "Módulo OC: Microoperaciones & Arquitectura",
        "track": "Organización Computacional",
        "language": "python",
        "timeLimit": 1,
        "memoryLimit": 32,
        "description": "Para escribir en el bus de datos hacia memoria, la CPU ejecuta `GPR -> M`, copiando el contenido de GPR al registro de datos M.\n\n### 🎯 Tu Misión:\nDado el valor del registro `GPR`, imprime la transferencia en el formato exacto: `GPR: <valor> -> M: <valor>`.",
        "inputDesc": "Un entero `GPR`.",
        "outputDesc": "Formato `GPR: <valor> -> M: <valor>`.",
        "constraints": [
                "0 <= GPR <= 4095"
        ],
        "hints": [
                {
                        "title": "Formateo",
                        "content": "Usa `f\"GPR: {val} -> M: {val}\"`."
                }
        ],
        "examples": [
                {
                        "input": "42",
                        "output": "GPR: 42 -> M: 42"
                }
        ],
        "testcases": [
                {
                        "input": "42",
                        "expectedOutput": "GPR: 42 -> M: 42",
                        "isSample": true
                },
                {
                        "input": "255",
                        "expectedOutput": "GPR: 255 -> M: 255",
                        "isSample": false
                }
        ],
        "starterCode": "# Escribe tu solución en Python aquí\n"
},
    {
        "id": "OC04_FLAGS",
        "title": "Microoperaciones: Inversión de Flag de Estado",
        "difficulty": "Fácil",
        "points": 100,
        "category": "OC -> MICROOPERACIONES",
        "sectionTitle": "Módulo OC: Microoperaciones & Arquitectura",
        "track": "Organización Computacional",
        "language": "python",
        "timeLimit": 1,
        "memoryLimit": 32,
        "description": "El registro de flag `F` almacena un estado binario (0 o 1). La microoperación `! F` invierte el valor de `F` (0 pasa a 1, y 1 pasa a 0).\n\n### 🎯 Tu Misión:\nDado el valor inicial de `F` (0 o 1), imprime su estado invertido.",
        "inputDesc": "Un bit entero `0` o `1`.",
        "outputDesc": "El bit invertido (`1` o `0`).",
        "constraints": [
                "F in {0, 1}"
        ],
        "hints": [
                {
                        "title": "NOT binario",
                        "content": "Puedes usar `1 - f` o `0 if f == 1 else 1`."
                }
        ],
        "examples": [
                {
                        "input": "0",
                        "output": "1"
                }
        ],
        "testcases": [
                {
                        "input": "0",
                        "expectedOutput": "1",
                        "isSample": true
                },
                {
                        "input": "1",
                        "expectedOutput": "0",
                        "isSample": true
                }
        ],
        "starterCode": "# Escribe tu solución en Python aquí\n"
},
    {
        "id": "OC05_MAR",
        "title": "Microoperaciones: Carga de Dirección MAR",
        "difficulty": "Fácil",
        "points": 100,
        "category": "OC -> MICROOPERACIONES",
        "sectionTitle": "Módulo OC: Microoperaciones & Arquitectura",
        "track": "Organización Computacional",
        "language": "python",
        "timeLimit": 1,
        "memoryLimit": 32,
        "description": "En el ciclo Fetch de Von Neumann, `PC -> MAR` transfiere la dirección actual del contador de programa `PC` al registro de dirección `MAR`.\n\n### 🎯 Tu Misión:\nDado la dirección de instrucción `PC`, imprime el estado en formato `MAR = <PC>`.",
        "inputDesc": "Un entero `PC`.",
        "outputDesc": "Formato `MAR = <PC>`.",
        "constraints": [
                "0 <= PC <= 255"
        ],
        "hints": [
                {
                        "title": "Formato",
                        "content": "Imprime `f\"MAR = {pc}\"`."
                }
        ],
        "examples": [
                {
                        "input": "12",
                        "output": "MAR = 12"
                }
        ],
        "testcases": [
                {
                        "input": "12",
                        "expectedOutput": "MAR = 12",
                        "isSample": true
                },
                {
                        "input": "100",
                        "expectedOutput": "MAR = 100",
                        "isSample": false
                }
        ],
        "starterCode": "# Escribe tu solución en Python aquí\n"
},

    // --- MÓDULO 1: POO BÁSICA Y AVANZADA ---
    {
        id: "P02_POO",
        title: "POO Básico: Multiplicación de Números (Clase Multiplicador)",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> POO",
        sectionTitle: "Nivel 1 (Básico): Adaptación al Editor y Métodos",
        track: "Programación Orientada a Objetos",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Ejercicio para adaptarse al editor con POO en Java.\n\nDebes crear una clase llamada `Multiplicador` con un método `multiplicar(int a, int b)` que retorne el producto de dos números enteros.\n\n1. Leer el entero $A$ en la primera línea.\n2. Leer el entero $B$ en la segunda línea.\n3. Instanciar la clase `Multiplicador`.\n4. Imprimir el resultado en formato `Resultado: <A * B>`.",
        inputDesc: "Dos enteros $A$ y $B$, cada uno en su propia línea.",
        outputDesc: "Imprimir 'Resultado: <A * B>'.",
        constraints: ["1 <= A, B <= 1000"],
        hints: [{ title: "Clase y Métodos", content: "Crea la clase `class Multiplicador { public int multiplicar(int a, int b) { return a * b; } }`." }],
        examples: [{ input: "5\n4", output: "Resultado: 20" }],
        testcases: [
            { input: "5\n4", expectedOutput: "Resultado: 20", isSample: true },
            { input: "7\n3", expectedOutput: "Resultado: 21", isSample: true },
            { input: "12\n10", expectedOutput: "Resultado: 120", isSample: false }
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P03_POO",
        title: "POO Básico: Determinación de Múltiplos (Clase Evaluador)",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> POO",
        sectionTitle: "Nivel 1 (Básico): Adaptación al Editor y Métodos",
        track: "Programación Orientada a Objetos",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Ejercicio para evaluar condiciones numéricas usando POO.\n\nDebes crear la clase `EvaluadorMultiplo` con un método `esMultiplo(int numero, int base)` que retorne `true` si `numero` es múltiplo de `base` (`numero % base == 0`), y `false` en caso contrario.\n\n1. Leer el entero $A$ (número a evaluar) en la primera línea.\n2. Leer el entero $B$ (base/divisor) en la segunda línea.\n3. Instanciar `EvaluadorMultiplo`.\n4. Imprimir `<A> es multiplo de <B>` si es verdadero, o `<A> no es multiplo de <B>` si es falso.",
        inputDesc: "Dos enteros $A$ y $B$, uno por línea.",
        outputDesc: "Imprimir si $A$ es múltiplo de $B$.",
        constraints: ["1 <= A, B <= 1000"],
        hints: [{ title: "Operador Módulo", content: "Un entero A es múltiplo de B si (A % B == 0)." }],
        examples: [
            { input: "15\n5", output: "15 es multiplo de 5" },
            { input: "14\n5", output: "14 no es multiplo de 5" }
        ],
        testcases: [
            { input: "15\n5", expectedOutput: "15 es multiplo de 5", isSample: true },
            { input: "14\n5", expectedOutput: "14 no es multiplo de 5", isSample: true },
            { input: "100\n10", expectedOutput: "100 es multiplo de 10", isSample: false }
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P04_POO",
        title: "POO Básico: Cálculo de Promedio (Clase Calificador)",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> POO",
        sectionTitle: "Nivel 2 (Intermedio): Atributos y Arreglos en POO",
        track: "Programación Orientada a Objetos",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Ejercicio para procesar arreglos y promedios dentro de una clase.\n\nDebes crear la clase `Calificador` con un método `calcularPromedio(double[] notas)` que reciba un arreglo de notas y retorne el promedio exacto.\n\n1. Leer un entero $N$ (cantidad de notas) en la primera línea.\n2. Leer $N$ números decimales (`double`), uno por línea.\n3. Instanciar `Calificador` y obtener el promedio.\n4. Imprimir la salida en formato `Promedio: <valor_con_1_decimal>`.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ notas decimales (una por línea).",
        outputDesc: "Imprimir 'Promedio: X.X'.",
        constraints: ["1 <= N <= 100", "0.0 <= Nota <= 10.0"],
        hints: [{ title: "Formateo de Decimales", content: "Usa `System.out.printf(\"Promedio: %.1f\\n\", promedio);` para mostrar 1 decimal." }],
        examples: [{ input: "4\n8.0\n9.0\n7.5\n9.5", output: "Promedio: 8.5" }],
        testcases: [
            { input: "4\n8.0\n9.0\n7.5\n9.5", expectedOutput: "Promedio: 8.5", isSample: true },
            { input: "3\n10.0\n6.0\n8.0", expectedOutput: "Promedio: 8.0", isSample: true },
            { input: "2\n7.0\n8.0", expectedOutput: "Promedio: 7.5", isSample: false }
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P01_POO",
        title: "Creación de Clase Persona e Instanciación",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> POO",
        sectionTitle: "Nivel 2 (Intermedio): Atributos y Arreglos en POO",
        track: "Programación Orientada a Objetos",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Crearás la clase `Persona` con los atributos `nombre` (String) y `edad` (int).\n\n1. Leer un entero $N$.\n2. Leer $N$ pares de valores `(nombre, edad)` (cada valor en una línea independiente) e instanciar un objeto `Persona` para cada uno.\n3. Imprimir cada persona en formato `Persona <i+1>: <nombre> (<edad> años)`.\n4. Identificar e imprimir la persona de mayor edad.",
        inputDesc: "Un entero $N$ ($1 \\le N \\le 50$), seguido de $N$ pares de líneas con `nombre` y `edad`.",
        outputDesc: "Imprimir las $N$ personas y al final la persona con mayor edad.",
        constraints: ["1 <= N <= 50", "1 <= Edad <= 120"],
        hints: [{ title: "Creación de Clase", content: "Puedes definir `class Persona { String nombre; int edad; ... }` dentro o fuera de `Main.java`." }],
        examples: [{ input: "3\nJuan\n20\nMaría\n25\nCarlos\n22", output: "Persona 1: Juan (20 años)\nPersona 2: María (25 años)\nPersona 3: Carlos (22 años)\nMayor: María con 25 años" }],
        testcases: [{ input: "3\nJuan\n20\nMaría\n25\nCarlos\n22", expectedOutput: "Persona 1: Juan (20 años)\nPersona 2: María (25 años)\nPersona 3: Carlos (22 años)\nMayor: María con 25 años", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },

    // --- MÓDULO 2: ARREGLOS (3 BÁSICOS, 3 MEDIOS, 3 AVANZADOS DE EXÁMENES) ---

    // 🟢 BÁSICOS
    {
        id: "P10_ARREGLOS",
        title: "Multiplicación de Elementos en un Arreglo",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 1 (Fácil): Fundamentos de Arreglos",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo unidimensional de $N$ enteros, calcula el producto acumulado (multiplicación) de todos sus elementos.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea).",
        outputDesc: "Imprimir 'Producto: <resultado>'.",
        constraints: ["1 <= N <= 10"],
        hints: [{ title: "Acumulador", content: "Inicializa tu variable acumuladora en 1 antes de multiplicar en el bucle." }],
        examples: [{ input: "4\n2\n3\n4\n5", output: "Producto: 120" }],
        testcases: [
            { input: "4\n2\n3\n4\n5", expectedOutput: "Producto: 120", isSample: true },
            { input: "3\n1\n5\n10", expectedOutput: "Producto: 50", isSample: false }
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P11_ARREGLOS",
        title: "Conteo de Múltiplos de K en un Arreglo",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 1 (Fácil): Fundamentos de Arreglos",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo de $N$ enteros y un entero $K$, determina cuántos elementos del arreglo son múltiplos exactos de $K$.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea) y al final el entero $K$ en una nueva línea.",
        outputDesc: "Imprimir 'Múltiplos de <K>: <cantidad>'.",
        constraints: ["1 <= N <= 100", "1 <= K <= 100"],
        hints: [{ title: "Operador Módulo", content: "Usa `x % K == 0` para comprobar si `x` es múltiplo de `K`." }],
        examples: [{ input: "5\n10\n15\n7\n20\n12\n5", output: "Múltiplos de 5: 3" }],
        testcases: [
            { input: "5\n10\n15\n7\n20\n12\n5", expectedOutput: "Múltiplos de 5: 3", isSample: true },
            { input: "4\n2\n4\n6\n8\n2", expectedOutput: "Múltiplos de 2: 4", isSample: false }
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P12_ARREGLOS",
        title: "Promedio Simple en Arreglo de Enteros",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 1 (Fácil): Fundamentos de Arreglos",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo unidimensional de $N$ enteros, calcula el promedio decimal simple de sus elementos.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea).",
        outputDesc: "Imprimir 'Promedio: <resultado_con_1_decimal>'.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Cálculo de Promedio", content: "Suma los elementos en una variable double y divide entre N." }],
        examples: [{ input: "4\n10\n20\n30\n40", output: "Promedio: 25.0" }],
        testcases: [
            { input: "4\n10\n20\n30\n40", expectedOutput: "Promedio: 25.0", isSample: true },
            { input: "5\n1\n2\n3\n4\n5", expectedOutput: "Promedio: 3.0", isSample: false }
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P01_ARREGLOS",
        title: "Estadísticas Básicas en Arreglo de Enteros",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 1 (Fácil): Fundamentos de Arreglos",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo unidimensional de $N$ enteros, calcula la suma total, el valor máximo y el valor mínimo.",
        inputDesc: "Entero $N$ en la primera línea, seguido de los $N$ enteros (uno por línea).",
        outputDesc: "Imprimir Suma, Máximo y Mínimo.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Recorrido", content: "Itera con un bucle for acumulando la suma y manteniendo el max/min." }],
        examples: [{ input: "5\n12\n5\n8\n20\n3", output: "Suma: 48\nMáximo: 20\nMínimo: 3" }],
        testcases: [{ input: "5\n12\n5\n8\n20\n3", expectedOutput: "Suma: 48\nMáximo: 20\nMínimo: 3", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P02_ARREGLOS",
        title: "Conteo de Elementos Pares e Impares",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 1 (Fácil): Fundamentos de Arreglos",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo unidimensional de $N$ enteros, cuenta cuántos elementos son pares y cuántos son impares.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea).",
        outputDesc: "Cantidad de Pares e Impares.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Operador Módulo", content: "Usa `x % 2 == 0` para verificar si un entero es par." }],
        examples: [{ input: "5\n2\n7\n4\n9\n11", output: "Pares: 2\nImpares: 3" }],
        testcases: [{ input: "5\n2\n7\n4\n9\n11", expectedOutput: "Pares: 2\nImpares: 3", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P03_ARREGLOS",
        title: "Inversión de Posiciones en un Arreglo",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 1 (Fácil): Fundamentos de Arreglos",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo unidimensional de $N$ enteros, invierte sus elementos y muéstralos ordenados desde el último hasta el primero.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea).",
        outputDesc: "El arreglo invertido separado por espacios.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Recorrido Inverso", content: "Itera desde `i = N - 1` decrementando hasta `i = 0`." }],
        examples: [{ input: "4\n10\n20\n30\n40", output: "40 30 20 10" }],
        testcases: [{ input: "4\n10\n20\n30\n40", expectedOutput: "40 30 20 10", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },

    // 🔵 MEDIOS (3)
    {
        id: "P04_ARREGLOS",
        title: "Búsqueda Lineal e Índice de Ocurrencia",
        difficulty: "Medio",
        points: 110,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 2 (Medio): Búsquedas y Modificaciones",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo de $N$ enteros y un valor buscado $X$, determina la primera posición (índice 0-based) donde aparece $X$. Si no se encuentra, imprime `-1`.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea), y finalmente el entero $X$ a buscar en la última línea.",
        outputDesc: "`Posición: <índice>` o `Posición: -1`.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Break en Búsqueda", content: "Detén el bucle en la primera coincidencia hallada." }],
        examples: [{ input: "5\n15\n42\n8\n99\n23\n99", output: "Posición: 3" }],
        testcases: [{ input: "5\n15\n42\n8\n99\n23\n99", expectedOutput: "Posición: 3", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P05_ARREGLOS",
        title: "Promedio de Elementos Filtrados por Umbral",
        difficulty: "Medio",
        points: 110,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 2 (Medio): Búsquedas y Modificaciones",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo de $N$ enteros y un valor umbral $K$, calcula el promedio de los elementos que son estrictamente mayores a $K$.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea), y el umbral $K$ al final en una nueva línea.",
        outputDesc: "Promedio redondeado a 2 decimales.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Acumulador de Contador", content: "Mantén un contador de elementos válidos para dividir la suma." }],
        examples: [{ input: "4\n10\n50\n80\n20\n25", output: "Promedio: 65.0" }],
        testcases: [{ input: "4\n10\n50\n80\n20\n25", expectedOutput: "Promedio: 65.0", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P06_ARREGLOS",
        title: "Rotación de Arreglo a la Derecha",
        difficulty: "Medio",
        points: 120,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 2 (Medio): Búsquedas y Modificaciones",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo de $N$ enteros y una cantidad de desplazamientos $D$, desplaza el arreglo $D$ posiciones hacia la derecha.",
        inputDesc: "Entero $N$ en la primera línea, seguido de $N$ enteros (uno por línea), y la cantidad de rotaciones $D$ al final en una nueva línea.",
        outputDesc: "Arreglo rotado separado por espacios.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Índice Cíclico", content: "Usa la fórmula `(i + D) % N` para determinar la nueva posición." }],
        examples: [{ input: "5\n1\n2\n3\n4\n5\n2", output: "4 5 1 2 3" }],
        testcases: [{ input: "5\n1\n2\n3\n4\n5\n2", expectedOutput: "4 5 1 2 3", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },

    // 🔴 AVANZADOS - EXÁMENES (3)
    {
        id: "P07_ARREGLOS",
        title: "Examen 1: Filtrado de Consonantes y Frecuencia de Caracteres en Arreglo char[]",
        difficulty: "Difícil",
        points: 150,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 3 (Avanzado Examen): Algoritmos puros sobre Arreglos (NO ArrayList)",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo unidimensional llamado `letras` que contiene $N$ caracteres (`char`, **NO String / NO ArrayList**), realizar:\n\na) Crear un método que devuelva un arreglo nuevo (`char[] nuevo`, NO ArrayList) en el que se incluyan únicamente los caracteres que **NO son vocales** (`a, e, i, o, u` tanto minúsculas como mayúsculas).\nb) Crear un método que devuelva la cantidad de apariciones de un carácter (ingresado por el usuario) dentro del arreglo `nuevo`.",
        inputDesc: "Un entero $N$, seguido de $N$ caracteres individuales de la cadena, y al final el carácter a buscar.",
        outputDesc: "Imprimir el arreglo nuevo de consonantes en formato `[c1, c2, ...]` y la cantidad de apariciones.",
        constraints: ["1 <= N <= 100", "Prohibido usar ArrayList"],
        hints: [{ title: "Contar Consonantes Primero", content: "Recorre el arreglo original para contar las consonantes y dimensionar el arreglo `nuevo` exactamente." }],
        examples: [{ input: "8\nj u a n i t o j\nj", output: "Nuevo: [j, n, t, j]\nApariciones de 'j': 2" }],
        testcases: [{ input: "8\nj u a n i t o j\nj", expectedOutput: "Nuevo: [j, n, t, j]\nApariciones de 'j': 2", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P08_ARREGLOS",
        title: "Examen 2: Elementos No Repetidos y Promedio de No Múltiplos de 3",
        difficulty: "Difícil",
        points: 150,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 3 (Avanzado Examen): Algoritmos puros sobre Arreglos (NO ArrayList)",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo unidimensional `numeros` de $N$ enteros (**NO ArrayList**), realizar:\n\na) Crear un método que devuelva un arreglo nuevo (`int[] nuevo`, NO ArrayList) en el que se incluyan únicamente los enteros **no repetidos** (es decir, aquellos números que aparecen exactamente 1 sola vez en el arreglo original `numeros`).\nb) Crear un método que devuelva el promedio de los enteros de `nuevo` que **NO son múltiplos de 3**.",
        inputDesc: "Un entero $N$, seguido de los $N$ enteros del arreglo `numeros`.",
        outputDesc: "Imprimir el arreglo `nuevo` de elementos no repetidos y el promedio formateado a 2 decimales.",
        constraints: ["1 <= N <= 100", "Prohibido usar ArrayList"],
        hints: [{ title: "Frecuencia de Ocurrencias", content: "Para saber si un entero es no repetido, cuenta sus apariciones totales en el arreglo original. Si el conteo es == 1, agrégalo a `nuevo`." }],
        examples: [{ input: "8\n9 45 11 9 33 58 45 62", output: "Nuevo: [11, 33, 58, 62]\nPromedio No Múltiplos de 3: 43.67" }],
        testcases: [{ input: "8\n9 45 11 9 33 58 45 62", expectedOutput: "Nuevo: [11, 33, 58, 62]\nPromedio No Múltiplos de 3: 43.67", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },
    {
        id: "P09_ARREGLOS",
        title: "Examen 3: Conversión de Vector a Matriz X x 3 y Ubicación del Mínimo",
        difficulty: "Difícil",
        points: 150,
        category: "JAVA -> ARREGLOS",
        sectionTitle: "Nivel 3 (Avanzado Examen): Algoritmos puros sobre Arreglos (NO ArrayList)",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dada una matriz unidimensional (un array `v`) de tamaño $N$ ($N$ es múltiplo de 3):\n\na) Convertir el arreglo en una matriz bidimensional `int[X][3]` de 3 columnas y $X = N / 3$ filas transfiriendo los elementos en orden.\nb) Calcular el valor mínimo de la matriz e imprimir su valor y su posición `(Fila, Columna)` (0-indexed).",
        inputDesc: "Un entero $N$ (múltiplo de 3), seguido de los $N$ elementos del vector `v`.",
        outputDesc: "Imprimir las filas de la matriz resultante y la ubicación del valor mínimo.",
        constraints: ["3 <= N <= 99", "N es múltiplo de 3"],
        hints: [{ title: "Conversión de Índices", content: "Para una posición `k` en el arreglo `v`, la fila es `k / 3` y la columna es `k % 3`." }],
        examples: [{ input: "6\n5 9 3 4 9 1", output: "Matriz 2x3:\n5 9 3\n4 9 1\nMínimo: 1 en Fila 1, Columna 2" }],
        testcases: [{ input: "6\n5 9 3 4 9 1", expectedOutput: "Matriz 2x3:\n5 9 3\n4 9 1\nMínimo: 1 en Fila 1, Columna 2", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },

    // --- MÓDULO 3: ARRAYLIST EN JAVA ---
    {
        id: "P01_ARRAYLIST",
        title: "Operaciones Dinámicas con ArrayList de Enteros",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> ARRAYLIST",
        sectionTitle: "Módulo 3: Colecciones Dinámicas (ArrayList)",
        track: "Arreglos y ArrayList",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Inserta $N$ enteros en un `ArrayList<Integer>`. Luego, elimina todos los elementos impares e imprime la lista resultante.",
        inputDesc: "$N$ seguido de $N$ enteros.",
        outputDesc: "Lista de pares y cantidad final de elementos.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Método removeIf", content: "Usa `lista.removeIf(n -> n % 2 != 0);`." }],
        examples: [{ input: "6\n10 15 20 25 30 33", output: "Lista Par: [10, 20, 30]\nElementos: 3" }],
        testcases: [{ input: "6\n10 15 20 25 30 33", expectedOutput: "Lista Par: [10, 20, 30]\nElementos: 3", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`
    },

    // --- MÓDULO 4: PILAS STACK (ORDENADOS RIGUROSAMENTE POR NIVEL) ---

    // 🟢 NIVEL FÁCIL
    {
        id: "P1_PILAS",
        title: "Construcción, Apilado y Consulta en Pila",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 1 (Fácil): Operaciones Fundamentales de Pila",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Aprenderás a instanciar la clase `Stack<Integer>` de `Stack.java` y a utilizar sus operaciones primarias:\n\n1. Instanciar una pila `Stack<Integer> pila = new Stack<>();`.\n2. Leer un entero $N$.\n3. Leer los $N$ enteros e insertarlos con `pila.push(valor)`.\n4. Imprimir `Tamaño: <size>`, `Vacía: <empty>` y `Tope: <peek>`.",
        inputDesc: "Primera línea un entero $N$ ($1 \\le N \\le 100$), seguida de $N$ enteros.",
        outputDesc: "Tres líneas impresas:\n`Tamaño: <size>`\n`Vacía: <empty>`\n`Tope: <peek>`",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Métodos de Stack", content: "Utiliza push(x), size(), empty(), y peek()." }],
        examples: [{ input: "5\n10 20 30 40 50", output: "Tamaño: 5\nVacía: false\nTope: 50" }],
        testcases: [{ input: "5\n10 20 30 40 50", expectedOutput: "Tamaño: 5\nVacía: false\nTope: 50", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    },
    {
        id: "P2_PILAS",
        title: "Inversión de Secuencia mediante Desapilado (pop)",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 1 (Fácil): Operaciones Fundamentales de Pila",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Utiliza la naturaleza LIFO (Last In, First Out) de la Pila para invertir una secuencia de $N$ enteros introducidos.",
        inputDesc: "Un entero $N$ seguido de $N$ números.",
        outputDesc: "La secuencia invertida en una sola línea separada por espacios.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Desapilado LIFO", content: "Al hacer `pila.pop()`, obtendrás los elementos en orden inverso." }],
        examples: [{ input: "4\n1 2 3 4", output: "4 3 2 1" }],
        testcases: [{ input: "4\n1 2 3 4", expectedOutput: "4 3 2 1", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    },
    {
        id: "P3_PILAS",
        title: "Duplicación de Elementos en Pila",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 1 (Fácil): Operaciones Fundamentales de Pila",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dado un arreglo de $N$ elementos apilados, duplica cada elemento de modo que cada número aparezca dos veces consecutivas conservando el orden.",
        inputDesc: "$N$ seguido de $N$ números.",
        outputDesc: "Imprimir la pila resultante con `pila.toString()`.",
        constraints: ["1 <= N <= 50"],
        hints: [{ title: "Duplicación con Pila Auxiliar", content: "Usa una pila auxiliar para revertir el orden e insertar cada elemento dos veces al volver." }],
        examples: [{ input: "3\n10 20 30", output: "[10, 10, 20, 20, 30, 30]" }],
        testcases: [{ input: "3\n10 20 30", expectedOutput: "[10, 10, 20, 20, 30, 30]", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    },

    // 🔵 NIVEL MEDIO
    {
        id: "P4_PILAS",
        title: "Búsqueda de Elemento con Pila Auxiliar",
        difficulty: "Medio",
        points: 120,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 2 (Medio): Algoritmos con Pilas Auxiliares",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dada una pila con $N$ enteros y un valor objetivo $X$, busca si $X$ se encuentra en la pila. **Restricción:** La pila original debe quedar en su estado inicial al finalizar.",
        inputDesc: "$N$ elementos apilados, y en la última línea el objetivo $X$.",
        outputDesc: "`ENCONTRADO` o `NO ENCONTRADO`, y el estado final de la pila.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Preservación con Pila Auxiliar", content: "Vuelca los elementos desapilados en una pila aux y luego revuélvelos a la original." }],
        examples: [{ input: "4\n10 20 30 40\n20", output: "ENCONTRADO\nPila: [10, 20, 30, 40]" }],
        testcases: [{ input: "4\n10 20 30 40\n20", expectedOutput: "ENCONTRADO\nPila: [10, 20, 30, 40]", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    },
    {
        id: "P5_PILAS",
        title: "Eliminación de Ocurrencias y Preservación de Orden",
        difficulty: "Medio",
        points: 120,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 2 (Medio): Algoritmos con Pilas Auxiliares",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Elimina todas las ocurrencias del número $X$ dentro de una pila de $N$ enteros manteniendo el orden relativo de los demás elementos.",
        inputDesc: "$N$ enteros, seguidos del número $X$ a eliminar.",
        outputDesc: "Imprimir la pila resultante con `pila.toString()`.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Filtrado con Auxiliar", content: "Desapila ignorando $X$ en la aux, luego regresa los elementos." }],
        examples: [{ input: "5\n5 10 5 20 5\n5", output: "[10, 20]" }],
        testcases: [{ input: "5\n5 10 5 20 5\n5", expectedOutput: "[10, 20]", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    },
    {
        id: "P6_PILAS",
        title: "Intercambio de Tope y Fondo de la Pila",
        difficulty: "Medio",
        points: 130,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 2 (Medio): Algoritmos con Pilas Auxiliares",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dada una pila de $N$ enteros ($N \\ge 2$), intercambia el elemento ubicado en el tope con el elemento ubicado en el fondo (base) de la pila.",
        inputDesc: "$N$ seguido de los $N$ elementos de la pila.",
        outputDesc: "Imprimir la pila resultante con `pila.toString()`.",
        constraints: ["2 <= N <= 100"],
        hints: [{ title: "Dos Pilas Auxiliares", content: "Guarda el tope, vuelca el resto para obtener el fondo, intercambia y reconstruye." }],
        examples: [{ input: "4\n10 20 30 40", output: "[40, 20, 30, 10]" }],
        testcases: [{ input: "4\n10 20 30 40", expectedOutput: "[40, 20, 30, 10]", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    },

    // 🔴 NIVEL DIFÍCIL
    {
        id: "P7_PILAS",
        title: "Ordenamiento de una Pila con Pila Auxiliar",
        difficulty: "Difícil",
        points: 150,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 3 (Difícil): Estructuras Complejas y Parseo",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Dada una pila desordenada de $N$ enteros, ordénala de menor a mayor (de base a tope) utilizando **únicamente una pila auxiliar** como estructura adicional.",
        inputDesc: "$N$ seguido de los $N$ elementos desordenados.",
        outputDesc: "Imprimir la pila ordenada con `pila.toString()`.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Algoritmo de Inserción", content: "Desapila un elemento `temp` de la pila original. Mientras la pila aux no esté vacía y `aux.peek() > temp`, regresa elementos a la pila original." }],
        examples: [{ input: "5\n34 3 31 98 92", output: "[98, 92, 34, 31, 3]" }],
        testcases: [{ input: "5\n34 3 31 98 92", expectedOutput: "[98, 92, 34, 31, 3]", isSample: true }],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    },
    {
        id: "P8_PILAS",
        title: "Evaluación de Expresiones Balanceadas (Paréntesis)",
        difficulty: "Difícil",
        points: 150,
        category: "JAVA -> PILAS STACK",
        sectionTitle: "Nivel 3 (Difícil): Estructuras Complejas y Parseo",
        track: "Estructuras de Datos (Java Stack)",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Determina si una cadena de sintaxis con paréntesis `()`, corchetes `[]` y llaves `{}` está adecuadamente balanceada usando `Stack<Character>`.",
        inputDesc: "Una cadena de texto con la expresión.",
        outputDesc: "`BALANCEADO` o `DESBALANCEADO`.",
        constraints: ["Longitud <= 500"],
        hints: [{ title: "Stack de Caracteres", content: "Apila aperturas `(`, `[`, `{` y desapila comparando en cierres `)`, `]`, `}`." }],
        examples: [{ input: "{[()]}", output: "BALANCEADO" }, { input: "{[(])}", output: "DESBALANCEADO" }],
        testcases: [
            { input: "{[()]}", expectedOutput: "BALANCEADO", isSample: true },
            { input: "{[(])}", expectedOutput: "DESBALANCEADO", isSample: false }
        ],
        starterCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Escribe tu solución en Java aquí
        
    }
}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    }
];
