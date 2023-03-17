// pass in collections.all | eleventyNavigation, (current) page, and maximum depth level
module.exports = (icon) => {
  let style = '';
  let srText = "aria-hidden='true' focusable='false'";
  let iconClass = 'icon';

  if (icon.width) {
    style += 'width:' + icon.width + '; height:' + icon.width + ';';
  }
  if (icon.alt) {
    srText = "aria-label='" + icon.alt + "'";
  }
  if (icon.class) {
    iconClass = icon.class;
  }
  return `<svg style="${style}" class="${iconClass}" ${srText}><use xlink:href="/icons/icons.svg#svg-${icon.icon}"/></svg>`;
};
