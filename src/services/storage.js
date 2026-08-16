/**
 * MEGA DEVS - LocalStorage Manager & Service Storage Repository
 */

import { INITIAL_PROBLEMS } from '../data/problems.js';

const STORAGE_KEYS = {
    PROBLEMS: 'omegaup_custom_problems',
    SUBMISSIONS: 'omegaup_submissions',
    USER_SCORE: 'omegaup_user_score',
    USER_SOLVED: 'omegaup_user_solved',
    USER_ATTEMPTED: 'omegaup_user_attempted'
};

export const StorageService = {
    // Get all problems combining initial + custom created ones
    getAllProblems() {
        try {
            const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROBLEMS) || '[]');
            const customMap = new Map(custom.map(p => [p.id, p]));
            const initialMap = new Map(INITIAL_PROBLEMS.map(p => [p.id, p]));
            
            const allMap = new Map([...initialMap, ...customMap]);
            return Array.from(allMap.values());
        } catch (e) {
            console.error('Error reading custom problems from localStorage', e);
            return INITIAL_PROBLEMS;
        }
    },

    // Save a new user-created problem
    saveProblem(newProblem) {
        try {
            const custom = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROBLEMS) || '[]');
            custom.push(newProblem);
            localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(custom));
            return true;
        } catch (e) {
            console.error('Error saving new problem', e);
            return false;
        }
    },

    // Get all submissions history
    getSubmissions() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
        } catch (e) {
            return [];
        }
    },

    // Save a submission entry
    saveSubmission(submission) {
        try {
            const submissions = this.getSubmissions();
            submissions.unshift(submission); // newest first
            localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));

            // Update solved/attempted problems
            const problemId = submission.problemId;
            if (submission.verdict === 'ACCEPTED') {
                const solvedSet = new Set(this.getSolvedProblems());
                solvedSet.add(problemId);
                localStorage.setItem(STORAGE_KEYS.USER_SOLVED, JSON.stringify(Array.from(solvedSet)));
                
                // Recalculate score
                this.updateUserScore();
            } else {
                const attemptedSet = new Set(this.getAttemptedProblems());
                attemptedSet.add(problemId);
                localStorage.setItem(STORAGE_KEYS.USER_ATTEMPTED, JSON.stringify(Array.from(attemptedSet)));
            }

            return submission;
        } catch (e) {
            console.error('Error saving submission', e);
            return null;
        }
    },

    getSolvedProblems() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SOLVED) || '[]');
        } catch (e) {
            return [];
        }
    },

    getAttemptedProblems() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_ATTEMPTED) || '[]');
        } catch (e) {
            return [];
        }
    },

    updateUserScore() {
        const solved = this.getSolvedProblems();
        const allProblems = this.getAllProblems();
        let totalScore = 0;

        solved.forEach(pid => {
            const prob = allProblems.find(p => p.id === pid);
            if (prob) {
                totalScore += prob.points || 100;
            }
        });

        localStorage.setItem(STORAGE_KEYS.USER_SCORE, totalScore);
        return totalScore;
    },

    getUserScore() {
        return parseInt(localStorage.getItem(STORAGE_KEYS.USER_SCORE) || '0', 10);
    },

    getLeaderboard() {
        const userScore = this.getUserScore();
        const userSolvedCount = this.getSolvedProblems().length;
        const userSubmissions = this.getSubmissions().length;
        const userEffectiveness = userSubmissions > 0 
            ? Math.round((this.getSolvedProblems().length / userSubmissions) * 100) 
            : 0;

        const competitors = [
            {
                rank: 1,
                name: "Coder_Java (Tú)",
                avatar: "JV",
                solved: userSolvedCount,
                totalSubmissions: userSubmissions,
                effectiveness: `${userEffectiveness}%`,
                score: userScore,
                isUser: true
            }
        ];

        return competitors;
    }
};
