import express from 'express';
import { getProblems, getProblemById, createProblem, getUserStats, getSubmissions, getLeaderboard } from '../controllers/problemController.js';
import { runCustomCode, evaluateSubmission } from '../controllers/judgeController.js';

const router = express.Router();

router.get('/problems', getProblems);
router.get('/problems/:id', getProblemById);
router.post('/problems', createProblem);
router.get('/user', getUserStats);
router.get('/submissions', getSubmissions);
router.get('/leaderboard', getLeaderboard);
router.post('/judge/run', runCustomCode);
router.post('/judge/eval', evaluateSubmission);

export default router;
