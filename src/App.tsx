import SelectionArea, { SelectionEvent } from "@viselect/react";
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());
  const extractIds = (els: Element[]): number[] =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed }
    }
  }: SelectionEvent) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  return (
    <SelectionArea
      className="container"
      onStart={onStart}
      onMove={onMove}
      selectables=".selectable"
    >
      {new Array(400).fill(0).map((_, index) => (
        <div
          className={selected.has(index) ? "selected selectable" : "selectable"}
          data-key={index}
          key={index}
        />
      ))}
    </SelectionArea>
  );
}
