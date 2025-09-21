'use client';
import React, { useState } from 'react';
import styles from './advancePage.module.css';

const tonalityOptions = [
  'Formal',
  'Informal',
  'Friendly',
  'Professional',
  'Persuasive',
  'Neutral',
];

const AdvancePage = () => {
  const [purpose, setPurpose] = useState('Describe the purpose of this page here...');
  const [editingPurpose, setEditingPurpose] = useState(false);

  const [subject, setSubject] = useState('Enter the subject here...');
  const [editingSubject, setEditingSubject] = useState(false);

  const [tonality, setTonality] = useState('Neutral');

  // Helper function to count words
  const wordCount = text =>
    text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className={styles.container} style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '24px',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>
        <strong>Advance Page</strong>
      </h1>
      
      <section className={styles.section} style={{
        marginBottom: '28px',
        padding: '18px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#f9f9f9'
      }}>
        <h2 style={{ marginBottom: '10px' }}>Purpose</h2>
        {editingPurpose ? (
          <textarea
            value={purpose}
            onChange={e => setPurpose(e.target.value)}
            rows={4}
            cols={50}
            style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        ) : (
          <p style={{ marginBottom: '10px' }}>{purpose}</p>
        )}
        <div style={{ marginBottom: '10px', color: '#888' }}>Word count: {wordCount(purpose)}</div>
        <button
          className={styles.button}
          onClick={() => setEditingPurpose(!editingPurpose)}
          style={{
            padding: '6px 16px',
            borderRadius: '4px',
            border: 'none',
            background: '#1976d2',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {editingPurpose ? 'Save' : 'Edit Purpose'}
        </button>
      </section>

      <section className={styles.section} style={{
        marginBottom: '28px',
        padding: '18px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#f9f9f9'
      }}>
        <h2 style={{ marginBottom: '10px' }}>Subject</h2>
        {editingSubject ? (
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{ width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        ) : (
          <p style={{ marginBottom: '10px' }}>{subject}</p>
        )}
        <div style={{ marginBottom: '10px', color: '#888' }}>Word count: {wordCount(subject)}</div>
        <button
          className={styles.button}
          onClick={() => setEditingSubject(!editingSubject)}
          style={{
            padding: '6px 16px',
            borderRadius: '4px',
            border: 'none',
            background: '#1976d2',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
          {editingSubject ? 'Save' : 'Edit Subject'}
        </button>
      </section>

      <section className={styles.section} style={{
        marginBottom: '28px',
        padding: '18px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        background: '#f9f9f9'
      }}>
        <h2 style={{ marginBottom: '10px' }}>Tonality</h2>
        <select
          value={tonality}
          onChange={e => setTonality(e.target.value)}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px' }}
        >
          {tonalityOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div>Selected tonality: <strong>{tonality}</strong></div>
      </section>
      {/* ...existing code... */}
    </div>
  );
};

export default AdvancePage;