import { Discord } from '@typeit/discord';
import * as Path from "path";

import { Id } from "../commands/id";
import { Level } from "../commands/level";
import { Playtime } from "../commands/playtime";
import { R6Username } from "../commands/r6-username";
import { Rank } from "../commands/rank";
import { Stats } from "../commands/stats";

@Discord("/", {
  import: [
    Path.join(__dirname, "..", "commands", "*.ts"),
    Id,
    R6Username,
    Playtime,
    Level,
    Rank,
    Stats
  ]
})
abstract class AppDiscord {

}