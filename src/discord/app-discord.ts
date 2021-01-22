import { Discord} from "@typeit/discord";
import * as Path from "path";
import { Id } from "../commands/id";

@Discord("!", {
  import: [
    Path.join(__dirname, "..", "commands", "*.ts"),
    Id
  ]
})
abstract class AppDiscord {
  
}