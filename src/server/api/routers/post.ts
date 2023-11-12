import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

function validateNoteIndexes(instrument: string, noteIndex: number[]): void {
  let expectedLength: number;

  switch (instrument) {
    case 'acoustic':
    case 'electric':
      expectedLength = 6;
      break;
    case 'bass':
    case 'ukulele':
      expectedLength = 4;
      break;
    default:
      throw new Error(`Invalid instrument: ${instrument}`);
  }

  if (noteIndex.length !== expectedLength) {
    throw new Error(`For ${instrument} instruments, noteIndex should consist of an array of ${expectedLength} integers.`);
  }

  for (const index of noteIndex) {
    if (index < 0 || index > 11) {
      throw new Error('Each integer in noteIndex must be between 0 and 11.');
    }
  }
};

export const postRouter = createTRPCRouter({
  createTuning: protectedProcedure
    .input(z.object({
      instrument: z.enum(['acoustic', 'electric', 'bass', 'ukulele']),
      noteIndexes: z.array(z.number()),
      name: z.string().refine((value) => value.length <= 30, {
        message: "Name must be at most 30 characters.",
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      const { noteIndexes, instrument, name } = input;

      // Validate noteIndex based on instrument type
      validateNoteIndexes(instrument, noteIndexes);

      // Create tuning and associate it with the current user
      return ctx.db.tuning.create({
        data: {
          name,
          instrument,
          noteIndexes,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getUserTunings: protectedProcedure
    .input(z.object({
      instrument: z.enum(['acoustic', 'electric', 'bass', 'ukulele'])
    }))
    .query(async ({ ctx, input }) => {
      const { instrument } = input;
      // Fetch tunings associated with the current user
      return ctx.db.tuning.findMany({
        where: {
          createdBy: {
            id: ctx.session.user.id,
          },
          instrument
        },
      });
    }),
});