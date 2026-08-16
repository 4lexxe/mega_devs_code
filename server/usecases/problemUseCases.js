/**
 * Casos de Uso para Ejercicios (Problems)
 */

import { ProblemValidator } from '../validators/problemValidator.js';
import { db } from '../db/db.js';

export class GetProblemsUseCase {
    static execute() {
        return db.getProblems();
    }
}

export class GetProblemByIdUseCase {
    static execute(id) {
        if (!id) return { error: 'ID de ejercicio no proporcionado' };
        const problem = db.getProblemById(id);
        if (!problem) return { error: 'Ejercicio no encontrado' };
        return { problem };
    }
}

export class CreateProblemUseCase {
    static execute(problemData) {
        // 1. Validar
        const validation = ProblemValidator.validate(problemData);
        if (!validation.isValid) {
            return { success: false, errors: validation.errors };
        }

        // 2. Asignar ID autoincremental
        const existingProblems = db.getProblems();
        const nextNumber = existingProblems.length + 1;
        const newId = `P${nextNumber}`;

        const problemToSave = {
            id: newId,
            title: problemData.title.trim(),
            difficulty: problemData.difficulty,
            track: problemData.track || 'Estructuras de Datos (Java)',
            category: problemData.category || 'JAVA -> PILAS STACK',
            sectionTitle: problemData.sectionTitle || 'Sección 1: Operaciones Básicas',
            tags: Array.isArray(problemData.tags) ? problemData.tags : [problemData.category || 'General'],
            points: problemData.points || 100,
            timeLimit: problemData.timeLimit || 1.0,
            memoryLimit: problemData.memoryLimit || 32,
            description: problemData.description,
            inputDesc: problemData.inputDesc || 'Entrada estándar.',
            outputDesc: problemData.outputDesc || 'Salida estándar.',
            constraints: Array.isArray(problemData.constraints) ? problemData.constraints : [],
            hints: Array.isArray(problemData.hints) ? problemData.hints : [],
            examples: Array.isArray(problemData.examples) ? problemData.examples : [],
            testcases: problemData.testcases,
            starterCode: problemData.starterCode || `import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n    }\n}`,
            auxiliaryFilename: problemData.auxiliaryFilename || null,
            auxiliaryCode: problemData.auxiliaryCode || null
        };

        // 3. Guardar en almacenamiento interno
        const savedProblem = db.addProblem(problemToSave);
        return { success: true, problem: savedProblem };
    }
}
