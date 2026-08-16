/**
 * Validador para creación y actualización de Ejercicios
 */

export class ProblemValidator {
    static validate(problemData) {
        const errors = [];

        if (!problemData || typeof problemData !== 'object') {
            return { isValid: false, errors: ['Los datos del ejercicio son inválidos.'] };
        }

        // Título
        if (!problemData.title || typeof problemData.title !== 'string' || problemData.title.trim().length < 3) {
            errors.push('El título del ejercicio es obligatorio y debe contener al menos 3 caracteres.');
        }

        // Dificultad
        const validDifficulties = ['Fácil', 'Medio', 'Difícil'];
        if (!problemData.difficulty || !validDifficulties.includes(problemData.difficulty)) {
            errors.push('La dificultad debe ser uno de los siguientes valores: Fácil, Medio, Difícil.');
        }

        // Descripción
        if (!problemData.description || typeof problemData.description !== 'string' || problemData.description.trim().length < 10) {
            errors.push('La descripción es obligatoria y debe ser clara (mínimo 10 caracteres).');
        }

        // Límites
        if (problemData.timeLimit && (typeof problemData.timeLimit !== 'number' || problemData.timeLimit <= 0)) {
            errors.push('El límite de tiempo debe ser un número mayor a 0.');
        }

        if (problemData.memoryLimit && (typeof problemData.memoryLimit !== 'number' || problemData.memoryLimit <= 0)) {
            errors.push('El límite de memoria debe ser un número mayor a 0.');
        }

        // Testcases
        if (!Array.isArray(problemData.testcases) || problemData.testcases.length === 0) {
            errors.push('Debes proporcionar al menos 1 caso de prueba (testcase) para el ejercicio.');
        } else {
            problemData.testcases.forEach((tc, idx) => {
                if (tc.input === undefined || tc.input === null) {
                    errors.push(`El caso de prueba #${idx + 1} requiere una entrada (input).`);
                }
                if (tc.expectedOutput === undefined || tc.expectedOutput === null || String(tc.expectedOutput).trim() === '') {
                    errors.push(`El caso de prueba #${idx + 1} requiere una salida esperada (expectedOutput).`);
                }
            });
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
