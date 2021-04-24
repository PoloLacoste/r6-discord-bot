import { Discord } from '@typeit/discord';

import { Help } from '../commands/help';
import { Id } from "../commands/id";
import { Level } from "../commands/level";
import { Playtime } from "../commands/playtime";
import { R6Username } from "../commands/r6-username";
import { Rank } from "../commands/rank";
import { Stats } from "../commands/stats";

@Discord("!", {
  import: [
    Id,
    R6Username,
    Playtime,
    Level,
    Rank,
    Stats,
    Help
  ]
})
abstract class AppDiscord {

}