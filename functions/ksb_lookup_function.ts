import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import {
  showConfirmationView,
  showDefinitionSubmissionView,
  showDefinitionView,
} from "./interactivity_handler.ts";

export const KsbLookupFunction = DefineFunction({
  callback_id: "ksb_lookup_function",
  title: "Find a KSB",
  source_file: "functions/ksb_lookup_function.ts",
  input_parameters: {
    properties: { interactivity: { type: Schema.slack.types.interactivity } },
    required: ["interactivity"],
  },
  output_parameters: { properties: {}, required: [] },
})

export default SlackFunction(
  KsbLookupFunction,
  async ({ inputs, client}) => {
    const response = await client.views.open({
      interactivity_pointer: inputs.interactivity.interactivity_pointer,
      view: {
        "type": "modal",
        "callback_id": "first-page",
        "notify_on_close": false,
        "title": { "type": "plain_text", "text": "Search for a KSB" },
        "submit": { "type": "plain_text", "text": "Search" },
        "close": { "type": "plain_text", "text": "Close" },
        "blocks" : [
          { 
            "type": "input",
            "block_id": "ksb",
            "element": { "type": "plain_text_input", "action_id": "action" },
            "label" : { "type" : "plain_text", "text": "KSB" },
          },
        ],
      },
    });
    if (response.error) {
      const error = `Failed to open a modal in the KSB lookip workflow. Contact the app maintainers with the following information - error: ${response.error})`;
      return { error };
    }
    return {
      completed: false,
    };
  },
)