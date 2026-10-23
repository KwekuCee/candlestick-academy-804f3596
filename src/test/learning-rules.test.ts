import { describe, expect, it } from 'vitest';
import { gradeQuiz, requiredWatchMinutes } from '@/server/learning';

const qs = [0, 1, 2, 3].map((c, i) => ({ id: `q${i}`, question: 'q', options: ['a', 'b', 'c', 'd'], correctIndex: c }));

describe('server learning rules', () => {
  it('grades from submitted answers and passes at 70%', () => {
    expect(gradeQuiz(qs, [0, 1, 2, 0])).toEqual({ correct: 3, total: 4, percent: 75, passed: true });
    expect(gradeQuiz(qs, [0, 1, 0, 0]).passed).toBe(false);
  });
  it('requires 80% of the lesson length, or 5 minutes when unknown', () => {
    expect(requiredWatchMinutes(20)).toBe(16);
    expect(requiredWatchMinutes(null)).toBe(5);
  });
});
