import React, { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { ProblemCatalog } from './components/catalog/ProblemCatalog';
import { ProblemWorkspace } from './components/workspace/ProblemWorkspace';
import { SubmissionsView } from './components/views/SubmissionsView';
import { LeaderboardView } from './components/views/LeaderboardView';
import { ProblemCreator } from './components/views/ProblemCreator';
import * as api from './services/api';
import { StorageService } from './services/storage';

export function App() {
    const [theme, setTheme] = useState('dark');
    const [currentView, setView] = useState('problems');
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    const [selectedModuleId, setSelectedModuleId] = useState(null);
    const [evalResults, setEvalResults] = useState(null);
    const [isEvaluating, setIsEvaluating] = useState(false);

    // Student Name state (persisted in localStorage)
    const [studentName, setStudentName] = useState(() => {
        return localStorage.getItem('devs_student_name') || `Alumno #${Math.floor(100 + Math.random() * 900)}`;
    });

    const updateStudentName = (newName) => {
        setStudentName(newName);
        localStorage.setItem('devs_student_name', newName);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const fetchAllData = async () => {
        try {
            let [probsData, userData, subsData, leadData] = await Promise.all([
                api.fetchProblems().catch(() => []),
                api.fetchUserStats().catch(() => null),
                api.fetchSubmissions().catch(() => []),
                api.fetchLeaderboard().catch(() => [])
            ]);

            if (!probsData || probsData.length === 0) {
                probsData = StorageService.getAllProblems();
            }

            setProblems(probsData);
            setUserStats(userData);
            setSubmissions(subsData);
            setLeaderboard(leadData);
        } catch (err) {
            console.error("Error fetching data from MEGA DEVS API:", err);
            setProblems(StorageService.getAllProblems());
        }
    };

    // Auto-polling every 3 seconds for Live Teacher Monitoring across computers
    useEffect(() => {
        fetchAllData();
        const interval = setInterval(() => {
            api.fetchSubmissions().then(subsData => {
                if (subsData && Array.isArray(subsData)) {
                    setSubmissions(subsData);
                }
            }).catch(() => {});
            api.fetchLeaderboard().then(leadData => {
                if (leadData && Array.isArray(leadData)) {
                    setLeaderboard(leadData);
                }
            }).catch(() => {});
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Sync Hash Routing (URL Hash <-> App View State)
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace('#', '') || 'problems';
            if (hash.startsWith('workspace/')) {
                const probId = hash.split('/')[1];
                const found = problems.find(p => p.id === probId);
                if (found) {
                    setSelectedProblem(found);
                    setView('workspace');
                } else if (problems.length > 0) {
                    setView('problems');
                }
            } else if (hash.startsWith('module/')) {
                const modId = hash.split('/')[1];
                setSelectedModuleId(modId);
                setView('problems');
            } else if (['problems', 'submissions', 'leaderboard', 'create'].includes(hash)) {
                if (hash === 'problems') {
                    setSelectedModuleId(null);
                }
                setView(hash);
            }
        };

        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [problems]);

    const navigateToView = (viewName) => {
        if (viewName === 'problems') {
            setSelectedModuleId(null);
        }
        window.location.hash = viewName;
        setView(viewName);
    };

    const handleSelectModule = (modId) => {
        setSelectedModuleId(modId);
        if (modId) {
            window.location.hash = `module/${modId}`;
        } else {
            window.location.hash = 'problems';
        }
    };

    const handleSelectProblem = (problem) => {
        setSelectedProblem(problem);
        setEvalResults(null);
        window.location.hash = `workspace/${problem.id}`;
        setView('workspace');
    };

    const handleRunCustomCode = async (code, input, problemId = null) => {
        try {
            return await api.runCustomCode(code, input, problemId);
        } catch (e) {
            return { error: "Error al comunicarse con la API del Juez" };
        }
    };

    const handleSubmitSolution = async (problemId, code) => {
        setIsEvaluating(true);
        try {
            const data = await api.submitCode(problemId, code, studentName);
            setEvalResults(data);
            await fetchAllData();
        } catch (e) {
            setEvalResults({ verdict: "RUNTIME_ERROR", verdictTitle: "Error de red con el servidor Juez", score: 0 });
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleCreateProblem = async (newProb) => {
        try {
            await api.createProblem(newProb);
            await fetchAllData();
            navigateToView('problems');
            return true;
        } catch (e) {
            console.error("Error creating problem:", e);
        }
        return false;
    };

    return (
        <div id="root">
            <Header
                currentView={currentView}
                setView={navigateToView}
                userStats={userStats}
                theme={theme}
                toggleTheme={toggleTheme}
                studentName={studentName}
                onUpdateStudentName={updateStudentName}
            />

            <main className="main-viewport">
                {currentView === 'problems' && (
                    <ProblemCatalog
                        problems={problems}
                        userStats={userStats}
                        onSelectProblem={handleSelectProblem}
                        onNavigateToCreate={() => navigateToView('create')}
                        selectedModuleId={selectedModuleId}
                        onSelectModule={handleSelectModule}
                    />
                )}

                {currentView === 'workspace' && (
                    <ProblemWorkspace
                        problem={selectedProblem}
                        onBack={() => navigateToView('problems')}
                        onRunCode={handleRunCustomCode}
                        onSubmitCode={handleSubmitSolution}
                        evalResults={evalResults}
                        isEvaluating={isEvaluating}
                        theme={theme}
                    />
                )}

                {currentView === 'submissions' && (
                    <SubmissionsView submissions={submissions} />
                )}

                {currentView === 'leaderboard' && (
                    <LeaderboardView leaderboard={leaderboard} />
                )}

                {currentView === 'create' && (
                    <ProblemCreator onCreateProblem={handleCreateProblem} />
                )}
            </main>
        </div>
    );
}
