import { Discord} from "@typeit/discord";
import * as Path from "path";
import { Stats } from "../commands/stats";

@Discord("!", {
  import: [
    Path.join(__dirname, "..", "commands", "*.ts"),
    Stats
  ]
})
abstract class AppDiscord {
  
}