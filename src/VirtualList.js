import { createElement, useState, useMemo } from "react";


// This should be memoized
const getRangeToRender = (
  scrollOffset,
  itemSize,
  height,
  itemCount,
  scrollDirection
) => {
  const fwdOverscan = scrollDirection > 0 ? 2 : 0;
  const bkwdOverscan = scrollDirection < 0 ? 2 : 0;

  const startIndex = Math.max(
    0,
    Math.min(itemCount - 1, Math.floor(scrollOffset / itemSize) - bkwdOverscan)
  );
  const offset = startIndex * itemSize;
  const numVisibleItems = Math.ceil(
    (height + scrollOffset - offset) / itemSize
  );
  const endIndex = Math.max(
    0,
    Math.min(
      itemCount - 1,
      startIndex + numVisibleItems + fwdOverscan - 1 // -1 is because stop index is inclusive
    )
  );

  return [startIndex, endIndex];
};

export default function VirtualList({
  children,
  width,
  height,
  sectionCounts,
  itemSize,
  component
}) {
  const classes = useStyles();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(0);

  // Keep track of scroll offset to render only the items on screen
  const onScroll = (event) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    const newScrollOffset = Math.max(
      0,
      Math.min(scrollTop, scrollHeight - clientHeight)
    );
    setScrollDirection(newScrollOffset > scrollOffset ? 1 : -1);
    setScrollOffset(newScrollOffset);
  };

  // Calculate range of visible items
  let totalItems = sectionCounts.reduce((acc, cur) => acc + cur + 1, 0);
  const [startIndex, stopIndex] = useMemo(
    () =>
      getRangeToRender(
        scrollOffset,
        itemSize,
        height,
        totalItems,
        scrollDirection
      ),
    [scrollOffset, itemSize, height, totalItems, scrollDirection]
  );

  // Figure out which sections/items to render
  totalItems = 1; // +1 due to section header always being the first element
  const sections = [];
  sectionCounts.forEach((sectionCount, sectionIndex) => {
    if (sectionCount <= 0) {
      return; // don't render if section is empty
    }

    const items = [];

    // Add section header
    // if header is on screen (or sticky'd above)
    if (totalItems - 1 <= stopIndex) {
      items.push(
        createElement(children, {
          key: "header",
          isSectionHeader: true,
          sectionIndex
        })
      );
    }

    // Add section items
    // rendered absolutely relative to the section
    for (let i = 0; i < sectionCount; i++) {
      const index = i + totalItems; // convert index of item within section to overall index
      if (index >= startIndex && index <= stopIndex) {
        items.push(
          createElement(children, {
            key: i,
            itemIndex: i,
            sectionIndex,
            style: {
              position: "absolute",
              left: 0,
              top: (i + 1) * itemSize, // Make sure not to render the first item under the header
              height: itemSize,
              width: "100%"
            }
          })
        );
      }
    }

    // Create section to wrap items
    // We always render all sections, even if they're off-screen
    // This can be optimized but I don't care right now
    sections.push(
      createElement(
        "li",
        {
          className: classes.listSection,
          key: sectionIndex,
          style: {
            height: (sectionCount + 1) * itemSize // +1 for section header
          }
        },
        createElement("ul", {
          children: items,
          className: classes.listSectionInner,
          style: {
            height: (sectionCount + 1) * itemSize // +1 for section header
          }
        })
      )
    );

    totalItems += sectionCount + 1; // +1 for section header at the start of each section
  });

  // Wrap all sections in an outer list
  return createElement(component || "ul", {
    onScroll,
    children: sections,
    className: classes.outerList,
    style: { width, height },
    subheader: createElement("li")
  });
}
