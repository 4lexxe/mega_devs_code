import { RunCodeUseCase, SubmitSolutionUseCase } from '../usecases/submissionUseCases.js';

export const runCustomCode = (req, res) => {
    const result = RunCodeUseCase.execute(req.body);
    res.json(result);
};

export const evaluateSubmission = (req, res) => {
    const result = SubmitSolutionUseCase.execute(req.body);
    if (!result.success) {
        return res.json({
            verdict: "ERROR",
            verdictTitle: result.errors ? result.errors.join(' ') : "Error al procesar el envío",
            score: 0,
            timeMs: 0,
            memoryMB: 0,
            testcaseResults: []
        });
    }
    res.json(result.result);
};
