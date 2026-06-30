import * as migration_20251104_221026 from './20251104_221026';
import * as migration_20260629_162408_add_user_api_keys from './20260629_162408_add_user_api_keys';

export const migrations = [
  {
    up: migration_20251104_221026.up,
    down: migration_20251104_221026.down,
    name: '20251104_221026',
  },
  {
    up: migration_20260629_162408_add_user_api_keys.up,
    down: migration_20260629_162408_add_user_api_keys.down,
    name: '20260629_162408_add_user_api_keys'
  },
];
