export interface TestResult {
    passed: number;
    failed: number;
    output: string;
    timestamp?: Date;
    error?: string;
  }
  
  export type TestStatus = 'idle' | 'running' | 'completed' | 'error';