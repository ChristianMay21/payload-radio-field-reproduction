import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    {
      slug: "collection_1",
      fields: [
        {
          name: "radio_field_1",
          type: "radio",
          options: [
            {
              label: "Option 1",
              value: "option_1",
            },
            {
              label: "Option 2",
              value: "option_2",
            },
          ],
        },
        {
          name: "array_of_related_collection_2",
          type: "array",
          label: "Array Field of Related collection_2 documents",
          labels: {
            singular: "Collection 2 Document",
            plural: "Collection 2 Documents",
          },
          fields: [
            {
              name: "Related_Collection_2_Document",
              type: "relationship",
              relationTo: "collection_2",
            },
          ],
        },
      ],
      admin: {
        useAsTitle: "name",
      },
    },
    {
      slug: "collection_2",
      fields: [
        {
          name: "radio_field_1",
          type: "radio",
          options: [
            {
              label: "Option 1",
              value: "option_1",
            },
            {
              label: "Option 2",
              value: "option_2",
            },
          ],
        },
        {
          name: "radio_field_2",
          type: "radio",
          options: [
            {
              label: "Option 1",
              value: "option_1",
            },
            {
              label: "Option 2",
              value: "option_2",
            },
          ],
        },
      ],
      admin: {
        useAsTitle: "name",
      },
    },
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
