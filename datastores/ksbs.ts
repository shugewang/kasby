// terms.ts
import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export const KSBsDatastore = DefineDatastore({
  name: "ksbs",
  primary_key: "id",
  attributes: {
    id: { type: Schema.types.string },
    ksb: { type: Schema.types.string },
    definition: { type: Schema.types.string },
  },
});
