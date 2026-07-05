import { defineMcp } from "@lovable.dev/mcp-js";
import listStyles from "./tools/list-styles";
import describeStyle from "./tools/describe-style";

export default defineMcp({
  name: "anigen-mcp",
  title: "AniGen",
  version: "0.1.0",
  instructions:
    "Tools for AniGen, an app that turns photos into anime art. Use `list_anime_styles` to discover available styles and `describe_anime_style` to fetch the exact prompt used for a specific style.",
  tools: [listStyles, describeStyle],
});
