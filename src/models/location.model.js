import { Schema } from 'mongoose';

export const LocationSchema = new Schema(
	{
		type: { type: String, default: 'Point' },
		coordinates: { type: [Number], index: '2dsphere' }
	},
	{ _id: false }
);