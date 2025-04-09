module.exports = {
    default: [
      '--require-module ts-node/register',
      '--require tests/steps/root.ts',
      '--require tests/steps/**/*.ts',
      '--publish-quiet',
      'tests/features/**/*.feature'
    ].join(' ')
  };
  