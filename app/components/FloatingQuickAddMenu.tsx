import { Popover } from "@headlessui/react";
import { Link } from "remix";
import { useFloating } from "@floating-ui/react-dom";

export default function FloatingQuickAddMenu() {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "top-end",
  });
  return (
    <Popover className="absolute right-10 bottom-10">
      <Popover.Button ref={reference}>+</Popover.Button>
      <Popover.Panel
        ref={floating}
        // className="w-52 flex flex-col"
        style={{
          position: strategy,
          top: y ?? "",
          left: x ?? "",
          width: 200,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Link to="/quick-add/new">New "quick add" list</Link>
        <Link to="/quick-add">Select "quick add" list</Link>
      </Popover.Panel>
    </Popover>
  );
}
