export const fetchProblems = async () => {
    const res = await fetch('/api/problems');
    if (!res.ok) throw new Error('Error al obtener la lista de problemas');
    return await res.json();
};

export const fetchUserStats = async () => {
    const res = await fetch('/api/user');
    if (!res.ok) throw new Error('Error al obtener estadísticas del usuario');
    return await res.json();
};

export const fetchSubmissions = async () => {
    const res = await fetch('/api/submissions');
    if (!res.ok) throw new Error('Error al obtener los envíos');
    return await res.json();
};

export const fetchLeaderboard = async () => {
    const res = await fetch('/api/leaderboard');
    if (!res.ok) throw new Error('Error al obtener la tabla de posiciones');
    return await res.json();
};

export const runCustomCode = async (code, input, problemId = null) => {
    const res = await fetch('/api/judge/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, input, problemId })
    });
    return await res.json();
};

export const submitCode = async (problemId, code, studentName = 'Alumno') => {
    const res = await fetch('/api/judge/eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId, code, studentName })
    });
    return await res.json();
};

export const createProblem = async (problemData) => {
    const res = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(problemData)
    });
    if (!res.ok) throw new Error('Error al crear el problema');
    return await res.json();
};
