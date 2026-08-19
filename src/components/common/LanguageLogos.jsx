import React from 'react';
import pythonSvg from '../../assets/python_logo.svg';
import javaSvg from '../../assets/java_logo.svg';

export const PythonLogo = ({ size = 42, className = '' }) => (
    <img src={pythonSvg} alt="Python Logo" width={size} height={size} className={className} style={{ objectFit: 'contain' }} />
);

export const JavaLogo = ({ size = 42, className = '' }) => (
    <img src={javaSvg} alt="Java Logo" width={size} height={size} className={className} style={{ objectFit: 'contain' }} />
);

export const EditorIcon = ({ size = 42, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="6" y="10" width="52" height="44" rx="8" fill="var(--bg-surface-elevated)" stroke="var(--brand-cyan)" strokeWidth="3" />
        <path d="M16 26L24 32L16 38" stroke="var(--brand-cyan)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 40H44" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
);
