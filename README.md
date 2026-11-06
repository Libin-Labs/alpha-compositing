# @lp-labs/alpha-compositing

Straight-alpha foreground-over-background compositing for normalized encoded sRGB channels.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/alpha-compositing
```

## Working example

```js
import { compositeOver } from '@lp-labs/alpha-compositing';
const result = compositeOver({ r: 1, g: 0, b: 0, a: 0.5 }, { r: 0, g: 0, b: 1, a: 1 });
if (Math.abs(result.r - 0.5) > 1e-12 || result.b !== 0.5) throw new Error('Unexpected compositing');
```

CommonJS: `const api = require('@lp-labs/alpha-compositing')`.

## Behavior, customization and limits

RGBA components are finite [0,1] values. `compositeOver` uses the documented straight-alpha source-over equations on encoded sRGB components and returns a fresh RGBA object; it does not linearize light or apply color management.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export interface RGBA {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
}
export declare function compositeOver(foreground: RGBA, background: RGBA): RGBA;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
