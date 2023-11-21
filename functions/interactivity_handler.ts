import { ViewSubmissionHandler } from "deno-slack-sdk/functions/interactivity/types.ts";
import { KsbLookupFunction } from "./ksb_lookup_function.ts";
import { KSBsDatastore } from "../datastores/ksbs.ts";

export const showDefinitionView: ViewSubmissionHandler<
  typeof KsbLookupFunction.definition
> = async ({ view, client }) => {
  const ksbEntered = view.state.values.terms.action.values;

  const queryResult = await client.apps.datastore.query({
    datastore: KSBsDatastore.name,
    expression: "#ksb = :ksb",
    expression_attributes: { "#ksb": "ksb" },
    expression_values: { ":ksb": ksbEntered },
  });
};
