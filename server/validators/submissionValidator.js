/**
 * Validador para Envíos de Solución y Ejecución de Código
 */

export class SubmissionValidator {
    static validateSubmission(payload, problemExistsCheckFn) {
        const errors = [];

        if (!payload || typeof payload !== 'object') {
            return { isValid: false, errors: ['El cuerpo del envío es inválido.'] };
        }

        if (!payload.problemId || typeof payload.problemId !== 'string') {
            errors.push('Se requiere el ID del ejercicio (problemId).');
        } else if (problemExistsCheckFn && !problemExistsCheckFn(payload.problemId)) {
            errors.push(`El ejercicio con ID "${payload.problemId}" no existe.`);
        }

        if (!payload.code || typeof payload.code !== 'string' || payload.code.trim().length === 0) {
            errors.push('El código fuente no puede estar vacío.');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    static validateRun(payload) {
        const errors = [];

        if (!payload || typeof payload !== 'object') {
            return { isValid: false, errors: ['El cuerpo de la solicitud es inválido.'] };
        }

        if (payload.code === undefined || payload.code === null || String(payload.code).trim() === '') {
            errors.push('El código a ejecutar no puede estar vacío.');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
