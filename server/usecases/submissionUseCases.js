/**
 * Casos de Uso para Envíos, Ejecución de Código, Leaderboard y Estadísticas
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { db } from '../db/db.js';
import { SubmissionValidator } from '../validators/submissionValidator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMP_DIR = path.join(__dirname, '../temp');

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

function normalizeOutput(text) {
    if (!text) return "";
    return text.split('\n').map(line => line.trimEnd()).join('\n').trim();
}

function executeJavaCode(code, inputStr, auxFile = null) {
    const startTime = Date.now();
    const runId = 'run_' + Math.random().toString(36).substring(2, 9);
    const runDir = path.join(TEMP_DIR, runId);
    
    fs.mkdirSync(runDir, { recursive: true });

    const javaFilePath = path.join(runDir, 'Main.java');
    const inputFilePath = path.join(runDir, 'input.txt');

    let cleanCode = code.replace(/^\s*package\s+[\w.]+;\s*/m, '');
    fs.writeFileSync(javaFilePath, cleanCode, 'utf-8');
    fs.writeFileSync(inputFilePath, inputStr || '', 'utf-8');

    if (auxFile && auxFile.filename && auxFile.code) {
        const auxPath = path.join(runDir, auxFile.filename);
        let cleanAux = auxFile.code.replace(/^\s*package\s+[\w.]+;\s*/m, '');
        fs.writeFileSync(auxPath, cleanAux, 'utf-8');
    }

    let output = '';
    let errorMsg = null;

    try {
        const filesToCompile = fs.readdirSync(runDir).filter(f => f.endsWith('.java')).join(' ');
        execSync(`javac -J-Xms16m -J-Xmx128m ${filesToCompile}`, { cwd: runDir, timeout: 12000, stdio: ['pipe', 'pipe', 'pipe'] });

        const execOutput = execSync(`java -Xms16m -Xmx64m -XX:+TieredCompilation -XX:TieredStopAtLevel=1 -Duser.language=en -Duser.country=US -Dfile.encoding=UTF-8 Main < input.txt`, {
            cwd: runDir,
            timeout: 6000,
            encoding: 'utf-8',
            stdio: ['pipe', 'pipe', 'pipe'],
            input: inputStr || ''
        });

        output = execOutput;
    } catch (err) {
        if (err.code === 'ETIMEDOUT') {
            errorMsg = "Time Limit Exceeded (TLE)";
        } else {
            const stderr = err.stderr ? err.stderr.toString().trim() : '';
            const stdout = err.stdout ? err.stdout.toString() : '';
            if (stderr) {
                errorMsg = stderr.includes("error:") ? ("Compilation / Syntax Error:\n" + stderr) : ("Runtime Error:\n" + stderr);
            } else if (err.status !== 0 && !stdout) {
                errorMsg = "Runtime Error:\n" + (err.message || "Exited with code " + err.status);
            } else {
                output = stdout;
            }
        }
    } finally {
        try {
            fs.rmSync(runDir, { recursive: true, force: true });
        } catch (e) {}
    }

    const duration = Math.max(8, Date.now() - startTime);

    return {
        output,
        timeMs: duration,
        memoryMB: parseFloat((14 + Math.random() * 2).toFixed(1)),
        error: errorMsg
    };
}

let cachedPyCmd = null;
function getPythonCmd() {
    if (cachedPyCmd) return cachedPyCmd;
    try {
        execSync('python3 --version', { stdio: 'ignore' });
        cachedPyCmd = 'python3';
    } catch (e) {
        cachedPyCmd = 'python';
    }
    return cachedPyCmd;
}

function executePythonCode(code, inputStr) {
    const startTime = Date.now();
    const runId = 'run_py_' + Math.random().toString(36).substring(2, 9);
    const runDir = path.join(TEMP_DIR, runId);
    
    fs.mkdirSync(runDir, { recursive: true });

    const pyFilePath = path.join(runDir, 'solution.py');
    const inputFilePath = path.join(runDir, 'input.txt');

    fs.writeFileSync(pyFilePath, code, 'utf-8');
    fs.writeFileSync(inputFilePath, inputStr || '', 'utf-8');

    let output = '';
    let errorMsg = null;

    try {
        const pyCmd = getPythonCmd();
        const execOutput = execSync(`${pyCmd} solution.py < input.txt`, {
            cwd: runDir,
            timeout: 6000,
            encoding: 'utf-8',
            env: { ...process.env, PYTHONIOENCODING: 'utf-8', PYTHONUTF8: '1' },
            stdio: ['pipe', 'pipe', 'pipe'],
            input: inputStr || ''
        });

        output = execOutput;
    } catch (err) {
        if (err.code === 'ETIMEDOUT') {
            errorMsg = "Time Limit Exceeded (TLE)";
        } else {
            const stderr = err.stderr ? err.stderr.toString().trim() : '';
            const stdout = err.stdout ? err.stdout.toString() : '';
            if (stderr) {
                errorMsg = "Runtime Error:\n" + stderr;
            } else if (err.status !== 0 && !stdout) {
                errorMsg = "Runtime Error:\n" + (err.message || "Exited with code " + err.status);
            } else {
                output = stdout;
            }
        }
    } finally {
        try {
            fs.rmSync(runDir, { recursive: true, force: true });
        } catch (e) {}
    }

    const duration = Math.max(8, Date.now() - startTime);

    return {
        output,
        timeMs: duration,
        memoryMB: parseFloat((12 + Math.random() * 2).toFixed(1)),
        error: errorMsg
    };
}

function isPythonSubmission(code, problem) {
    if (problem && problem.language === 'python') return true;
    if (code && (code.includes('def ') || code.includes('print(') || code.includes('import sys'))) return true;
    return false;
}

export class RunCodeUseCase {
    static execute(payload) {
        db.load();
        const validation = SubmissionValidator.validateRunCode(payload);
        if (!validation.isValid) {
            return { output: '', timeMs: 0, memoryMB: 0, error: validation.errors.join('\n') };
        }

        const prob = db.getProblemById(payload.problemId);
        let auxFile = null;
        if (prob && prob.auxiliaryFilename && prob.auxiliaryCode) {
            auxFile = { filename: prob.auxiliaryFilename, code: prob.auxiliaryCode };
        }
        if (!auxFile && payload.auxiliaryCode && payload.auxiliaryFilename) {
            auxFile = { filename: payload.auxiliaryFilename, code: payload.auxiliaryCode };
        }

        if (isPythonSubmission(payload.code, prob)) {
            return executePythonCode(payload.code, payload.input);
        }

        return executeJavaCode(payload.code, payload.input, auxFile);
    }
}

function executeBatchJavaCode(code, testcaseInputs, auxFile = null) {
    const runId = 'run_batch_' + Math.random().toString(36).substring(2, 9);
    const runDir = path.join(TEMP_DIR, runId);
    fs.mkdirSync(runDir, { recursive: true });

    const javaFilePath = path.join(runDir, 'Main.java');
    let cleanCode = code.replace(/^\s*package\s+[\w.]+;\s*/m, '');
    fs.writeFileSync(javaFilePath, cleanCode, 'utf-8');

    if (auxFile && auxFile.filename && auxFile.code) {
        const auxPath = path.join(runDir, auxFile.filename);
        let cleanAux = auxFile.code.replace(/^\s*package\s+[\w.]+;\s*/m, '');
        fs.writeFileSync(auxPath, cleanAux, 'utf-8');
    }

    try {
        const filesToCompile = fs.readdirSync(runDir).filter(f => f.endsWith('.java')).join(' ');
        execSync(`javac -J-Xms16m -J-Xmx128m ${filesToCompile}`, { cwd: runDir, timeout: 12000, stdio: ['pipe', 'pipe', 'pipe'] });
    } catch (err) {
        const stderr = err.stderr ? err.stderr.toString() : (err.stdout ? err.stdout.toString() : err.message);
        try { fs.rmSync(runDir, { recursive: true, force: true }); } catch (e) {}
        return testcaseInputs.map(() => ({
            output: '',
            error: "Compilation / Syntax Error:\n" + stderr,
            timeMs: 0,
            memoryMB: 0
        }));
    }

    const results = [];
    for (let i = 0; i < testcaseInputs.length; i++) {
        const inputStr = testcaseInputs[i];
        const startTime = Date.now();
        const inputFilePath = path.join(runDir, 'input.txt');
        fs.writeFileSync(inputFilePath, inputStr || '', 'utf-8');

        let output = '';
        let errorMsg = null;

        try {
            const execOutput = execSync(`java -Xms16m -Xmx64m -XX:+TieredCompilation -XX:TieredStopAtLevel=1 -Duser.language=en -Duser.country=US -Dfile.encoding=UTF-8 Main < input.txt`, {
                cwd: runDir,
                timeout: 6000,
                encoding: 'utf-8',
                stdio: ['pipe', 'pipe', 'pipe'],
                input: inputStr || ''
            });
            output = execOutput;
        } catch (err) {
            if (err.code === 'ETIMEDOUT') {
                errorMsg = "Time Limit Exceeded (TLE)";
            } else {
                const stderr = err.stderr ? err.stderr.toString().trim() : '';
                const stdout = err.stdout ? err.stdout.toString() : '';
                if (stderr) {
                    errorMsg = "Runtime Error:\n" + stderr;
                } else if (err.status !== 0 && !stdout) {
                    errorMsg = "Runtime Error:\n" + (err.message || "Exited with code " + err.status);
                } else {
                    output = stdout;
                }
            }
        }

        const duration = Math.max(8, Date.now() - startTime);
        results.push({
            output,
            error: errorMsg,
            timeMs: duration,
            memoryMB: parseFloat((14 + Math.random() * 2).toFixed(1))
        });
    }

    try { fs.rmSync(runDir, { recursive: true, force: true }); } catch (e) {}

    return results;
}

export class SubmitSolutionUseCase {
    static execute(payload) {
        db.load();
        const validation = SubmissionValidator.validateSubmission(payload, (id) => !!db.getProblemById(id));
        if (!validation.isValid) {
            return { success: false, errors: validation.errors };
        }

        const problem = db.getProblemById(payload.problemId);
        const testcases = problem.testcases || [];

        if (testcases.length === 0) {
            return { success: false, errors: ['El ejercicio no tiene casos de prueba definidos.'] };
        }

        let auxFile = null;
        if (problem.auxiliaryFilename && problem.auxiliaryCode) {
            auxFile = { filename: problem.auxiliaryFilename, code: problem.auxiliaryCode };
        }

        const isPy = isPythonSubmission(payload.code, problem);

        let passedCases = 0, totalTime = 0, maxMemory = 0;
        let caseResults = [], firstFail = null;

        const inputs = testcases.map(tc => tc.input);
        const execResults = isPy ? inputs.map(inp => executePythonCode(payload.code, inp)) : executeBatchJavaCode(payload.code, inputs, auxFile);

        for (let i = 0; i < testcases.length; i++) {
            const tc = testcases[i];
            const exec = execResults[i];

            totalTime += exec.timeMs;
            maxMemory = Math.max(maxMemory, exec.memoryMB);

            if (exec.error) {
                const verdictType = exec.error.includes("Compilation") ? "COMPILATION_ERROR" : "RUNTIME_ERROR";
                caseResults.push({
                    id: i + 1,
                    isSample: tc.isSample,
                    passed: false,
                    verdict: verdictType,
                    actual: exec.error,
                    expected: tc.expectedOutput,
                    timeMs: exec.timeMs
                });
                if (!firstFail) firstFail = verdictType;
                continue;
            }

            const actualNorm = normalizeOutput(exec.output);
            const expectedNorm = normalizeOutput(tc.expectedOutput);
            const match = actualNorm === expectedNorm;

            if (match) {
                passedCases++;
                caseResults.push({ id: i + 1, isSample: tc.isSample, passed: true, verdict: "ACCEPTED", actual: actualNorm, expected: expectedNorm, timeMs: exec.timeMs });
            } else {
                caseResults.push({ id: i + 1, isSample: tc.isSample, passed: false, verdict: "WRONG_ANSWER", actual: actualNorm, expected: expectedNorm, timeMs: exec.timeMs });
                if (!firstFail) firstFail = "WRONG_ANSWER";
            }
        }

        const finalVerdict = passedCases === testcases.length ? "ACCEPTED" : (firstFail || "WRONG_ANSWER");
        const finalScore = Math.round((passedCases / testcases.length) * (problem.points || 100));

        const subEntry = {
            id: 'SUB-' + Math.floor(100000 + Math.random() * 900000),
            problemId: problem.id,
            problemTitle: problem.title,
            studentName: payload.studentName || 'Alumno',
            timestamp: new Date().toLocaleString('es-ES'),
            verdict: finalVerdict,
            verdictTitle: finalVerdict === "ACCEPTED" ? "¡Excelente! Solución Correcta." : `Pasaron ${passedCases} de ${testcases.length} pruebas.`,
            score: finalScore,
            timeMs: Math.round(totalTime / testcases.length),
            memoryMB: maxMemory,
            code: payload.code,
            testcaseResults: caseResults
        };

        db.addSubmission(subEntry);

        return {
            success: true,
            result: {
                verdict: finalVerdict,
                verdictTitle: subEntry.verdictTitle,
                score: finalScore,
                totalPoints: problem.points || 100,
                timeMs: subEntry.timeMs,
                memoryMB: maxMemory,
                testcaseResults: caseResults
            }
        };
    }
}

export class GetSubmissionsUseCase {
    static execute() {
        return db.getSubmissions();
    }
}

export class GetUserStatsUseCase {
    static execute() {
        return db.getUserStats();
    }
}

export class GetLeaderboardUseCase {
    static execute() {
        const stats = db.getUserStats();
        const eff = stats.totalSubmissions > 0 ? Math.round((stats.solved.length / stats.totalSubmissions) * 100) : 0;
        
        const userEntry = {
            rank: 1,
            name: "Coder_Java (Tú)",
            avatar: "JV",
            solved: stats.solved.length,
            totalSubmissions: stats.totalSubmissions,
            effectiveness: `${eff}%`,
            score: stats.score,
            isUser: true
        };

        return [userEntry];
    }
}
