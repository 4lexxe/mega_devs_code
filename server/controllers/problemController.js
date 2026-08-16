import { GetProblemsUseCase, GetProblemByIdUseCase, CreateProblemUseCase } from '../usecases/problemUseCases.js';
import { GetUserStatsUseCase, GetSubmissionsUseCase, GetLeaderboardUseCase } from '../usecases/submissionUseCases.js';

export const getProblems = (req, res) => {
    res.json(GetProblemsUseCase.execute());
};

export const getProblemById = (req, res) => {
    const result = GetProblemByIdUseCase.execute(req.params.id);
    if (result.error) {
        return res.status(404).json({ error: result.error });
    }
    res.json(result.problem);
};

export const createProblem = (req, res) => {
    const result = CreateProblemUseCase.execute(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.errors });
    }
    res.status(201).json(result.problem);
};

export const getUserStats = (req, res) => {
    res.json(GetUserStatsUseCase.execute());
};

export const getSubmissions = (req, res) => {
    res.json(GetSubmissionsUseCase.execute());
};

export const getLeaderboard = (req, res) => {
    res.json(GetLeaderboardUseCase.execute());
};
