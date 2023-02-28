import { cx } from "@utils/all";

export default function Container(props) {
  return (
    <div
      className={cx(
        "container px-8 py-5 mx-auto lg:py-8 xl:px-5 max-w-screen-xl",
        props.className
      )}>
      {props.children}
    </div>
  );
}
