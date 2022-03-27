import { Popover } from "@headlessui/react";
import { Form, Link } from "remix";
import { useFloating } from "@floating-ui/react-dom";

export default function FloatingQuickAddMenu() {
  const { x, y, reference, floating, strategy } = useFloating({
    placement: "top-end",
  });
  return (
    <Popover className="absolute right-10 bottom-10">
      <Popover.Button aria-label="menu" ref={reference}>
        +
      </Popover.Button>
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
        <Link to="/portal/quick-add/new">New "quick add" list</Link>
        <Link to="/portal/quick-add">Select "quick add" list</Link>
        <Form action="/logout" method="post">
          <button type="submit">Logout</button>
        </Form>
      </Popover.Panel>
    </Popover>
  );
}
