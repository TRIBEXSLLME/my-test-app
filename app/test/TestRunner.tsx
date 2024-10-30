/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react';
import { TestStatus, TestSuite } from '@/types';
import { saveTestResults } from './actions';

export default function TestRunner() {
  const [status, setStatus] = useState<TestStatus>('idle');
  const [currentSuite, setCurrentSuite] = useState<TestSuite | null>(null);

  const runTests = async () => {
    setStatus('running');
    
    try {
      // We'll create a WebSocket connection to receive real-time test results
      const ws = new WebSocket('ws://localhost:3000/api/ws');
      
      ws.onmessage = async (event) => {
        const testData = JSON.parse(event.data);
        setCurrentSuite(testData);
        
        if (testData.completed) {
          setStatus('completed');
          await saveTestResults(testData);
          ws.close();
        }
      };

      ws.onerror = () => {
        setStatus('error');
      };
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6" data-cy="test-runner-title">
        Cypress Test Runner
      </h1>

      <div className="space-y-6">
        <button
          onClick={runTests}
          disabled={status === 'running'}
          className={`px-4 py-2 rounded-md ${
            status === 'running'
              ? 'bg-gray-400'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
          data-cy="run-tests-button"
        >
          {status === 'running' ? 'Running Tests...' : 'Run Tests'}
        </button>

        {currentSuite && (
          <div className="space-y-4">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                {currentSuite.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-green-500">
                  Passed: {currentSuite.totalPassed}
                </div>
                <div className="text-red-500">
                  Failed: {currentSuite.totalFailed}
                </div>
              </div>
              <div className="space-y-4">
                {currentSuite.results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-md ${
                      result.passed ? 'bg-green-50' : 'bg-red-50'
                    }`}
                    data-cy="test-result"
                  >
                    <h3 className="font-medium">{result.title}</h3>
                    <p className="text-sm text-gray-600">
                      Duration: {result.duration}ms
                    </p>
                    {result.error && (
                      <pre className="mt-2 text-red-600 text-sm whitespace-pre-wrap">
                        {result.error}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}