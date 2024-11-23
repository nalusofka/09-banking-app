import { renderHook } from '@testing-library/react';
import { MockAppContextProvider } from '../../../../../src/app/core/state/MockAppContext';
import useAuthHandler from '../../../../../src/app/core/hooks/auth/useAuthHandler';
import { vi } from 'vitest';

vi.mock('../../../../../src/app/core/state/actions', () => ({
  actionRequest: vi.fn((payload) => ({
    type: 'AUTH_REQUEST',
    payload,
  })),
}));

describe('useAuthHandler', () => {
  test('debería estar definido', () => {
    const { result } = renderHook(() => useAuthHandler(), {
      wrapper: MockAppContextProvider,
    });

    expect(result.current).toBeDefined();
  });

  test('debería exponer la función handleRequest', () => {
    const { result } = renderHook(() => useAuthHandler(), {
      wrapper: MockAppContextProvider,
    });

    expect(typeof result.current.handleRequest).toBe('function');
  });
});
