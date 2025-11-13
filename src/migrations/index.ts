import * as migration_20251104_221026 from './20251104_221026';

export const migrations = [
  {
    up: migration_20251104_221026.up,
    down: migration_20251104_221026.down,
    name: '20251104_221026'
  },
];
