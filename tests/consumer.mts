import * as api from '@lp-labs/alpha-compositing';
import { compositeOver } from '@lp-labs/alpha-compositing';
const result = compositeOver({ r: 1, g: 0, b: 0, a: 0.5 }, { r: 0, g: 0, b: 1, a: 1 });
if (Math.abs(result.r - 0.5) > 1e-12 || result.b !== 0.5) throw new Error('Unexpected compositing');
// @ts-expect-error invalid argument must be rejected by declarations
api.compositeOver({ r: 0, g: 0, b: 0 }, { r: 0, g: 0, b: 0, a: 1 });
