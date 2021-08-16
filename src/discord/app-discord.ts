import { Discord } from '@typeit/discord';

import { Help } from '../commands/help';
import { Id } from '../commands/id';
import { Level } from '../commands/level';
import { Playtime } from '../commands/playtime';
import { Link } from '../commands/link';
import { Rank } from '../commands/rank';
import { Stats } from '../commands/stats';
import { Status } from '../commands/status';

@Discord('!', {
  import: [
    Help,
    Id,
    Link,
    Playtime,
    Level,
    Rank,
    Stats,
    Status,
  ]
})
abstract class AppDiscord {

}