import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PROBLEMS } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '../../database/devs_db.json');

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

class Database {
    constructor() {
        this.load();
    }

    load() {
        if (!fs.existsSync(DB_PATH)) {
            this.data = {
                problems: [...INITIAL_PROBLEMS],
                submissions: [],
                user: {
                    score: 0,
                    solved: [],
                    attempted: []
                }
            };
            this.save();
        } else {
            try {
                const raw = fs.readFileSync(DB_PATH, 'utf-8');
                const parsed = JSON.parse(raw);
                let problemsList = Array.isArray(parsed.problems) ? parsed.problems : [];
                if (problemsList.length === 0) {
                    problemsList = [...INITIAL_PROBLEMS];
                } else {
                    const existingIds = new Set(problemsList.map(p => p.id));
                    for (const initP of INITIAL_PROBLEMS) {
                        if (!existingIds.has(initP.id)) {
                            problemsList.push(initP);
                        }
                    }
                }
                this.data = {
                    problems: problemsList,
                    submissions: Array.isArray(parsed.submissions) ? parsed.submissions : [],
                    user: parsed.user || { score: 0, solved: [], attempted: [] }
                };
                this.save();
            } catch (e) {
                console.error("Error reading JSON DB, initializing default", e);
                this.data = { problems: [...INITIAL_PROBLEMS], submissions: [], user: { score: 0, solved: [], attempted: [] } };
                this.save();
            }
        }
    }

    save() {
        fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
    }

    getProblems() {
        this.load();
        if (!this.data.problems || this.data.problems.length === 0) {
            this.data.problems = [...INITIAL_PROBLEMS];
            this.save();
        }
        return this.data.problems;
    }

    getProblemById(id) {
        return this.data.problems.find(p => p.id === id);
    }

    addProblem(problem) {
        this.data.problems.push(problem);
        this.save();
        return problem;
    }

    getSubmissions() {
        return this.data.submissions;
    }

    addSubmission(submission) {
        this.data.submissions.unshift(submission);
        
        if (submission.verdict === 'ACCEPTED') {
            if (!this.data.user.solved.includes(submission.problemId)) {
                this.data.user.solved.push(submission.problemId);
                const prob = this.getProblemById(submission.problemId);
                this.data.user.score += (prob ? prob.points || 100 : 100);
            }
        } else {
            if (!this.data.user.attempted.includes(submission.problemId)) {
                this.data.user.attempted.push(submission.problemId);
            }
        }

        this.save();
        return submission;
    }

    getUserStats() {
        return {
            score: this.data.user.score,
            solved: this.data.user.solved,
            attempted: this.data.user.attempted,
            totalSubmissions: this.data.submissions.length
        };
    }
}

export const db = new Database();
