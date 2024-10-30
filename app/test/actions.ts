'use server'

import { MongoClient } from 'mongodb';
import { TestResult } from '@/types';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;

export async function saveTestResults(results: TestResult) {
  try {
    const client = await MongoClient.connect(uri);
    const db = client.db('cypress-tests');
    
    await db.collection('results').insertOne({
      ...results,
      timestamp: new Date()
    });

    await client.close();
    return { success: true };
  } catch (error) {
    console.error('Error saving test results:', error);
    return { success: false, error: 'Failed to save test results' };
  }
}