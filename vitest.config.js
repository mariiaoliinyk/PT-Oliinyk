import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',  // для тестування веб-компонентів
    globals: true,          // дозволяє використовувати describe, it, expect без імпорту
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],  // звіт про покриття
      exclude: ['node_modules/', 'test/'] // що не включати в покриття
    }
  }
});
