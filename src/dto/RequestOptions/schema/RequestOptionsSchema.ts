import { z } from 'zod';

const FetchOptionsSchema = z.object({
  cache: z
    .union([
      z.literal('default'),
      z.literal('no-store'),
      z.literal('reload'),
      z.literal('no-cache'),
      z.literal('force-cache'),
      z.literal('only-if-cached'),
    ])
    .optional(),
  credentials: z
    .union([z.literal('omit'), z.literal('same-origin'), z.literal('include')])
    .optional(),
  headers: z.record(z.string(), z.string()).optional(), // Adjust if your headers have specific structure
  integrity: z.string().optional(),
  keepalive: z.boolean().optional(),
  mode: z
    .union([
      z.literal('navigate'),
      z.literal('same-origin'),
      z.literal('no-cors'),
      z.literal('cors'),
    ])
    .optional(),
  redirect: z
    .union([z.literal('follow'), z.literal('manual'), z.literal('error')])
    .optional(),
  referrer: z.string().optional(),
  referrerPolicy: z
    .union([
      z.literal('no-referrer'),
      z.literal('no-referrer-when-downgrade'),
      z.literal('origin'),
      z.literal('origin-when-cross-origin'),
      z.literal('unsafe-url'),
      z.literal('strict-origin'),
      z.literal('strict-origin-when-cross-origin'),
    ])
    .optional(),
  signal: z.any().optional(),
  window: z.any().optional(),
});

export const RequestOptionsSchema = z.object({
  timeoutMs: z.number().optional(),
  retries: z.any().optional(), // Use a specific schema for `RetryConfig` if available
  retryCodes: z.array(z.string()).optional(),
  fetchOptions: FetchOptionsSchema.optional(),
});

// Export the schema type for type inference
export type RequestOptionsType = z.infer<typeof RequestOptionsSchema>;
