import { calculateSpaceScale } from "utopia-core";

/**
 * Define your spacing scale here
 * You can use the `calculateSpaceScale` function from `utopia-core` to generate a scale, visually customizable on https://utopia.fyi/space/calculator/ and copyable to your project in the "PostCSS" tab on the site
 * Or you can write your own scale manually with the `interpolate` function
 */

/**
 * Example of using `calculateSpaceScale` to generate a scale
 */

const spaceScale = calculateSpaceScale({
  minWidth: 320,
  maxWidth: 1240,
  minSize: 16,
  maxSize: 20,
  positiveSteps: [1.5, 2, 4, 6, 8, 10, 20],
  negativeSteps: [0.75, 0.5, 0.25],
  prefix: "space",
  relativeTo: "viewport-width",
});

export const spacing = [
  ...spaceScale.sizes,
  ...spaceScale.oneUpPairs,
  ...spaceScale.customPairs,
].reduce(
  (obj, item) => ({
    ...obj,
    ...{ [item.label]: item.clamp },
  }),
  {}
);
