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
    // --- MÓDULO 1: POO BÁSICA Y AVANZADA ---
    {
        id: "P01_POO",
        title: "Creación de Clase Persona e Instanciación",
        difficulty: "Fácil",
        points: 100,
        category: "JAVA -> POO",
        sectionTitle: "Módulo 1: Fundamentos de POO",
        track: "Programación Orientada a Objetos",
        timeLimit: 1,
        memoryLimit: 32,
        description: "Crearás la clase `Persona` con los atributos `nombre` (String) y `edad` (int).\n\n1. Leer un entero $N$.\n2. Leer $N$ pares de valores `(nombre, edad)` e instanciar un objeto `Persona` para cada uno.\n3. Imprimir cada persona en formato `Persona <i+1>: <nombre> (<edad> años)`.\n4. Identificar e imprimir la persona de mayor edad.",
        inputDesc: "Un entero $N$ ($1 \\le N \\le 50$), seguido de $N$ líneas con `nombre` y `edad`.",
        outputDesc: "Imprimir las $N$ personas y al final la persona con mayor edad.",
        constraints: ["1 <= N <= 50", "1 <= Edad <= 120"],
        hints: [{ title: "Creación de Clase", content: "Puedes definir `class Persona { String nombre; int edad; ... }` dentro o fuera de `Main.java`." }],
        examples: [{ input: "3\nJuan 20\nMaría 25\nCarlos 22", output: "Persona 1: Juan (20 años)\nPersona 2: María (25 años)\nPersona 3: Carlos (22 años)\nMayor: María con 25 años" }],
        testcases: [{ input: "3\nJuan 20\nMaría 25\nCarlos 22", expectedOutput: "Persona 1: Juan (20 años)\nPersona 2: María (25 años)\nPersona 3: Carlos (22 años)\nMayor: María con 25 años", isSample: true }],
        starterCode: `import java.util.Scanner;\n\nclass Persona {\n    String nombre;\n    int edad;\n    public Persona(String nombre, int edad) {\n        this.nombre = nombre;\n        this.edad = edad;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Persona mayor = null;\n        for (int i = 1; i <= N; i++) {\n            String nombre = sc.next();\n            int edad = sc.nextInt();\n            Persona p = new Persona(nombre, edad);\n            System.out.println("Persona " + i + ": " + p.nombre + " (" + p.edad + " años)");\n            if (mayor == null || p.edad > mayor.edad) mayor = p;\n        }\n        if (mayor != null) System.out.println("Mayor: " + mayor.nombre + " con " + mayor.edad + " años");\n    }\n}`
    },

    // --- MÓDULO 2: ARREGLOS (3 BÁSICOS, 3 MEDIOS, 3 AVANZADOS DE EXÁMENES) ---

    // 🟢 BÁSICOS (3)
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
        inputDesc: "Entero $N$ seguido de $N$ enteros.",
        outputDesc: "Imprimir Suma, Máximo y Mínimo.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Recorrido", content: "Itera con un bucle for acumulando la suma y manteniendo el max/min." }],
        examples: [{ input: "5\n12 5 8 20 3", output: "Suma: 48\nMáximo: 20\nMínimo: 3" }],
        testcases: [{ input: "5\n12 5 8 20 3", expectedOutput: "Suma: 48\nMáximo: 20\nMínimo: 3", isSample: true }],
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        int[] arr = new int[N];\n        int suma = 0, max = Integer.MIN_VALUE, min = Integer.MAX_VALUE;\n        for (int i = 0; i < N; i++) {\n            arr[i] = sc.nextInt();\n            suma += arr[i];\n            if (arr[i] > max) max = arr[i];\n            if (arr[i] < min) min = arr[i];\n        }\n        System.out.println("Suma: " + suma);\n        System.out.println("Máximo: " + max);\n        System.out.println("Mínimo: " + min);\n    }\n}`
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
        inputDesc: "Entero $N$ seguido de $N$ enteros.",
        outputDesc: "Cantidad de Pares e Impares.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Operador Módulo", content: "Usa `x % 2 == 0` para verificar si un entero es par." }],
        examples: [{ input: "5\n2 7 4 9 11", output: "Pares: 2\nImpares: 3" }],
        testcases: [{ input: "5\n2 7 4 9 11", expectedOutput: "Pares: 2\nImpares: 3", isSample: true }],
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        int pares = 0, impares = 0;\n        for (int i = 0; i < N; i++) {\n            int v = sc.nextInt();\n            if (v % 2 == 0) pares++;\n            else impares++;\n        }\n        System.out.println("Pares: " + pares);\n        System.out.println("Impares: " + impares);\n    }\n}`
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
        inputDesc: "Entero $N$ seguido de $N$ enteros.",
        outputDesc: "El arreglo invertido separado por espacios.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Recorrido Inverso", content: "Itera desde `i = N - 1` decrementando hasta `i = 0`." }],
        examples: [{ input: "4\n10 20 30 40", output: "40 30 20 10" }],
        testcases: [{ input: "4\n10 20 30 40", expectedOutput: "40 30 20 10", isSample: true }],
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        int[] arr = new int[N];\n        for (int i = 0; i < N; i++) arr[i] = sc.nextInt();\n        for (int i = N - 1; i >= 0; i--) {\n            System.out.print(arr[i] + (i == 0 ? "" : " "));\n        }\n        System.out.println();\n    }\n}`
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
        inputDesc: "$N$ enteros, seguidos del entero $X$ a buscar.",
        outputDesc: "`Posición: <índice>` o `Posición: -1`.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Break en Búsqueda", content: "Detén el bucle en la primera coincidencia hallada." }],
        examples: [{ input: "5\n15 42 8 99 23\n99", output: "Posición: 3" }],
        testcases: [{ input: "5\n15 42 8 99 23\n99", expectedOutput: "Posición: 3", isSample: true }],
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        int[] arr = new int[N];\n        for (int i = 0; i < N; i++) arr[i] = sc.nextInt();\n        int X = sc.nextInt();\n        int pos = -1;\n        for (int i = 0; i < N; i++) {\n            if (arr[i] == X) { pos = i; break; }\n        }\n        System.out.println("Posición: " + pos);\n    }\n}`
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
        inputDesc: "$N$ enteros, seguidos del umbral $K$.",
        outputDesc: "Promedio redondeado a 2 decimales.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Acumulador de Contador", content: "Mantén un contador de elementos válidos para dividir la suma." }],
        examples: [{ input: "4\n10 50 80 20\n25", output: "Promedio: 65.0" }],
        testcases: [{ input: "4\n10 50 80 20\n25", expectedOutput: "Promedio: 65.0", isSample: true }],
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        int[] arr = new int[N];\n        for (int i = 0; i < N; i++) arr[i] = sc.nextInt();\n        int K = sc.nextInt();\n        double suma = 0;\n        int cant = 0;\n        for (int v : arr) {\n            if (v > K) { suma += v; cant++; }\n        }\n        if (cant > 0) {\n            double prom = Math.round((suma / cant) * 100.0) / 100.0;\n            System.out.println("Promedio: " + prom);\n        } else {\n            System.out.println("Promedio: 0.0");\n        }\n    }\n}`
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
        inputDesc: "$N$ enteros, seguido de la cantidad de rotaciones $D$.",
        outputDesc: "Arreglo rotado separado por espacios.",
        constraints: ["1 <= N <= 100"],
        hints: [{ title: "Índice Cíclico", content: "Usa la fórmula `(i + D) % N` para determinar la nueva posición." }],
        examples: [{ input: "5\n1 2 3 4 5\n2", output: "4 5 1 2 3" }],
        testcases: [{ input: "5\n1 2 3 4 5\n2", expectedOutput: "4 5 1 2 3", isSample: true }],
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        int[] arr = new int[N];\n        for (int i = 0; i < N; i++) arr[i] = sc.nextInt();\n        int D = sc.nextInt();\n        int[] rotado = new int[N];\n        for (int i = 0; i < N; i++) {\n            rotado[(i + D) % N] = arr[i];\n        }\n        for (int i = 0; i < N; i++) {\n            System.out.print(rotado[i] + (i == N - 1 ? "" : " "));\n        }\n        System.out.println();\n    }\n}`
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
    public static boolean esVocal(char c) {
        char min = Character.toLowerCase(c);
        return min == 'a' || min == 'e' || min == 'i' || min == 'o' || min == 'u';
    }

    public static char[] filtrarConsonantes(char[] letras) {
        int cant = 0;
        for (char c : letras) {
            if (!esVocal(c)) cant++;
        }
        char[] nuevo = new char[cant];
        int idx = 0;
        for (char c : letras) {
            if (!esVocal(c)) {
                nuevo[idx++] = c;
            }
        }
        return nuevo;
    }

    public static int contarApariciones(char[] arr, char buscado) {
        int cant = 0;
        for (char c : arr) {
            if (c == buscado) cant++;
        }
        return cant;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        char[] letras = new char[N];
        for (int i = 0; i < N; i++) {
            letras[i] = sc.next().charAt(0);
        }
        char buscado = sc.next().charAt(0);

        char[] nuevo = filtrarConsonantes(letras);
        int cant = contarApariciones(nuevo, buscado);

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < nuevo.length; i++) {
            sb.append(nuevo[i]).append(i == nuevo.length - 1 ? "" : ", ");
        }
        sb.append("]");

        System.out.println("Nuevo: " + sb.toString());
        System.out.println("Apariciones de '" + buscado + "': " + cant);
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
    public static int contarOcurrencias(int[] arr, int val) {
        int cant = 0;
        for (int v : arr) if (v == val) cant++;
        return cant;
    }

    public static int[] obtenerNoRepetidos(int[] numeros) {
        int cantUnicos = 0;
        for (int v : numeros) {
            if (contarOcurrencias(numeros, v) == 1) cantUnicos++;
        }
        int[] nuevo = new int[cantUnicos];
        int idx = 0;
        for (int v : numeros) {
            if (contarOcurrencias(numeros, v) == 1) {
                nuevo[idx++] = v;
            }
        }
        return nuevo;
    }

    public static double promedioNoMultiplos3(int[] nuevo) {
        double suma = 0;
        int cant = 0;
        for (int v : nuevo) {
            if (v % 3 != 0) {
                suma += v;
                cant++;
            }
        }
        return cant > 0 ? (suma / cant) : 0.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int[] numeros = new int[N];
        for (int i = 0; i < N; i++) numeros[i] = sc.nextInt();

        int[] nuevo = obtenerNoRepetidos(numeros);
        double prom = promedioNoMultiplos3(nuevo);
        prom = Math.round(prom * 100.0) / 100.0;

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < nuevo.length; i++) {
            sb.append(nuevo[i]).append(i == nuevo.length - 1 ? "" : ", ");
        }
        sb.append("]");

        System.out.println("Nuevo: " + sb.toString());
        System.out.println("Promedio No Múltiplos de 3: " + prom);
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
        int N = sc.nextInt();
        int[] v = new int[N];
        for (int i = 0; i < N; i++) v[i] = sc.nextInt();

        int filas = N / 3;
        int cols = 3;
        int[][] matriz = new int[filas][cols];

        int minVal = Integer.MAX_VALUE;
        int minFila = -1, minCol = -1;

        for (int i = 0; i < N; i++) {
            int r = i / cols;
            int c = i % cols;
            matriz[r][c] = v[i];
            if (v[i] < minVal) {
                minVal = v[i];
                minFila = r;
                minCol = c;
            }
        }

        System.out.println("Matriz " + filas + "x3:");
        for (int r = 0; r < filas; r++) {
            for (int c = 0; c < cols; c++) {
                System.out.print(matriz[r][c] + (c == cols - 1 ? "" : " "));
            }
            System.out.println();
        }
        System.out.println("Mínimo: " + minVal + " en Fila " + minFila + ", Columna " + minCol);
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
        starterCode: `import java.util.Scanner;\nimport java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        ArrayList<Integer> lista = new ArrayList<>();\n        for (int i = 0; i < N; i++) lista.add(sc.nextInt());\n        lista.removeIf(n -> n % 2 != 0);\n        System.out.println("Lista Par: " + lista);\n        System.out.println("Elementos: " + lista.size());\n    }\n}`
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Stack<Integer> pila = new Stack<>();\n        for (int i = 0; i < N; i++) pila.push(sc.nextInt());\n        \n        System.out.println("Tamaño: " + pila.size());\n        System.out.println("Vacía: " + pila.empty());\n        System.out.println("Tope: " + pila.peek());\n    }\n}`,
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Stack<Integer> pila = new Stack<>();\n        for (int i = 0; i < N; i++) pila.push(sc.nextInt());\n        \n        while (!pila.empty()) {\n            System.out.print(pila.pop() + (pila.empty() ? "" : " "));\n        }\n        System.out.println();\n    }\n}`,
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Stack<Integer> pila = new Stack<>();\n        for (int i = 0; i < N; i++) pila.push(sc.nextInt());\n        \n        Stack<Integer> aux = new Stack<>();\n        while (!pila.empty()) aux.push(pila.pop());\n        while (!aux.empty()) {\n            int val = aux.pop();\n            pila.push(val);\n            pila.push(val);\n        }\n        System.out.println(pila.toString());\n    }\n}`,
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Stack<Integer> pila = new Stack<>();\n        for (int i = 0; i < N; i++) pila.push(sc.nextInt());\n        int X = sc.nextInt();\n        \n        Stack<Integer> aux = new Stack<>();\n        boolean enc = false;\n        while (!pila.empty()) {\n            int v = pila.pop();\n            if (v == X) enc = true;\n            aux.push(v);\n        }\n        while (!aux.empty()) pila.push(aux.pop());\n        \n        System.out.println(enc ? "ENCONTRADO" : "NO ENCONTRADO");\n        System.out.println("Pila: " + pila.toString());\n    }\n}`,
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Stack<Integer> pila = new Stack<>();\n        for (int i = 0; i < N; i++) pila.push(sc.nextInt());\n        int X = sc.nextInt();\n        \n        Stack<Integer> aux = new Stack<>();\n        while (!pila.empty()) {\n            int v = pila.pop();\n            if (v != X) aux.push(v);\n        }\n        while (!aux.empty()) pila.push(aux.pop());\n        \n        System.out.println(pila.toString());\n    }\n}`,
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Stack<Integer> pila = new Stack<>();\n        for (int i = 0; i < N; i++) pila.push(sc.nextInt());\n        \n        int tope = pila.pop();\n        Stack<Integer> aux = new Stack<>();\n        while (pila.size() > 1) aux.push(pila.pop());\n        int fondo = pila.pop();\n        \n        pila.push(tope);\n        while (!aux.empty()) pila.push(aux.pop());\n        pila.push(fondo);\n        \n        System.out.println(pila.toString());\n    }\n}`,
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int N = sc.nextInt();\n        Stack<Integer> pila = new Stack<>();\n        for (int i = 0; i < N; i++) pila.push(sc.nextInt());\n        \n        Stack<Integer> aux = new Stack<>();\n        while (!pila.empty()) {\n            int temp = pila.pop();\n            while (!aux.empty() && aux.peek() > temp) {\n                pila.push(aux.pop());\n            }\n            aux.push(temp);\n        }\n        while (!aux.empty()) pila.push(aux.pop());\n        \n        System.out.println(pila.toString());\n    }\n}`,
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
        starterCode: `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String expr = sc.hasNext() ? sc.next() : "";\n        Stack<Character> pila = new Stack<>();\n        boolean ok = true;\n        for (int i = 0; i < expr.length(); i++) {\n            char c = expr.charAt(i);\n            if (c == '(' || c == '[' || c == '{') {\n                pila.push(c);\n            } else if (c == ')' || c == ']' || c == '}') {\n                if (pila.empty()) { ok = false; break; }\n                char top = pila.pop();\n                if ((c == ')' && top != '(') || (c == ']' && top != '[') || (c == '}' && top != '{')) {\n                    ok = false; break;\n                }\n            }\n        }\n        if (!pila.empty()) ok = false;\n        System.out.println(ok ? "BALANCEADO" : "DESBALANCEADO");\n    }\n}`,
        auxiliaryFilename: "Stack.java",
        auxiliaryCode: STACK_JAVA_CODE
    }
];
