aria-roles
(1 occurrence)
error

ARIA roles used must conform to valid values

<button _ngcontent-ng-c1931235059="" role="polite" type="submit" class="mc__form-calculate f-button  ...

Learn more
nested-interactive
(2 occurrences)
error

Interactive controls must not be nested

<div _ngcontent-ng-c1931235059="" role="radio" class="f-custom-radio w-100 text-present-3" aria-chec ...

element-required-attributes
(1 occurrence)
error

<input> is missing required "type" attribute

<input _ngcontent-ng-c1931235059="" id="mortgageAmount" formcontrolname="mortgageAmount" aria-descri ...

Learn more
prefer-native-element
(2 occurrences)
error

Prefer to use the native <input> element

<div _ngcontent-ng-c1931235059="" role="radio" class="f-custom-radio w-100 text-present-3" aria-chec ...


declaration-property-unit-disallowed-list
(37 occurrences)
warning

Consider using relative units (em, rem) instead of absolute units (px, pt) to support resizing and improve accessibility.

max-width: 688px;

project/src/app/components/mortgage-calculator/mortgage-calculator.scss:6
Learn more
frontend-mentor/prefers-reduced-motion
(1 occurrence)
warning

Provide alternatives for users who prefer reduced motion to prevent motion sickness and other accessibility issues.

transition: background-color 0.2s ease-in-out;

project/src/app/pages/page-not-found/page-not-found.scss:35
Learn more
declaration-no-important
(5 occurrences)
warning

Avoid !important as it breaks the natural cascade and makes future style changes more difficult to implement.

animation-duration: 0.01ms !important;

project/src/sass/base/_reset.scss:69
Learn more
declaration-block-no-duplicate-properties
(2 occurrences)
warning

Remove duplicate properties to improve code maintainability and prevent unexpected styling behavior.

padding: 0 8px;

project/src/sass/utils/_helpers.scss:168
Learn more
selector-max-specificity
(3 occurrences)
warning

Keep selector specificity low to maintain a flat hierarchy that is easier to maintain and override when needed.

input:checked + .f-radio-text {
    border-color: var(--clr-lime);
    background-color: var(--bg-li ...

project/src/sass/utils/_helpers.scss:254
Learn more
frontend-mentor/use-logical-properties
(7 occurrences)
info

Use logical properties (e.g., inline-start instead of left) to support different reading directions and improve internationalization.

margin-bottom: 8px;

project/src/app/components/mortgage-calculator/mortgage-calculator.scss:13
Learn more
frontend-mentor/encourage-css-functions
(20 occurrences)
info

Consider using CSS functions like calc(), min(), and clamp() to create more responsive and flexible layouts that adapt to different viewport sizes.

padding: 32px 24px;

project/src/app/components/mortgage-calculator/mortgage-calculator.scss:7
Learn more
frontend-mentor/large-shorthand
(1 occurrence)
info

Avoid large shorthand declarations that can unintentionally override other styles and make debugging more difficult.

padding: 10px 5px 10px 40px;

project/src/sass/utils/_helpers.scss:249